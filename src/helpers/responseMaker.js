const successResponse = (res, message, data = {}, code = 200) =>{
    return res.status(code).json({
        code,
        status: 'success',
        message,
        data
    })
}

const errorResponse = (res, message, code = 400) => {
    return res.status(code).json({
        code,
        status: 'error',
        message
    });
}

export {
    successResponse,
    errorResponse
}