import express from "express"
import { authorizeRole, verifyToken } from "../middlewares/auth.middleware.js"
import { initiateCheckout, verifyPayment } from "../controllers/order.controllers.js"

const orderRouter = express.Router()


orderRouter.post('/checkout',
      verifyToken,
      authorizeRole("customer", "admin"),
      initiateCheckout
)



orderRouter.get('/verify-payment/:orderID',
      verifyToken,
      authorizeRole("customer", "admin"),
      verifyPayment
)



export default orderRouter