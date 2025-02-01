export const GeneralErrorCodes = {
    UNKNOWN: "unknown",
    AUTH_ERROR: "auth-error",
    CLIENT_ERROR: "invalid-input",
    TOO_MANY_REQUESTS: "too-many-request",
    UNAUTHORIZED: "unauthorized-access",
    FILE_NOT_FOUND: "file-not-found",
    PAYMENT_FAILED: "payment-failed",
    PAYMENT_PENDING: "payment-pending",
    TRANSLATION_ERROR: "translation-error",
};

export const MongoErrorCodeMapping: Record<number, string> = {
    11000: "duplicate_key_error",
    11001: "duplicate_key_error",
    121: "document_validation_failed",
    13: "unauthorized_operation",
};

export const MongoErrorMessageMapping: Record<number, string> = {
    11000: "Duplicate key error: a record with that key already exists.",
    11001: "Duplicate key error: a record with that key already exists.",
    121: "Document validation failed: The document does not meet the schema requirements.",
    13: "Unauthorized operation: You are not allowed to perform this action.",
};

export const R = Object.freeze({
    ERROR_UNKNOWN: "Something went wrong",
    ERROR_USER_ALREADY_EXIST: "User already exist",
    ERROR_USERNAME_TAKEN: "Username already taken",
    ERROR_TOO_MANY_REQUESTS: "Blocked: Too many request.",
    INVALID_OTP: "Invalid OTP",
    ERROR_INVALID_CREDENTIAL: "Invalid credential",
    ERROR_UNAUTHORIZED: "Unauthorized access",
    STUDENT_ACCESS_RESTRICTION: "Only students are allowed",
    ERROR_INVALID_ADMIN_SECRET_KEY: "Invalid admin secret key",
    ERROR_PAYMENT_FAILED: "Payment failed",
    ERROR_PAYMENT_PENDING: "Payment pending",
    TRANSLATION_ERROR: "Translation error",
});