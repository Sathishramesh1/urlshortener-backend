import express from 'express'
import { Register } from '../Controllers/user.js';
const router=express.Router();


//route for registering new user
router.route('/register').post(Register);







export const UserRouter=router