import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            index: true,
            lowercase: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            index: true,
            lowercase: true,
            trim: true,
        },

        logo: {
            url: {
                type: String,
                required: true,
                trim: true,
            },

            public_id: {
                type: String,
                required: true,
                trim: true,
            },
        },

        country: {
            type: String,
            trim: true,
            lowercase: true,
            default: "",
        },
    },
    { timestamps: true }
);

const Brand = mongoose.model("Brand", brandSchema);

export default Brand;
