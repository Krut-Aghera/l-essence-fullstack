import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import asyncHandler from "../utils/async.handler.js";
import ApiError from "../utils/error.handler.js";
import ApiResponse from "../utils/response.handler.js";

import { cookieOptions, tokenExpiry } from "../constants.js";
import { emailVerificationTemplate, passwordResetTemplate, sendEmail } from "../utils/email.handler.js";
import { generateToken, generateAccessRefreshToken } from "../utils/token.handler.js";


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const registerUser = asyncHandler(async (req, res) => {

      const { name, email, phone, password } = req.body;

      if (!name || !email || !phone || !password) {
            throw new ApiError(400, "Please provide all required fields", ["name", "email", "phone", "password"]);
      }

      const existingUser = await User.findOne({
            $or: [
                  { email }, { phone }
            ]
      });

      if (existingUser) {
            throw new ApiError(400, "User already exists with this email or phone number");
      }

      const user = await User.create({ name, email, phone, password });

      if (!user) {
            throw new ApiError(500, "User registration failed. Please try again later.");
      }

      const {
            token,
            hashedToken,
            expiry
      } = generateToken();

      user.emailVerificationToken = hashedToken;
      user.emailVerificationExpiry = new Date(expiry);

      const savedUser = await user.save({ validateBeforeSave: false });

      if (!savedUser) {
            await User.findByIdAndDelete(user._id);
            throw new ApiError(500, "User registration failed due to email verification token generation error. Please try again later.");
      }

      const isMailSent = await sendEmail({
            userEmail: user.email,
            subject: "Email Verification - L'Essence",
            mailContent: emailVerificationTemplate(
                  user.name,
                  `${req.protocol}://${req.get("host")}/api/v1/auth/verify-email/${token}`
            )
      })

      if (!isMailSent.success) {
            await User.findByIdAndDelete(user._id);
            throw new ApiError(500, "user registration failed due to verification email sending error. Please try again later.", isMailSent.message);
      }

      res.status(201)
            .json(new ApiResponse(201, "User registered successfully. Please check your email to verify your account", {
                  user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        role: user.role
                  }
            }))
})


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const emailVerification = asyncHandler(async (req, res) => {

      const { verificationToken } = req.params;

      const hashedToken = crypto
            .createHash("sha256")
            .update(verificationToken)
            .digest("hex");

      const user = await User.findOne({
            emailVerificationToken: hashedToken,
            emailVerificationExpiry: { $gt: Date.now() }
      }).select("+role +emailVerificationToken +emailVerificationExpiry +refreshToken");

      if (!user) {
            throw new ApiError(400, "Invalid or expired email verification token");
      }

      user.isEmailVerified = true;
      user.emailVerificationToken = undefined;
      user.emailVerificationExpiry = undefined;


      const { accessToken, refreshToken } = generateAccessRefreshToken(user._id, user.role, user.email);

      user.refreshToken = undefined;
      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });


      res.status(200)
            .cookie("accessToken", accessToken, cookieOptions)
            .cookie("refreshToken", refreshToken, cookieOptions)
            .json(new ApiResponse(200, "Email verified successfully", {
                  user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        role: user.role,
                        isEmailVerified: user.isEmailVerified
                  }
            }))

})


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const userLogin = asyncHandler(async (req, res) => {
      const { identifier, password } = req.body


      console.log("in login", identifier, password)

      if (!identifier || !password) {
            throw new ApiError(400, "Please provide both email/phone and password", ["emailOrPhone", "password"]);
      }

      const user = await User.findOne({
            $or: [
                  { email: identifier }, { phone: identifier }
            ]
      }).select("+role +password +refreshToken")
      
      console.log("in login", user)

      if (!user) {
            throw new ApiError(400, "Invalid Credential");
      }
      
      const isPasswordValid = await user.comparePassword(password)
      console.log("in login", isPasswordValid)
      
      if (!isPasswordValid) {
            throw new ApiError(400, "Invalid Credential");
      }
      console.log("in login", user)
      
      const { accessToken, refreshToken } = generateAccessRefreshToken(user._id, user.role, user.email);

      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });

      res.status(200)
            .cookie("accessToken", accessToken, {
                  ...cookieOptions,
                  maxAge: tokenExpiry.ACCESS_TOKEN
            })
            .cookie("refreshToken", refreshToken, {
                  ...cookieOptions,
                  maxAge: tokenExpiry.REFRESH_TOKEN

            })
            .json(new ApiResponse(200, "Login successful", {
                  user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        role: user.role,
                        isEmailVerified: user.isEmailVerified
                  }
            }))

})


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const userDetail = asyncHandler(async (req, res) => {
      const user = req.user
      if (!user) {
            throw new ApiError(401, "Unauthorized user. Please login to access this resource");
      }

      res.status(200)
            .json(new ApiResponse(200, "User details fetched successfully", user))
})


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const userLogout = asyncHandler(async (req, res) => {
      const { _id } = req.user

      const user = await User.findById(_id).select('+refreshToken')
      user.refreshToken = undefined

      const one = await user.save({ validateBeforeSave: false })

      res.status(200)
            .clearCookie("refreshToken", cookieOptions)
            .clearCookie("accessToken", cookieOptions)
            .json(new ApiResponse(200, "User logged out successfully"), true);

})


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const forgotPassword = asyncHandler(async (req, res) => {

      const { email } = req.body;

      if (!email) {
            throw new ApiError(400, "Email is required");
      }

      const user = await User.
            findOne({ email })
            .select("+passwordResetToken +passwordResetExpiry");

      if (!user) {
            throw new ApiError(400, "Invalid Email");
      }

      const { token, hashedToken, expiry } = generateToken();

      user.passwordResetToken = hashedToken;
      user.passwordResetExpiry = new Date(expiry);

      await user.save({ validateBeforeSave: false });

      const isMailSent = await sendEmail({
            userEmail: user.email,
            subject: "Password Reset - L'Essence",
            mailContent: passwordResetTemplate(
                  user.name,
                  `${req.protocol}://${req.get("host")}/api/v1/auth/reset-password/${token}`
            )
      });

      if (!isMailSent.success) {
            throw new ApiError(500, "Password reset faild due to email has not be sent to your email, Please try again later.");
      }

      res.status(200)
            .json(new ApiResponse(200, "Password reset link has been sent to your email, Please check your email"));
})


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const resetPassword = asyncHandler(async (req, res) => {

      const { resetToken } = req.params;
      const { newPassword } = req.body;

      if (!resetToken) {
            throw new ApiError(400, "Reset password token is missing");
      }

      const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

      const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpiry: { $gt: Date.now() }
      }).select("+passwordResetToken +passwordResetExpiry");

      if (!user) {
            throw new ApiError(404, "Invalid or expired token");
      }

      user.password = newPassword;
      user.passwordResetExpiry = undefined;
      user.passwordResetToken = undefined;
      user.refreshToken = undefined;

      await user.save({ validateBeforeSave: true });

      res.status(200)
            .clearCookie("accessToken", cookieOptions)
            .clearCookie("refreshToken", cookieOptions)
            .json(new ApiResponse(200, "Password changed successfully."));

})


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const accessTokenRefresh = asyncHandler(async (req, res) => {

      const refreshToken = req.cookies.refreshToken || req.headers.authorization?.split("Bearer ")[1] || req.body.refreshToken;


      if (!refreshToken) {
            throw new ApiError(401, "Refresh token not found. Please login again.");
      }

      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

      const user = await User.findOne({
            _id: decoded.id,
            email: decoded.email
      }).select("+role +refreshToken");


      if (!user) {
            throw new ApiError(400, "Invalid refresh token: user not found");
      }

      if (user.refreshToken !== refreshToken) {
            throw new ApiError(401, "Invalid refresh token");
      }

      console.log("in refresh token", user._id, user.role, user.email)

      const {
            accessToken: generatedAccessToken,
            refreshToken: generatedRefreshToken
      } = generateAccessRefreshToken(user._id, user.role, user.email);

      console.log(refreshToken, accessToken)

      user.refreshToken = generatedRefreshToken;
      await user.save({ validateBeforeSave: false });


      res.status(200)
            .cookie("accessToken", generatedAccessToken, {
                  ...cookieOptions,
                  maxAge: tokenExpiry.ACCESS_TOKEN
            })
            .cookie("refreshToken", generatedRefreshToken, {
                  ...cookieOptions,
                  maxAge: tokenExpiry.REFRESH_TOKEN
            })
            .json(new ApiResponse(200, "Refreshing access token successful", {
                  user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        isEmailVerified: user.isEmailVerified
                  }
            }))
})


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const changePassword = asyncHandler(async (req, res) => {

      const { currentPassword, newPassword } = req.body;

      const user = await User.findById(req.user._id).select("+password");

      if (!user) {
            throw new ApiError(401, "Unauthorized user. Please login to change password");
      }

      const isPasswordValid = await user.comparePassword(currentPassword);

      if (!isPasswordValid) {
            throw new ApiError(400, "Invalid current password");
      }

      user.password = newPassword;
      user.refreshToken = undefined;

      await user.save({ validateBeforeSave: true });


      res.status(200)
            .clearCookie("accessToken", cookieOptions)
            .clearCookie("refreshToken", cookieOptions)
            .json(new ApiResponse(200, "Password changed successfully. Login with new password to continue."));
});


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export {
      registerUser,
      emailVerification,
      userLogin,
      userLogout,
      userDetail,
      forgotPassword,
      resetPassword,
      accessTokenRefresh,
      changePassword
};