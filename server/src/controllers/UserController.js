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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var User = require("../components/User");
var express_validator_1 = require("express-validator");
var ApiError = require("../error/ApiError");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.createNewUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var errors, _a, email, username, password, candidate, newUser, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        errors = (0, express_validator_1.validationResult)(req);
                        if (!errors.isEmpty()) {
                            next(ApiError.badRequest('Fields must not be empty!'));
                            return [2 /*return*/];
                        }
                        _a = req.body, email = _a.email, username = _a.username, password = _a.password;
                        return [4 /*yield*/, User.findOne({ email: email, username: username })];
                    case 1:
                        candidate = _b.sent();
                        if (!!candidate) return [3 /*break*/, 3];
                        newUser = new User({
                            username: username,
                            email: email,
                            password: password,
                            registrationDate: new Date(),
                            lastLoginDate: null,
                            status: 'active',
                            complete: false,
                        });
                        return [4 /*yield*/, newUser.save()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, res.status(200).json({ message: 'Registration successful' })];
                    case 3:
                        next(ApiError.badRequest('The user is already registered!'));
                        _b.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_1 = _b.sent();
                        res.status(500).json(e_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.loginNewUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, user, validPassword, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, email = _a.email, password = _a.password;
                        return [4 /*yield*/, User.findOne({ email: email, password: password })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            next(ApiError.badRequest('User is not found!'));
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, User.findOne({ password: password })];
                    case 2:
                        validPassword = _b.sent();
                        if (!validPassword) {
                            next(ApiError.badRequest('Password error!'));
                            return [2 /*return*/];
                        }
                        user.lastLoginDate = new Date();
                        res.status(200).json({ message: 'User authenticated successfully' });
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _b.sent();
                        next(ApiError.badRequest('Login failed!'));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getUsers = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var users, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, User.find()];
                    case 1:
                        users = _a.sent();
                        res.json(users);
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _a.sent();
                        next(ApiError.badRequest('Server error!'));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.block = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, result, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = req.query.userId;
                        return [4 /*yield*/, User.findOneAndUpdate({ _id: userId }, { status: 'blocked' })];
                    case 1:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        e_4 = _a.sent();
                        next(ApiError.badRequest('Server error!'));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.blockAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, User.updateMany({}, { status: 'blocked' })];
                    case 1:
                        _a.sent();
                        res.status(200).json({ message: 'All users blocked successfully' });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        res.status(500).json({ error: 'An error occurred' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.checkUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _id, complete, result, e_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, _id = _a._id, complete = _a.complete;
                        return [4 /*yield*/, User.findOneAndUpdate({ _id: _id }, { complete: complete }, { new: true })];
                    case 1:
                        result = _b.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        e_5 = _b.sent();
                        next(ApiError.badRequest('Selection error!'));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.checkAllUsers = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, User.updateMany({ complete: false }, { $set: { complete: true } })];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        res.status(200).json({ message: 'success' });
                        return [3 /*break*/, 3];
                    case 2:
                        e_6 = _a.sent();
                        next(ApiError.badRequest('Selection error!'));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.deleteOneUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = req.query.userId;
                        return [4 /*yield*/, User.findOneAndDelete({ _id: userId })];
                    case 1:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        next(ApiError.badRequest('Deletion error!'));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.deleteChecked = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var complete, result, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        complete = true;
                        return [4 /*yield*/, User.deleteMany({ complete: complete })];
                    case 1:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        e_7 = _a.sent();
                        next(ApiError.badRequest('Deletion error!'));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports.default = new UserController();
