import AppError from "../utils/AppError.js";

const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 409);
};

const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data. ${errors.join(". ")}`;
    return new AppError(message, 400);
};

const handleMulterError = (err) => {
    if (err.code === "LIMIT_FILE_SIZE") {
        return new AppError("File is too large. Max size is 5MB", 400);
    }
    return new AppError(err.message, 400);
};

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        success: false,
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

const sendErrorProd = (err, res) => {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }
    // Programming or other unknown error: don't leak error details
    else {
        console.error("ERROR", err);
        res.status(500).json({
            success: false,
            message: "Something went very wrong!",
        });
    }
};

export const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if (process.env.NODE_ENV === "development") {
        sendErrorDev(err, res);
    } else {
        let error = { ...err };
        error.message = err.message;

        if (err.name === "CastError") error = handleCastErrorDB(err);
        if (err.code === 11000) error = handleDuplicateFieldsDB(err);
        if (err.name === "ValidationError") error = handleValidationErrorDB(err);
        if (err.name === "MulterError") error = handleMulterError(err);
        if (err.message === "Only image files are allowed" || err.message === "Only PDF files are allowed") {
            error = new AppError(err.message, 400);
        }

        sendErrorProd(error, res);
    }
};
