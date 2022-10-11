/**
 * Configurations of logger.
 */
import winston from 'winston';
import winstonRotator from 'winston-daily-rotate-file'

const consoleConfig = [
    new winston.transports.Console(),
    new winston.transports.File({
        level: 'error',
        filename: 'logs/error.log',
    }),
    new winston.transports.File({
        level: 'info',
        filename: 'logs/info.log',
    }),
    new winston.transports.File({
        level: 'warn',
        filename: 'logs/warn.log',
    }),
];

const logger = winston.createLogger({
    transports: consoleConfig,
    format: winston.format.combine(
        winston.format.label({
            label: `🍀`
        }),
        winston.format.timestamp({
           format: 'MMM-DD-YYYY HH:mm:ss'
       }),
        winston.format.printf(info => `${info.level.toUpperCase()} ${info.level == 'info' ? '🍀' : info.level == 'warn' ? '🚧' : '🔥'} ${[info.timestamp]}: ${info.message}`),
    )
});

export default logger
