const { createLogger, transports, format } = require("winston");
const costumFormat = format.combine(
  format.timestamp(),
  format.printf((info) => {
    return `[${info.timestamp}] || [${info.level
      .toUpperCase()
      .padStart(5)
      .padEnd(10)}] || ${info.message}`;
  })
);
const logger = createLogger({
  format: costumFormat,
  transports: [
    new transports.Console({ level: "silly" }),
    new transports.File({ filename: "app.logs", level: "info" }),
  ],
});
module.exports = logger;
