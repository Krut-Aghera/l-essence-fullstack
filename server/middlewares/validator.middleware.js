import { validationResult } from "express-validator";
import ApiError from "../utils/error.handler.js";

export const validationEngine = (req, res, next) => {
    const errors = validationResult(req);

    const errorObject = errors.array().map((err) => {
        return {
            field: err.path,
            message: err.msg,
        };
    });

    if (!errors.isEmpty()) {
        console.log("Validation errors found", errorObject);
        throw new ApiError(400, "Validation Error", errorObject);
    }
    next();
};
