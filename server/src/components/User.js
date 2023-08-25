"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    registrationDate: Date,
    lastLoginDate: Date,
    status: String,
    complete: Boolean,
});
var User = (0, mongoose_1.model)('User', UserSchema);
exports.default = User;
