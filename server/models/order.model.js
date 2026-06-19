import e from "express";
import mongoose from "mongoose";
import { orderStatusEnums, paymentMethodEnums } from "../constants";

const orderSchema = new mongoose.Schema({

      user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      orderDetail: {
            totalQnt: { type: Number, required: true },
            totalPrice: { type: Number, required: true },
            address: { type: String, required: true, lowercase: true, trim: true },
            products: [{
                  product: { type: mongoose.Schema.Types.ObjectId, ref: "Perfume", required: true },
                  brand: { type: String, required: true, lowercase: true, trim: true },
                  name: { type: String, required: true, lowercase: true, trim: true },
                  price: { type: Number, required: true },
                  quantity: { type: String, required: true, lowercase: true, trim: true },
                  soldPiecePerProduct: { type: Number, required: true },
                  soldPricePerProduct: { type: Number, required: true }
            }],
            paymentMethod: { type: String, required: true, lowercase: true, trim: true,  enum: paymentMethodEnums},
            orderStatus: { type: String, required: true, lowercase: true, trim: true, enum: orderStatusEnums }
      }      
      
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;