"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const ApiError_1 = require("../error/ApiError");
const User_1 = require("../components/User");
class UserController {
    createNewUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return next(new ApiError_1.default(400, 'Fields must not be empty!'));
                }
                const { email, username, password } = req.body;
                const candidate = yield User_1.default.findOne({ email, username });
                if (!candidate) {
                    const newUser = new User_1.default({
                        username,
                        email,
                        password,
                        registrationDate: new Date(),
                        lastLoginDate: null,
                        status: 'active',
                        complete: false,
                    });
                    yield newUser.save();
                    return res.status(200).json({ message: 'Registration successful' });
                }
                else {
                    return next(new ApiError_1.default(400, 'The user is already registered!'));
                }
            }
            catch (e) {
                return res.status(500).json(e);
            }
        });
    }
    loginNewUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield User_1.default.findOne({ email, password });
                if (!user) {
                    return next(new ApiError_1.default(400, 'User is not found!'));
                }
                const validPassword = yield User_1.default.findOne({ password });
                if (!validPassword) {
                    return next(new ApiError_1.default(400, 'Password error!'));
                }
                user.lastLoginDate = new Date();
                return res.status(200).json({ message: 'User authenticated successfully' });
            }
            catch (e) {
                return next(new ApiError_1.default(400, 'Login failed!'));
            }
        });
    }
    getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield User_1.default.find();
                return res.json(users);
            }
            catch (e) {
                return next(new ApiError_1.default(400, 'Server error!'));
            }
        });
    }
    block(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.query.userId;
                const result = yield User_1.default.findOneAndUpdate({ _id: userId }, { status: 'blocked' });
                return res.status(200).json(result);
            }
            catch (e) {
                return next(new ApiError_1.default(400, 'Server error!'));
            }
        });
    }
    blockAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield User_1.default.updateMany({}, { status: 'blocked' });
                return res.status(200).json({ message: 'All users blocked successfully' });
            }
            catch (error) {
                return res.status(500).json({ error: 'An error occurred' });
            }
        });
    }
    checkUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id, complete } = req.body;
                const result = yield User_1.default.findOneAndUpdate({ _id }, { complete }, { new: true });
                return res.status(200).json(result);
            }
            catch (e) {
                return next(new ApiError_1.default(400, 'Selection error!'));
            }
        });
    }
    checkAllUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield User_1.default.updateMany({ complete: false }, { $set: { complete: true } });
                console.log(result);
                return res.status(200).json({ message: 'success' });
            }
            catch (e) {
                return next(new ApiError_1.default(400, 'Selection error!'));
            }
        });
    }
    deleteOneUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.query.userId;
                const result = yield User_1.default.findOneAndDelete({ _id: userId });
                return res.status(200).json(result);
            }
            catch (error) {
                return next(new ApiError_1.default(400, 'Deletion error!'));
            }
        });
    }
    deleteChecked(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const complete = true;
                const result = yield User_1.default.deleteMany({ complete });
                return res.status(200).json(result);
            }
            catch (e) {
                return next(new ApiError_1.default(400, 'Deletion error!'));
            }
        });
    }
}
exports.default = new UserController();
