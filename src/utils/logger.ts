import { format } from "path";
import winston from "winston";

const { combine, timestamp, json } = winston.format;
const errorFilter = winston.format(( info, opts) => {
    return info.level === 'error' ? info: false;
});
const infoFilter = winston.format(( info, opts ) => {
    return info.level === 'info' ? info: false;
})

export const logger = winston.createLogger({
    format: combine(timestamp(), json()),
    transports: [
        new winston.transports.Console({
            level: 'error',
            format: combine(errorFilter(), winston.format.colorize())
        }),
        new winston.transports.Console({
            level: 'info',
            format: combine(infoFilter(), winston.format.colorize())
        }),
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
            format: combine(errorFilter(), winston.format.colorize())
        }),
        new winston.transports.File({
            filename: 'logs/info.log',
            level: 'info',
            format: combine(infoFilter(), winston.format.colorize())
        })
    ]
})