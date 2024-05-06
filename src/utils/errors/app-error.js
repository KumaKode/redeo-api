class AppError extends Error {
  constructor(message, explanation, statusCode) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.explanation = explanation;
  }
}

module.exports = AppError;
