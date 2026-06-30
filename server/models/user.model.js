import mongoose from "mongoose";
import bcrypt from "bcrypt";

import { hashSaltRounds } from "../constants.js";
import { userRoleEnums } from "../constants.js";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, lowercase: true, trim: true },
        email: {
            type: String,
            required: true,
            unique: true,
            index: true,
            lowercase: true,
            trim: true,
        },
        phone: { type: String, required: true, unique: true, index: true },
        password: { type: String, required: true, select: false },
        address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
        wishlist: { type: mongoose.Schema.Types.ObjectId, ref: "Wishlist" },
        role: { type: String, enum: userRoleEnums, default: "customer", select: false },
        refreshToken: { type: String, select: false },
        isEmailVerified: { type: Boolean, default: false },
        emailVerificationToken: { type: String, select: false },
        emailVerificationExpiry: { type: Date, select: false },
        passwordResetToken: { type: String, select: false },
        passwordResetExpiry: { type: Date, select: false },
    },
    { timestamps: true }
);

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    const salt = await bcrypt.genSalt(hashSaltRounds);
    const hashedPassword = await bcrypt.hash(this.password, salt);

    this.password = hashedPassword;
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
