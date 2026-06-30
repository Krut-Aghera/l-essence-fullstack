import e from "express";
import mongoose from "mongoose";
import {
    orderStatus,
    orderStatusEnums,
    paymentMethodEnums,
    paymentStatus,
    paymentStatusEnums,
} from "../constants.js";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        totalQnt: {
            type: Number,
            required: true,
        },

        totalPrice: {
            type: Number,
            required: true,
        },

        shippingAddress: {
            name: {
                type: String,
                required: true,
                lowercase: true,
                trim: true,
            },

            phone: {
                type: String,
                required: true,
                trim: true,
            },

            pincode: {
                type: String,
                required: true,
                trim: true,
            },

            address: {
                type: String,
                required: true,
                lowercase: true,
                trim: true,
            },

            city: {
                type: String,
                required: true,
                lowercase: true,
                trim: true,
            },

            state: {
                type: String,
                required: true,
                lowercase: true,
                trim: true,
            },

            country: {
                type: String,
                required: true,
                lowercase: true,
                trim: true,
            },
        },

        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Perfume",
                    required: true,
                },

                brand: {
                    type: String,
                    required: true,
                    lowercase: true,
                    trim: true,
                },

                name: {
                    type: String,
                    required: true,
                    lowercase: true,
                    trim: true,
                },

                price: {
                    type: Number,
                    required: true,
                },

                quantity: {
                    type: Number,
                    required: true,
                },

                soldPiecePerProduct: {
                    type: Number,
                    required: true,
                },

                soldPricePerProduct: {
                    type: Number,
                    required: true,
                },
            },
        ],

        paymentMethod: {
            type: String,
            lowercase: true,
            trim: true,
            default: null,
            enum: paymentMethodEnums,
        },

        paymentStatus: {
            type: String,
            required: true,
            default: paymentStatus.PENDING,
            enum: paymentStatusEnums,
        },

        orderStatus: {
            type: String,
            required: true,
            default: orderStatus.PENDING,
            lowercase: true,
            trim: true,
            enum: orderStatusEnums,
        },

        cashfreeOrderID: {
            type: String,
            trim: true,
            index: true,
        },

        paymentSessionID: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
