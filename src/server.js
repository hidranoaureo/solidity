const { env } = require("./config/env");
const { createApp } = require("./app");
const { logger } = require("./utils/logger");

const app = createApp();

function bootstrap() {
  const server = app.listen(env.port, () => {
    logger.info(`Token API listening on port ${env.port}`);
  });

  const shutdown = (signal) => {
    logger.info(`Received ${signal}, shutting down`);
    server.close(() => {
      process.exit(0);
    });
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

bootstrap();
