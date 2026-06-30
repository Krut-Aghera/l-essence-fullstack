class ApiResponse {
    constructor(statusCode, message, data = []) {
        this.statusCode = statusCode;
        this.message = message || "Success";
        this.success = statusCode >= 200 && statusCode < 300;
        this.data = data;
    }
}

export default ApiResponse;
