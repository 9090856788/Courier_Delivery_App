// 404 not found error handler

export const notFoundHandler = (req, res, next) => {
  return res.status(400).json({
    success: false,
    message: "Not found",
  });
};

// Centralize Error Handler

export const errorHandler = (err, req, res, next) => {
  console.error("Error", err);

  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
