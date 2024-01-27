import winston, { format } from "winston";

const{ combine, timestamp, json } = format;

const logLevel = process.env.LOG_LEVEL || "debug";

const logFormat = winston.format.printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

winston.addColors({
    error: "red",
    warn: "yellow",
    info: "green",
    debug: "blue",
});

const logger = winston.createLogger({
    level: logLevel,
    format: combine(
        timestamp(), 
        json()
    ),
    transports: [
        new winston.transports.File({ filename: "src/logs/error.log", level: "error" }),
        new winston.transports.File({ filename: "src/logs/combined.log", level: "info"}),
    ],
});

logger.add(new winston.transports.Console({
    level: logLevel,
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.label({ label: 'Ecommerce-coder' }),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
    )
}));

export const buildLogger = (service) => {
    return{
        info: (message) => {
            logger.info({ message, service});
        },
        error: (message) => {
            logger.error({message, service});
        },
        warn: (message) => {
            logger.warn({message, service});
        },
        debug: (message) => {
            logger.debug({message, service});
        },
    }
}