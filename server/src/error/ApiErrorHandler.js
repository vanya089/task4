"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApiError = require("./ApiError");
function ApiErrorHandler(err, req, res) {
    if (err instanceof ApiError) {
        var apiError = err;
        res.status(apiError.code).json(apiError);
        return;
    }
    res.status(500).send('Server error');
}
module.exports = ApiErrorHandler;
