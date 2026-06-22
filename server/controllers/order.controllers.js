import mongoose from "mongoose";
import cashfreeAPI from "../config/cashfree.config.js";
import asyncHandler from "../utils/async.handler.js";
import ApiError from "../utils/error.handler.js";
import ApiResponse from "../utils/response.handler.js";
import Perfume from "../models/perfume.model.js";
import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import { buildCartSnapshot } from "../utils/cart.handler.js";
import { ALLOWED_ADDRESS_FIELDS, orderStatus, paymentMethods, paymentStatus } from "../constants.js";



//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const initiateCheckout = asyncHandler(async (req, res) => {

      const { shippingAddress } = req.body;

      //////////////////////////////////////////////////////////////
      // Validate Shipping Address
      //////////////////////////////////////////////////////////////

      if (!shippingAddress) {
            throw new ApiError(400, "Shipping address is required");
      }


      for (const field of ALLOWED_ADDRESS_FIELDS) {
            if (!shippingAddress[field]?.trim()) {
                  throw new ApiError(400, `${field} is required`);
            }
      }

      //////////////////////////////////////////////////////////////
      // Fetch Cart
      //////////////////////////////////////////////////////////////

      let cart = await Cart.findOne({
            user: req.user._id
      });

      if (!cart) {
            throw new ApiError(404, "Cart not found");
      }

      //////////////////////////////////////////////////////////////
      // Build Complete Cart Snapshot
      //////////////////////////////////////////////////////////////

      const cartSnapshot = await buildCartSnapshot(cart);

      if (!cartSnapshot?.cart?.items?.length) {
            throw new ApiError(400, "Cart is empty");
      }

      const cartItems = cartSnapshot.cart.items;

      //////////////////////////////////////////////////////////////
      // Validate Products & Stock
      //////////////////////////////////////////////////////////////

      const orderProducts = [];

      for (const item of cartItems) {

            const perfume = item.perfume;

            if (!perfume) {
                  throw new ApiError(400, "One or more products no longer exist");
            }

            // Fetch latest product from DB
            const latestPerfume = await Perfume.findById(
                  perfume._id
            ).select(
                  "name brand price inStock"
            );

            if (!latestPerfume) {
                  throw new ApiError(400, `${perfume.name} no longer exists`);
            }

            if (latestPerfume.inStock <= 0) {
                  throw new ApiError(400, `${latestPerfume.name} is out of stock`);
            }

            if (item.quantity > latestPerfume.inStock) {
                  throw new ApiError(400, `Only ${latestPerfume.inStock} unit(s) of ${latestPerfume.name} available`);
            }

            orderProducts.push({
                  product: latestPerfume._id,
                  brand: latestPerfume.brand,
                  name: latestPerfume.name,
                  price: latestPerfume.price,
                  quantity: item.quantity,
                  soldPiecePerProduct: item.quantity,
                  soldPricePerProduct:
                        latestPerfume.price * item.quantity
            });
      }

      //////////////////////////////////////////////////////////////
      // Create Pending Order
      //////////////////////////////////////////////////////////////

      const order = await Order.create({

            user: req.user._id,

            totalQnt: cartSnapshot.totalQuantity,
            totalPrice: cartSnapshot.pricing.grandTotal,

            shippingAddress: {
                  name: shippingAddress.name,
                  phone: shippingAddress.phone,
                  address: shippingAddress.address,
                  city: shippingAddress.city,
                  state: shippingAddress.state,
                  country: shippingAddress.country,
                  pincode: shippingAddress.pincode
            },

            products: orderProducts,

            paymentMethod: null,
            paymentStatus: paymentStatus.PENDING,

            orderStatus: orderStatus.PENDING
      });

      //////////////////////////////////////////////////////////////
      // TODO: Create Cashfree Order Here
      //////////////////////////////////////////////////////////////

      // do cashfree work here
      console.log("CLIENT_URL =", process.env.CLIENT_URL);

      try {


            const cashfreeOrder = await cashfreeAPI.post(
                  "/orders",
                  {
                        order_id: order._id.toString(),

                        order_amount: order.totalPrice,

                        order_currency: "INR",

                        customer_details: {
                              customer_id: req.user._id.toString(),
                              customer_name: shippingAddress.name,
                              customer_email: req.user.email,
                              customer_phone: shippingAddress.phone
                        },

                        order_meta: {
                              return_url:
                                    `${process.env.CLIENT_URL}/payment-status?order_id=${order._id}`
                        }
                  }
            );

            order.cashfreeOrderID = cashfreeOrder.data.cf_order_id;
            order.paymentSessionID = cashfreeOrder.data.payment_session_id;

            await order.save();

            //////////////////////////////////////////////////////////////
            // Response
            //////////////////////////////////////////////////////////////

            return res.status(200).json(
                  new ApiResponse(200, "Checkout initiated successfully", {
                        orderID: order._id,
                        paymentSessionID: order.paymentSessionID,
                        pricing: cartSnapshot.pricing
                  }
                  )
            );

      } catch (error) {

            await Order.findByIdAndDelete(order._id);

            console.error(
                  "Cashfree Error:",
                  error.response?.data || error.message
            );

            throw new ApiError(500, "Unable to initialize payment");
      }


});



//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const verifyPayment = asyncHandler(async (req, res) => {

      const { orderID } = req.params;

      //////////////////////////////////////////////////////////////
      // Validate Order ID
      //////////////////////////////////////////////////////////////

      if (!orderID?.trim()) {
            throw new ApiError(400, "Order ID is required");
      }

      if (!mongoose.Types.ObjectId.isValid(orderID)) {
            throw new ApiError(400, "Invalid Order ID");
      }

      //////////////////////////////////////////////////////////////
      // Fetch Order
      //////////////////////////////////////////////////////////////

      const order = await Order.findById(orderID);

      if (!order) {
            throw new ApiError(404, "Order not found");
      }

      //////////////////////////////////////////////////////////////
      // Prevent duplicate processing
      //////////////////////////////////////////////////////////////

      if (order.paymentStatus === paymentStatus.SUCCESS) {
            return res.status(200).json(
                  new ApiResponse(200, "Order already verified", order)
            );
      }

      //////////////////////////////////////////////////////////////
      // Verify payment from Cashfree
      //////////////////////////////////////////////////////////////

      let cashfreeResponse;

      try {

            cashfreeResponse = await cashfreeAPI.get(
                  `/orders/${order._id.toString()}`
            );

      } catch (error) {

            console.error(
                  "Cashfree verification failed:",
                  error.response?.data || error.message
            );

            throw new ApiError(
                  500,
                  "Unable to verify payment"
            );
      }

      //////////////////////////////////////////////////////////////
      // Check payment status
      //////////////////////////////////////////////////////////////

      const cfOrderStatus =
            cashfreeResponse.data.order_status;

      /*
            Possible values:

            PAID
            ACTIVE
            EXPIRED
            TERMINATED
      */

      //////////////////////////////////////////////////////////////
      // Payment Failed / Pending
      //////////////////////////////////////////////////////////////

      if (cfOrderStatus === "ACTIVE") {

            return res.status(400).json(
                  new ApiResponse(
                        400,
                        "Payment still pending"
                  )
            );
      }

      if (
            cfOrderStatus === "EXPIRED" ||
            cfOrderStatus === "TERMINATED"
      ) {

            order.paymentStatus = paymentStatus.FAILED;

            await order.save();

            return res.status(400).json(
                  new ApiResponse(
                        400,
                        "Payment failed"
                  )
            );
      }

      // Reduce inventory
      //////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////
      for (const item of order.products) {

            const updated = await Perfume.findOneAndUpdate(
                  {
                        _id: item.product,
                        inStock: { $gte: item.soldPiecePerProduct }
                  },
                  {
                        $inc: {
                              inStock: -item.soldPiecePerProduct
                        }
                  },
                  {
                        returnDocument: 'after'
                  }
            );

            if (!updated) {
                  throw new ApiError(
                        400,
                        `Insufficient stock for ${item.name}`
                  );
            }
      }




      //////////////////////////////////////////////////////////////
      // Update Order
      //////////////////////////////////////////////////////////////

      order.paymentStatus = paymentStatus.SUCCESS;

      order.orderStatus = orderStatus.CONFIRMED;

      // Optional:
      // order.paymentMethod = "upi";

      await order.save();

      //////////////////////////////////////////////////////////////
      // Clear Cart
      //////////////////////////////////////////////////////////////

      await Cart.findOneAndUpdate(
            { user: order.user },
            {
                  $set: {
                        items: [],
                        appliedCoupon: null
                  }
            }
      );

      //////////////////////////////////////////////////////////////
      // Success Response
      //////////////////////////////////////////////////////////////

      return res.status(200).json(
            new ApiResponse(
                  200,
                  "Payment verified successfully",
                  {
                        orderID: order._id,
                        paymentStatus:
                              order.paymentStatus,

                        orderStatus:
                              order.orderStatus
                  }
            )
      );
});


export { initiateCheckout, verifyPayment };