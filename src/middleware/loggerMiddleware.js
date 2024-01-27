import { buildLogger } from "../helpers/logger.js";

const loggerMiddleware = (req, res, next) => {
    const logger = buildLogger(req.originalUrl);

    const originalSend = res.send;

    res.send = function (body) {
        logger.debug(`Response: ${res.statusCode} - method: ${req.method}: ${req.originalUrl}`);
        originalSend.apply(res, arguments);
    };

    next();
};

export default loggerMiddleware;
