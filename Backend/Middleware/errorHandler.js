// Centralized error handling middleware for Express


function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Validation error (e.g., Mongoose, Joi)
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = err.message || "Validation Error";
  }

  // Duplicate key error (MongoDB)
  if (err.code && err.code === 11000) {
    statusCode = 409;
    message = "Duplicate key error";
  }

  // CastError (e.g., invalid ObjectId)
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // Unauthorized error (e.g., JWT, express-jwt)
  if (err.name === "UnauthorizedError") {
    statusCode = 401;
    message = "Unauthorized access";
  }

  // Custom status code/message
  if (err.statusCode) {
    statusCode = err.statusCode;
  }
  if (err.message) {
    message = err.message;
  }

  // Stack trace only in development
  const response = {
    success: false,
    error: message,
    statusCode: statusCode,
  };
  if (process.env.NODE_ENV !== "production") {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
}

export default errorHandler;
