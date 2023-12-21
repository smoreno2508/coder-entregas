import { errorResponse } from "../../helpers/responseMaker.js";

const errorHandler = (err, req, res, next) => {

    if (res.headersSent) return next(err);

    err = err || {};

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    errorResponse(res, message, statusCode);
}

export default errorHandler;