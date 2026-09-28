const path = require("node:path");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const methodOverride = require("method-override");
const morgan = require("morgan");
const responseTime = require("response-time");
const favicon = require("serve-favicon");
const { isProduction } = require("./config/env");
const { errorHandler } = require("./middleware/errorHandler");
const { notFound } = require("./middleware/notFound");
const routes = require("./routes");

const publicDir = path.join(__dirname, "..", "public");

function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.use(helmet());
  app.use(compression());
  app.use(responseTime());
  app.use(cors());
  app.use(cookieParser());
  app.use(methodOverride());
  app.use(express.json({ limit: "32kb" }));
  app.use(morgan(isProduction ? "combined" : "dev"));
  app.use(
    rateLimit({
      windowMs: 60 * 1000,
      limit: 120,
      standardHeaders: true,
      legacyHeaders: false,
    })
  );
  app.use(favicon(path.join(publicDir, "favicon.png")));
  app.use("/public", express.static(publicDir));
  app.use(routes);
  app.use(notFound);
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };
