class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
  }
}

class ConfigError extends AppError {
  constructor(message) {
    super(message, 500);
    this.name = "ConfigError";
  }
}

class ContractError extends AppError {
  constructor(message, statusCode = 502) {
    super(message, statusCode);
    this.name = "ContractError";
  }
}

module.exports = { AppError, ConfigError, ContractError };
