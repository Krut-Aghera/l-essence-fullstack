import mongoose from "mongoose";
import cashfreeAPI from "../config/cashfree.config.js";
import asyncHandler from "../utils/async.handler.js";
import ApiError from "../utils/error.handler.js";
import ApiResponse from "../utils/response.handler.js";
import Perfume from "../models/perfume.model.js";
import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import { buildCartSnapshot } from "../utils/cart.helper.js";
import {
      ALLOWED_ADDRESS_FIELDS,
      orderStatus,
      paymentMethods,
      paymentStatus,
} from "../constants.js";
import { getPaymentMethod } from "../utils/payment.helper.js";

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const initiateCheckout = asyncHandler(async (req, res) => {
      const { shippingAddress } = req.body;

      if (!shippingAddress) {
            throw new ApiError(400, "Shipping address is required");
      }

      for (const field of ALLOWED_ADDRESS_FIELDS) {
            if (!shippingAddress[field]?.trim()) {
                  throw new ApiError(400, `${field} is required`);
            }
      }

      let cart = await Cart.findOne({
            user: req.user._id,
      });

      if (!cart) {
            throw new ApiError(404, "Cart not found");
      }

      const cartSnapshot = await buildCartSnapshot(cart);

      if (!cartSnapshot?.cart?.items?.length) {
            throw new ApiError(400, "Cart is empty");
      }

      const cartItems = cartSnapshot.cart.items;

      const orderProducts = [];

      for (const item of cartItems) {
            const perfume = item.perfume;

            if (!perfume) {
                  throw new ApiError(400, "One or more products no longer exist");
            }

            const latestPerfume = await Perfume.findById(perfume._id).select(
                  "name brand price inStock"
            );

            if (!latestPerfume) {
                  throw new ApiError(400, `${perfume.name} no longer exists`);
            }

            if (latestPerfume.inStock <= 0) {
                  throw new ApiError(400, `${latestPerfume.name} is out of stock`);
            }

            if (item.quantity > latestPerfume.inStock) {
                  throw new ApiError(
                        400,
                        `Only ${latestPerfume.inStock} unit(s) of ${latestPerfume.name} available`
                  );
            }

            orderProducts.push({
                  product: latestPerfume._id,
                  brand: latestPerfume.brand,
                  name: latestPerfume.name,
                  price: latestPerfume.price,
                  quantity: item.quantity,
                  soldPiecePerProduct: item.quantity,
                  soldPricePerProduct: latestPerfume.price * item.quantity,
            });
      }

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
                  pincode: shippingAddress.pincode,
            },

            products: orderProducts,

            paymentMethod: null,
            paymentStatus: paymentStatus.PENDING,
            orderStatus: orderStatus.PENDING,
      });

      try {
            const cashfreeOrder = await cashfreeAPI.post("/orders", {
                  order_id: order._id.toString(),
                  order_amount: order.totalPrice,
                  order_currency: "INR",
                  customer_details: {
                        customer_id: req.user._id.toString(),
                        customer_name: shippingAddress.name,
                        customer_email: req.user.email,
                        customer_phone: shippingAddress.phone,
                  },

                  order_meta: {
                        return_url: `${process.env.CLIENT_URL}/payment-status?order_id=${order._id}`,
                  },
            });

            order.cashfreeOrderID = cashfreeOrder.data.cf_order_id;
            order.paymentSessionID = cashfreeOrder.data.payment_session_id;

            await order.save();

            return res.status(200).json(
                  new ApiResponse(200, "Checkout initiated successfully", {
                        orderID: order._id,
                        paymentSessionID: order.paymentSessionID,
                        pricing: cartSnapshot.pricing,
                  })
            );
      } catch (error) {
            await Order.findByIdAndDelete(order._id);

            console.error("Cashfree Error:", error.response?.data || error.message);
            throw new ApiError(500, "Unable to initialize payment");
      }
});

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const verifyPayment = asyncHandler(async (req, res) => {
      const { orderID } = req.params;

      if (!orderID?.trim()) {
            throw new ApiError(400, "Order ID is required");
      }

      if (!mongoose.Types.ObjectId.isValid(orderID)) {
            throw new ApiError(400, "Invalid Order ID");
      }

      const order = await Order.findById(orderID);

      if (!order) {
            throw new ApiError(404, "Order not found");
      }

      if (order.paymentStatus === paymentStatus.SUCCESS) {
            return res.status(200).json(
                  new ApiResponse(200, "Order already verified", {
                        orderID: order._id,
                        paymentStatus: order.paymentStatus,
                        orderStatus: order.orderStatus,
                  })
            );
      }

      let cashfreeOrder;

      try {
            const response = await cashfreeAPI.get(`/orders/${order._id.toString()}`);
            cashfreeOrder = response.data;
      } catch (error) {
            console.error("Cashfree verification failed:", error.response?.data || error.message);
            throw new ApiError(500, "Unable to verify payment");
      }

      const cfOrderStatus = cashfreeOrder.order_status;

      if (cfOrderStatus === "ACTIVE") {
            return res.status(400).json(new ApiResponse(400, "Payment is still pending"));
      }

      if (cfOrderStatus === "EXPIRED" || cfOrderStatus === "TERMINATED") {
            order.paymentStatus = paymentStatus.FAILED;
            await order.save();

            return res.status(400).json(new ApiResponse(400, "Payment failed"));
      }

      if (cfOrderStatus !== "PAID") {
            return res.status(400).json(new ApiResponse(400, "Payment not completed"));
      }

      let finalPaymentMethod = paymentMethods.UNKNOWN;

      try {
            const paymentResponse = await cashfreeAPI.get(`/orders/${order._id.toString()}/payments`);

            const successfulPayment = paymentResponse.data.find(
                  (payment) => payment.payment_status === "SUCCESS"
            );

            if (successfulPayment) {
                  finalPaymentMethod = getPaymentMethod(successfulPayment);
            }
      } catch (error) {
            console.error("Unable to fetch payment method:", error.response?.data || error.message);
      }

      for (const item of order.products) {
            const updatedPerfume = await Perfume.findOneAndUpdate(
                  {
                        _id: item.product,
                        inStock: {
                              $gte: item.soldPiecePerProduct,
                        },
                  },
                  {
                        $inc: {
                              inStock: -item.soldPiecePerProduct,
                        },
                  },
                  {
                        new: true,
                  }
            );

            if (!updatedPerfume) {
                  throw new ApiError(400, `Insufficient stock for ${item.name}`);
            }
      }

      order.paymentMethod = finalPaymentMethod;
      order.paymentStatus = paymentStatus.SUCCESS;
      order.orderStatus = orderStatus.CONFIRMED;

      await order.save();

      await Cart.findOneAndUpdate(
            { user: order.user },
            {
                  $set: {
                        items: [],
                        appliedCoupon: null,
                  },
            }
      );

      return res.status(200).json(
            new ApiResponse(200, "Payment verified successfully", {
                  orderID: order._id,
                  paymentMethod: order.paymentMethod,
                  paymentStatus: order.paymentStatus,
                  orderStatus: order.orderStatus,
            })
      );
});

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const fetchOrders = asyncHandler(async (req, res) => {
      const orders = await Order.find({
            user: req.user._id,
      })
            .populate({
                  path: "products.product",
                  select: "name brand images concentration size",
            })
            .sort({ createdAt: -1 });

      return res
            .status(200)
            .json(
                  new ApiResponse(
                        200,
                        orders.length > 0
                              ? "Orders fetched successfully"
                              : "You haven't placed any orders yet",
                        orders
                  )
            );
});

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const fetchCurrentOrderDetails = asyncHandler(async (req, res) => {
      const { orderID } = req.params;

      if (!orderID?.trim()) {
            throw new ApiError(400, "Order ID is required");
      }

      if (!mongoose.Types.ObjectId.isValid(orderID)) {
            throw new ApiError(400, "Invalid Order ID");
      }

      const order = await Order.findById(orderID)
            .populate({
                  path: "products.product",
                  select: "name brand images concentration size",
            })
            .populate({
                  path: "user",
                  select: "name email",
            });

      if (!order) {
            throw new ApiError(404, "Order not found");
      }

      const isOwner = order.user._id.toString() === req.user._id.toString();

      const isAdmin = req.user.role === "admin";

      if (!isOwner && !isAdmin) {
            throw new ApiError(403, "You are not authorized to access this order");
      }

      return res.status(200).json(new ApiResponse(200, "Order details fetched successfully", order));
});

export { initiateCheckout, verifyPayment, fetchOrders, fetchCurrentOrderDetails };
