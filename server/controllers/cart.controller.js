import Cart from "../models/cart.model.js";
import Coupon from "../models/coupon.model.js";
import Perfume from "../models/perfume.model.js";
import asyncHandler from "../utils/async.handler.js";
import { buildCartSnapshot, calculateCartPricing, emptyCartResponse, getCartResponse, normalizeCart } from "../utils/cart.helper.js";
import ApiError from "../utils/error.handler.js";
import ApiResponse from "../utils/response.handler.js";


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const applyCoupon = asyncHandler(async (req, res) => {
      const userId = req.user._id;
      const { code } = req.body;

      if (!code) {
            throw new ApiError(
                  400,
                  "Coupon code is required"
            );
      }

      const coupon = await Coupon.findOne({
            code: code.toUpperCase()
      });

      if (!coupon) {
            throw new ApiError(
                  404,
                  "Invalid coupon"
            );
      }

      const cart = await Cart.findOne({
            user: userId
      });

      if (!cart || cart.items.length === 0) {
            throw new ApiError(
                  400,
                  "Cart is empty"
            );
      }

      if (cart.appliedCoupon && cart.appliedCoupon.toString() === coupon._id.toString()) {
            throw new ApiError(400, "Coupon already applied");
      }

      cart.appliedCoupon = coupon._id;

      await cart.save();

      const responseData =
            await buildCartSnapshot(cart);

      res.status(200).json(
            new ApiResponse(
                  200,
                  "Coupon applied successfully",
                  responseData
            )
      );
});

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const removeCoupon = asyncHandler(async (req, res) => {

      const cart = await Cart.findOne({
            user: req.user._id
      });

      if (!cart) {
            throw new ApiError(
                  404,
                  "Cart not found"
            );
      }

      cart.appliedCoupon = null;

      await cart.save();

      const responseData =
            await buildCartSnapshot(cart);

      res.status(200).json(
            new ApiResponse(
                  200,
                  "Coupon removed successfully",
                  responseData
            )
      );
});


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const fetchCoupons = asyncHandler(async (req, res) => {
      const coupons = await Coupon.find()
            .select("code discountPercentage expiresAt");

      return res.status(200).json(
            new ApiResponse(200, "Coupons fetched successfully", coupons)
      );
});


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const addToCart = asyncHandler(async (req, res) => {
      const { perfumeID } = req.params;
      const { quantity } = req.body

      if (!perfumeID) {
            throw new ApiError(400, "perfume id is missing");
      };

      const perfume = await Perfume.findById(perfumeID);

      if (!perfume) {
            throw new ApiError(404, "Perfume not found");
      }

      if (perfume.inStock <= 0) {
            throw new ApiError(400, "Perfume is out of stock");
      }

      const cart = await Cart.findOne({ user: req.user._id });

      const alreadyExists = cart?.items.some(
            item => item.perfume.toString() === perfumeID
      );

      if (alreadyExists) {
            throw new ApiError(409, "Perfume already exists in cart");
      }

      let updatedCart = await Cart.findOneAndUpdate(
            { user: req.user._id },
            {
                  $push: {
                        items: {
                              perfume: perfumeID,
                              quantity: quantity || 1
                        }
                  }
            },
            {
                  returnDocument: "after",
                  upsert: true
            }
      );

      const responseData = await buildCartSnapshot(updatedCart);

      res.status(200).json(
            new ApiResponse(
                  200,
                  "Perfume added to cart successfully",
                  responseData
            )
      );
});

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const updateCartItemQuantity = asyncHandler(async (req, res) => {
      const { perfumeID } = req.params;
      const { quantity } = req.body;

      if (quantity < 0 || quantity > 10) {
            throw new ApiError(
                  400,
                  "Quantity must be between 0 and 10"
            );
      }

      const perfume = await Perfume.findById(perfumeID);

      if (!perfume) {
            throw new ApiError(404, "Perfume not found");
      }

      if (quantity > perfume.inStock) {
            throw new ApiError(
                  400,
                  `Only ${perfume.inStock} item(s) available in stock`
            );
      }

      const cart = await Cart.findOne({
            user: req.user._id,
            "items.perfume": perfumeID
      });

      if (!cart) {
            throw new ApiError(404, "Perfume not found in cart");
      }

      let updatedCart;

      if (quantity === 0) {
            updatedCart = await Cart.findOneAndUpdate(
                  { user: req.user._id },
                  {
                        $pull: {
                              items: {
                                    perfume: perfumeID
                              }
                        }
                  },
                  { returnDocument: 'after' }
            );
      } else {
            updatedCart = await Cart.findOneAndUpdate(
                  {
                        user: req.user._id,
                        "items.perfume": perfumeID
                  },
                  {
                        $set: {
                              "items.$.quantity": quantity
                        }
                  },
                  { returnDocument: 'after' }
            );
      }

      const responseData =
            await buildCartSnapshot(updatedCart);

      res.status(200).json(
            new ApiResponse(
                  200,
                  quantity === 0
                        ? "Perfume removed from cart"
                        : "Cart quantity updated",
                  responseData
            )
      );
});


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const removeFromCart = asyncHandler(async (req, res) => {
      const { perfumeID } = req.params;

      const cart = await Cart.findOne({
            user: req.user._id,
            "items.perfume": perfumeID
      });

      if (!cart) {
            throw new ApiError(404, "Perfume not found in cart");
      }

      let updatedCart = await Cart.findOneAndUpdate(
            { user: req.user._id },
            {
                  $pull: {
                        items: { perfume: perfumeID }
                  }
            },
            { returnDocument: "after" }
      );

      const responseData =
            await buildCartSnapshot(updatedCart);

      res.status(200).json(
            new ApiResponse(
                  200,
                  "Perfume removed from cart successfully",
                  responseData
            )
      );
});


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const fetchCart = asyncHandler(async (req, res) => {

      const cart = await Cart.findOne({
            user: req.user._id
      });

      if (!cart) {
            return res.status(200).json(
                  new ApiResponse(
                        200,
                        "Cart fetched successfully",
                        emptyCartResponse()
                  )
            );
      }

      const responseData =
            await buildCartSnapshot(cart);

      res.status(200).json(
            new ApiResponse(
                  200,
                  "Cart fetched successfully",
                  responseData
            )
      );
});



//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const clearCart = asyncHandler(async (req, res) => {

      const updatedCart = await Cart.findOneAndUpdate(
            { user: req.user._id },
            {
                  $set: {
                        items: [],
                        appliedCoupon: null
                  }
            },
            {
                  returnDocument: 'after'
            }
      ).populate("user", "name email");


      const responseData =
            getCartResponse(updatedCart);

      res.status(200).json(
            new ApiResponse(200, "Cart cleared successfully", responseData)
      );
});




export default fetchCart;
export {
      applyCoupon,
      removeCoupon,
      fetchCoupons,
      addToCart,
      updateCartItemQuantity,
      removeFromCart,
      fetchCart,
      clearCart
}