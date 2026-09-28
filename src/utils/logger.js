const levels = {
  error: "error",
  warn: "warn",
  info: "info",
};

function write(level, message, extra) {
  const line = {
    level,
    time: new Date().toISOString(),
    message,
    ...(extra ? { extra } : {}),
  };

  const output = JSON.stringify(line);

  if (level === levels.error) {
    console.error(output);
    return;
  }

  if (level === levels.warn) {
    console.warn(output);
    return;
  }

  console.log(output);
}

const logger = {
  info(message, extra) {
    write(levels.info, message, extra);
  },
  warn(message, extra) {
    write(levels.warn, message, extra);
  },
  error(message, extra) {
    write(levels.error, message, extra);
  },
};

module.exports = { logger };
