import { Request, Response } from "express";
import { GeneralErrorCodes, MongoErrorCodeMapping, MongoErrorMessageMapping, R } from "./errorCodes";

export const errorHandler = (
    error: any,
    req: Request,
    res: Response
): void => {
    if (error.name === "MongoServerError") {
        const errorCode = error.code;
        res.status(422).json({
            error: MongoErrorCodeMapping[errorCode] || GeneralErrorCodes.UNKNOWN,
            message: MongoErrorMessageMapping[errorCode] || R.ERROR_UNKNOWN,
            detail: "A database error occurred. Please try again.",
        });
        return;
    }

    if (error && error.error && error.error.isJoi) {
        res.status(422).json({
            error: error.errorCode || GeneralErrorCodes.UNKNOWN,
            message: error.error?.message || error.error.toString(),
            detail:
                "You received this error because you have sent an invalid input payload.",
        });
        return;
    }

    if (error.statusCode) {
        res.status(error.statusCode).json({
            error: error.errorCode || GeneralErrorCodes.UNKNOWN,
            message: error.message,
            detail: error.detail || "An unexpected exception occurred. Please try again.",
        });
        return;
    }

    res.status(500).json({
        error: error?.code || GeneralErrorCodes.UNKNOWN,
        message: error?.message || "Internal server error",
        detail: "An unexpected exception occurred. Please try again.",
    });
};
