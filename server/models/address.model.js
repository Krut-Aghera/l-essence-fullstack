import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        address: [
            {
                name: { type: String, required: true, lowercase: true, trim: true },
                phone: { type: String, required: true, trim: true },
                pincode: { type: String, required: true, trim: true },
                address: { type: String, required: true, lowercase: true, trim: true },
                city: { type: String, required: true, lowercase: true, trim: true },
                state: { type: String, required: true, lowercase: true, trim: true },
                country: { type: String, required: true, lowercase: true, trim: true },
            },
        ],
    },
    { timestamps: true }
);

const Address = mongoose.model("Address", addressSchema);
export default Address;
