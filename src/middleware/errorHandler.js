const { isProduction } = require("../config/env");
const { AppError } = require("../errors/AppError");
const { logger } = require("../utils/logger");

function contractMessage(error) {
  return (
    error?.shortMessage ||
    error?.reason ||
    error?.info?.error?.message ||
    error?.message ||
    "Contract call failed."
  );
}

const errorHandler = (error, _req, res, _next) => {
  if (error instanceof AppError) {
    if (error.statusCode >= 500) {
      logger.error(error.message);
    }

    return res.status(error.statusCode).json({ message: error.message });
  }

  logger.error("Unhandled error", {
    message: error.message,
    code: error.code,
  });

  const statusCode = error.code === "CALL_EXCEPTION" ? 502 : 500;
  const message = isProduction
    ? "Internal server error."
    : contractMessage(error);

  return res.status(statusCode).json({ message });
};

module.exports = { errorHandler };
