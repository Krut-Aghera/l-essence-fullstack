import express from "express";
import { authorizeRole, verifyToken } from "../middlewares/auth.middleware.js";
import {
    fetchCurrentOrderDetails,
    fetchOrders,
    initiateCheckout,
    verifyPayment,
} from "../controllers/order.controllers.js";

const orderRouter = express.Router();

orderRouter.post("/checkout", verifyToken, authorizeRole("customer", "admin"), initiateCheckout);

orderRouter.get(
    "/verify-payment/:orderID",
    verifyToken,
    authorizeRole("customer", "admin"),
    verifyPayment
);

orderRouter.get("/", verifyToken, authorizeRole("customer", "admin"), fetchOrders);

orderRouter.get(
    "/:orderID",
    verifyToken,
    authorizeRole("customer", "admin"),
    fetchCurrentOrderDetails
);

export default orderRouter;
