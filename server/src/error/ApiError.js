"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApiError = /** @class */ (function () {
    function ApiError(code, message) {
        this.code = code;
        this.message = message;
    }
    ApiError.badRequest = function (msg) {
        return new ApiError(400, msg);
    };
    ApiError.internal = function (msg) {
        return new ApiError(500, msg);
    };
    return ApiError;
}());
exports.default = ApiError;
