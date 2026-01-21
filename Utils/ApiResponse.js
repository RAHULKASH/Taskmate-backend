class ApiResponse {
    constructor(message,statusCode, data = null) {
    this.success=true;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

module.exports = ApiResponse;