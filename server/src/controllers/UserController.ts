import { validationResult } from 'express-validator';
import ApiError from '../error/ApiError';
import { Request, Response, NextFunction } from 'express';
import User from '../components/User';

class UserController {
    async createNewUser(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(new ApiError(400, 'Fields must not be empty!'));
            }
            const { email, username, password } = req.body;
            const candidate = await User.findOne({ email, username });
            if (!candidate) {
                const newUser = new User({
                    username,
                    email,
                    password,
                    registrationDate: new Date(),
                    lastLoginDate: null,
                    status: 'active',
                    complete: false,
                });
                await newUser.save();
                return res.status(200).json({ message: 'Registration successful' });
            } else {
                return next(new ApiError(400, 'The user is already registered!'));
            }
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async loginNewUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email, password });
            if (!user) {
                return next(new ApiError(400, 'User is not found!'));
            }

            const validPassword = await User.findOne({ password });
            if (!validPassword) {
                return next(new ApiError(400, 'Password error!'));
            }

            user.lastLoginDate = new Date();
            return res.status(200).json({ message: 'User authenticated successfully' });
        } catch (e) {
            return next(new ApiError(400, 'Login failed!'));
        }
    }

    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await User.find();
            return res.json(users);
        } catch (e) {
            return next(new ApiError(400, 'Server error!'));
        }
    }

    async block(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.query.userId;
            const result = await User.findOneAndUpdate({ _id: userId }, { status: 'blocked' });
            return res.status(200).json(result);
        } catch (e) {
            return next(new ApiError(400, 'Server error!'));
        }
    }

    async blockAll(req: Request, res: Response) {
        try {
            await User.updateMany({}, { status: 'blocked' });
            return res.status(200).json({ message: 'All users blocked successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred' });
        }
    }

    async checkUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { _id, complete } = req.body;
            const result = await User.findOneAndUpdate({ _id }, { complete }, { new: true });
            return res.status(200).json(result);
        } catch (e) {
            return next(new ApiError(400, 'Selection error!'));
        }
    }

    async checkAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await User.updateMany({ complete: false }, { $set: { complete: true } });
            console.log(result);
            return res.status(200).json({ message: 'success' });
        } catch (e) {
            return next(new ApiError(400, 'Selection error!'));
        }
    }

    async deleteOneUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.query.userId;
            const result = await User.findOneAndDelete({ _id: userId });
            return res.status(200).json(result);
        } catch (error) {
            return next(new ApiError(400, 'Deletion error!'));
        }
    }

    async deleteChecked(req: Request, res: Response, next: NextFunction) {
        try {
            const complete = true;
            const result = await User.deleteMany({ complete });
            return res.status(200).json(result);
        } catch (e) {
            return next(new ApiError(400, 'Deletion error!'));
        }
    }
}

export default new UserController();
