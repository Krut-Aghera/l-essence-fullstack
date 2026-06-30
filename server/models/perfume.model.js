import mongoose from "mongoose";
import { genderEnums, perfumeConcentrationEnums } from "../constants.js";

const perfumeSchema = new mongoose.Schema(
    {
        brand: { type: String, required: true, lowercase: true, trim: true },
        name: { type: String, required: true, index: true, lowercase: true, trim: true },
        concentration: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            enum: {
                values: perfumeConcentrationEnums,
                message: "Invalid perfume concentration",
            },
        },
        gender: { type: String, required: true, lowercase: true, trim: true, enum: genderEnums },
        price: { type: Number, required: true },
        oldPrice: { type: Number, required: true },
        discount: { type: Number, required: true },
        images: [
            {
                _id: false,
                url: { type: String, required: true, trim: true },
                public_id: { type: String, required: true, trim: true },
            },
        ],
        size: { type: String, required: true, lowercase: true, trim: true },
        category: { type: String, required: true, lowercase: true, trim: true },
        notes: {
            top: { type: String, required: true, lowercase: true, trim: true },
            heart: { type: String, required: true, lowercase: true, trim: true },
            base: { type: String, required: true, lowercase: true, trim: true },
        },
        inStock: { type: Number, required: true },
    },
    { timestamps: true }
);

perfumeSchema.index(
    {
        brand: 1,
        name: 1,
        concentration: 1,
    },
    {
        unique: true,
    }
);

const Perfume = mongoose.model("Perfume", perfumeSchema);
export default Perfume;
