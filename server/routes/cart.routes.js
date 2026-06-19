import express from 'express';
import { authorizeRole, verifyToken } from '../middlewares/auth.middleware.js';
import { fetchCart, addToCart, updateCartItemQuantity, removeFromCart, clearCart, applyCoupon, fetchCoupons } from '../controllers/cart.controller.js'

const cartRouter = express.Router()


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

// get all coupon
cartRouter.get(
      '/cart/coupons',
      fetchCoupons
)

// apply coupon on cart
cartRouter.post(
      '/cart/apply-coupon',
      verifyToken,
      authorizeRole("customer", "admin"),
      applyCoupon
)

// fetch cart
cartRouter.get(
      "/cart",
      verifyToken,
      authorizeRole("customer", "admin"),
      fetchCart
);

// add perfume to cart
cartRouter.post(
      "/cart/:perfumeID",
      verifyToken,
      authorizeRole("customer", "admin"),
      addToCart
);

// update quantity
cartRouter.patch(
      "/cart/:perfumeID",
      verifyToken,
      authorizeRole("customer", "admin"),
      updateCartItemQuantity
);

// remove single perfume from cart
cartRouter.delete(
      "/cart/:perfumeID",
      verifyToken,
      authorizeRole("customer", "admin"),
      removeFromCart
);

// clear entire cart
cartRouter.delete(
      "/cart",
      verifyToken,
      authorizeRole("customer", "admin"),
      clearCart
);


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export default cartRouter