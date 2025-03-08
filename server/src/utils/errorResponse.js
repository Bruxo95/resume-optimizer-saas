/**
 * Custom error response class
 * @extends Error
 */
class ErrorResponse extends Error {
  /**
   * Create an ErrorResponse
   * @param {string} message - Error message
   * @param {number} statusCode - HTTP status code
   */
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

/**
 * Format success response
 * @param {object} data - Data to send in response
 * @param {string} message - Success message
 * @returns {object} Formatted success response
 */
const successResponse = (data = null, message = 'Operation successful') => {
  return {
    success: true,
    message,
    data,
  };
};

/**
 * Format error response
 * @param {Error} error - Error object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message (overrides error.message)
 * @returns {object} Formatted error response
 */
const errorResponse = (error, statusCode = 500, message = null) => {
  return {
    success: false,
    message: message || error.message || 'Server Error',
    error: process.env.NODE_ENV === 'production' ? {} : error,
    statusCode: statusCode || error.statusCode || 500,
  };
};

/**
 * Async handler to avoid try-catch blocks in controllers
 * @param {function} fn - Async function to handle
 * @returns {function} Express middleware function
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = {
  ErrorResponse,
  successResponse,
  errorResponse,
  asyncHandler,
};
