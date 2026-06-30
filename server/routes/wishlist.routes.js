import expres from "express";
import { authorizeRole, verifyToken } from "../middlewares/auth.middleware.js";
import {
    addPerfumeToWishlist,
    clearWishlist,
    fetchWishlist,
    removePerfumeFromWishlist,
} from "../controllers/wishlist.controller.js";

const wishlistRouter = expres.Router();

// add perfume to wishlist
wishlistRouter.post(
    "/wishlist/:perfumeID",
    verifyToken,
    authorizeRole("customer", "admin"),
    addPerfumeToWishlist
);

// remove perfume from wishlist
wishlistRouter.delete(
    "/wishlist/:perfumeID",
    verifyToken,
    authorizeRole("customer", "admin"),
    removePerfumeFromWishlist
);

// fetch wishlist
wishlistRouter.get("/wishlist", verifyToken, authorizeRole("customer", "admin"), fetchWishlist);

// cleat entire wishlist
wishlistRouter.delete("/wishlist", verifyToken, authorizeRole("customer", "admin"), clearWishlist);

export default wishlistRouter;
