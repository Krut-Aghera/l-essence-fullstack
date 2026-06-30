import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
            index: true,
        },
        list: [
            {
                _id: false,
                perfume: { type: mongoose.Schema.Types.ObjectId, ref: "Perfume", required: true },
                addedAt: { type: Date, default: Date.now },
            },
        ],
    },
    { timestamps: true }
);

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
export default Wishlist;
