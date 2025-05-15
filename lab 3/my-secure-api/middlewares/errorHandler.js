exports.errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === "JsonWebTokenError") {
    return res
      .status(401)
      .json({ message: "Invalid token. Please login again." });
  }

  if (err.name === "TokenExpiredError") {
    return res
      .status(401)
      .json({ message: "Your token has expired. Please login again." });
  }

  res.status(500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
};
