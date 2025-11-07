import winston from "winston";

const { combine, timestamp, json } = winston.format;

const errorFilter = winston.format((info) => {
  return info.level === "error" ? info : false;
});

const warnFilter = winston.format((info) => {
  return info.level === "warn" ? info : false;
});

const infoFilter = winston.format((info) => {
  return info.level === "info" ? info : false;
});

export const logger = winston.createLogger({
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.Console({
      format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.colorize(),
        winston.format.printf(({ level, message, timestamp }) => {
          const msg =
            typeof message === "object"
              ? JSON.stringify(message, null, 2)
              : message;
          return `[${timestamp}] ${level}: ${msg}`;
        })
      ),
    }),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      format: combine(errorFilter(), json()),
    }),
    new winston.transports.File({
      filename: "logs/warn.log",
      level: "warn",
      format: combine(warnFilter(), json()),
    }),
    new winston.transports.File({
      filename: "logs/info.log",
      level: "info",
      format: combine(infoFilter(), json()),
    }),
  ],
});
