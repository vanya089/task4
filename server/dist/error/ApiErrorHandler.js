"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = require("../error/ApiError");
function ApiErrorHandler(err, req, res) {
    if (err instanceof ApiError_1.default) {
        const apiError = err;
        res.status(apiError.code).json(apiError);
        return;
    }
    res.status(500).send('Server error');
}
exports.default = ApiErrorHandler;
