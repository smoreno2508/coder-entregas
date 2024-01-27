import { errorResponse } from "../../helpers/responseMaker.js";
import { buildLogger } from "../../helpers/logger.js";

const errorHandler = (err, req, res, next) => {

    if (res.headersSent) return next(err);

    err = err || {};

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    const logger = buildLogger(req.originalUrl);
    
    logger.error(`[${statusCode}]: ${message}`, { error: err });

    errorResponse(res, message, statusCode);
}

export default errorHandler;