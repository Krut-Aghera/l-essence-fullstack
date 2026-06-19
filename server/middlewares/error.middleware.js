import ApiError from "../utils/error.handler.js"
import ApiResponse from "../utils/response.handler.js"

const globalErrorHandler = (err, req, res, next) => {
      console.log("💥💥 error middleware triggered")
      
      let statusCode = err.statusCode || 500
      let message = err.message || "Internal Server Error"
      let error = err.error || []

      
      if (err instanceof ApiError) {
            return res
                  .status(statusCode)
                  .json(new ApiResponse(statusCode, message, error))
      }
      
      if (err.name === "ValidationError") {
            statusCode = 400
            message = "Validation Error"
            error = Object.values(err.errors).map((el) => el.message)
      }

      if (err.name === "CastError") {
            statusCode = 400
            message = `invalid ${err.path}`
            error = [err.value]
      }


      if (err.code === 11000) {
            statusCode = 400
            message = "User already exists"
            error = [err.keyValue]
      }


      return res
            .status(statusCode)
            .json(new ApiResponse(statusCode, message, error))
}


export default globalErrorHandler