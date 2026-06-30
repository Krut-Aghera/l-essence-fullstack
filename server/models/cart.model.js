import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
            unique: true,
            sparse: true,
        },
        items: [
            {
                _id: false,
                perfume: { type: mongoose.Schema.Types.ObjectId, ref: "Perfume", required: true },
                quantity: { type: Number, required: true, min: 1, default: 1 },
            },
        ],
        appliedCoupon: { type: mongoose.Schema.Types.ObjectId, ref: "Coupon", default: null },
    },
    { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
