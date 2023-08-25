import express = require("express");
import {check} from "express-validator";
import UserController from './src/controllers/UserController';

const router = express.Router();

router.post('/registration', [
    check('email', "Email must not be empty").notEmpty(),
    check('username', "Username must not be empty").notEmpty(),
    check('password', "Password must not be empty").notEmpty(),
], UserController.createNewUser);
router.post('/login', UserController.loginNewUser);
router.get('/getUsers', UserController.getUsers);
router.put('/block/:id', UserController.block);
router.put('/blockAll', UserController.blockAll);
router.patch('/check', UserController.checkUser);
router.patch('/checkAll', UserController.checkAllUsers);
router.delete('/deleteOne/:id', UserController.deleteOneUser);
router.delete('/deleteChecked', UserController.deleteChecked);

export = router;

