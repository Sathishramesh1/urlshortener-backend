import express from 'express'
import { Forget, Login, Register, Reset } from '../Controllers/user.js';
const router=express.Router();


//route for registering new user
router.route('/register').post(Register);


//route for login
router.route('/login').post(Login);



//route for forget Password
router.route("/forget").post(Forget);


//route for reset Password
router.route("/reset").post(Reset);







export const UserRouter=router