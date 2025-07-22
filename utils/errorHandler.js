class ErrorHandler extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
    this.title = "Error :";
  }
}

module.exports = ErrorHandler;
