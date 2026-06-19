import crypto from "crypto";
import jwt from "jsonwebtoken";
import ApiError from "../utils/error.handler.js";


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const generateToken = () => {

      const token = crypto.randomBytes(32).toString("hex");
      const expiry = Date.now() + 5 * 60 * 1000;

      const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

      if (!token || !hashedToken || !expiry) {
            throw new ApiError(500, "Error generating email verification token. Please try again later.");
      }

      return { token, hashedToken, expiry };
}


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const generateAccessRefreshToken = (userID, userRole, userEmail) => {
      try {
            const accessToken = jwt.sign(
                  {
                        id: userID,
                        role: userRole,
                        email: userEmail
                  },
                  process.env.JWT_ACCESS_SECRET,
                  { expiresIn: process.env.JWT_ACCESS_EXPIRY }
            )

            const refreshToken = jwt.sign(
                  {
                        id: userID,
                        role: userRole,
                        email: userEmail
                  },
                  process.env.JWT_REFRESH_SECRET,
                  { expiresIn: process.env.JWT_REFRESH_EXPIRY }
            )

            return { accessToken, refreshToken };

      } catch (error) {
            throw new ApiError(500, "Error generating access and refresh tokens. Please try again later.");
      }

}


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export {
      generateToken,
      generateAccessRefreshToken
};