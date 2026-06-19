class ApiError extends Error {
      constructor(statusCode, message = "Something went wrong", error = []) {
            super(message)
            this.statusCode = statusCode || 500
            this.error = error
            this.success = false

            Error.captureStackTrace(this, this.constructor)
      }
}

export default ApiError