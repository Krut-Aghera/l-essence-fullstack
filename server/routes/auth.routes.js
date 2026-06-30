import express from "express";

import { validationEngine } from "../middlewares/validator.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

import {
    userRegistationValidator,
    userLoginValidator,
    userEmailValidator,
    userResetPasswordValidator,
    userChangePasswordValidator,
} from "../validators/express.validators.js";

import {
    registerUser,
    emailVerification,
    userLogin,
    userLogout,
    userDetail,
    forgotPassword,
    resetPassword,
    accessTokenRefresh,
    changePassword,
} from "../controllers/auth.controller.js";

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const authRouter = express.Router();

authRouter.post("/register", userRegistationValidator(), validationEngine, registerUser);

authRouter.get("/verify-email/:verificationToken", emailVerification);

authRouter.post("/login", userLoginValidator(), validationEngine, userLogin);

authRouter.get("/me", verifyToken, userDetail);

authRouter.post("/logout", verifyToken, userLogout);

authRouter.post("/refresh-token", accessTokenRefresh);

authRouter.post("/reset-password", userEmailValidator(), validationEngine, forgotPassword);

authRouter.post(
    "/reset-password/:resetToken",
    userResetPasswordValidator(),
    validationEngine,
    resetPassword
);

authRouter.post(
    "/change-password",
    verifyToken,
    userChangePasswordValidator(),
    validationEngine,
    changePassword
);

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export default authRouter;
