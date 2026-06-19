import jwt from "jsonwebtoken";
import ApiError from '../utils/error.handler.js';
import User from "../models/user.model.js";



//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const verifyToken = async (req, res, next) => {

      const accessToken = req.cookies.accessToken;

      if (!accessToken) {
            throw new ApiError(
                  401,
                  "Access token not found. Please login again."
            );
      }

      try {

            const decoded = jwt.verify(
                  accessToken,
                  process.env.JWT_ACCESS_SECRET
            );

            const user = await User.findById(decoded.id);

            if (!user) {
                  throw new ApiError(
                        401,
                        "User associated with this token no longer exists."
                  );
            }

            req.user = {
                  ...user.toObject(),
                  role: decoded.role
            };

            next();

      } catch (error) {

            if (error.name === "TokenExpiredError") {
                  throw new ApiError(
                        401,
                        "Access token expired"
                  );
            }

            if (error.name === "JsonWebTokenError") {
                  throw new ApiError(
                        401,
                        "Invalid access token"
                  );
            }

            throw error;
      }
};


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const authorizeRole = (...roles) => {
      return (req, res, next) => {

            const userRole =
                  req.user?.role?.toLowerCase();

            const allowedRoles =
                  roles.map(role =>
                        role.toLowerCase()
                  );

            if (!userRole) {
                  throw new ApiError(
                        401,
                        "Please log in to access this resource"
                  );
            }

            if (!allowedRoles.includes(userRole)) {
                  throw new ApiError(
                        403,
                        "You are not authorized to use this resource"
                  );
            }

            next();
      };
};


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export {
      verifyToken,
      authorizeRole
};