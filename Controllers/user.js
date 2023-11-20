
import bcrypt from 'bcrypt'
import {User} from '../Models/UserModel.js';
import crypto from 'crypto'
import { sendMail } from '../Services/mailService.js';
import jwt from 'jsonwebtoken'


//function to handle new user registration
export const Register=async(req,res)=>{
 
    try{
        // Check if this user already exisits
    let user = await User.findOne({ email: req.body.email });
    // console.log(user)
    if (user) {
      return res.status(400).send('That user already exisits!');}

    const {password}=req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    
    // Generate a ActivationKey
 const ActivationKey = crypto.randomBytes(25).toString("hex");

    const newUser= await new User({ ...req.body, password: hashedPassword ,activationKey:ActivationKey}).save();

    sendMail(req.email,"Activation Link",ActivationKey);
    
    res.status(201).json({
        status:'success',
        message:"new user created"
    })
    }catch(err){
        console.log("error in creating new user",err);
        res.status(500).send("Internal Error");
    }

}


//function to handle the Login process


export const Login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        let user= await User.findOne({email:email});

if (!user) {
    return res.status(401).json({ message: "Email is not Registered" });
      }

 if(!user.isActivated){
    return res.status(401).json({message:'Your account not activated,Check the registered Email to Activated account'});

 }     

const passwordMatch = await bcrypt.compare(password, user.password);

if (!passwordMatch) {
         return res.status(401).json({ message: "Wrong Password" });
      }
           
const jwttoken = jwt.sign({id:user._id}, process.env.SECRET_KEY);
        
          res.status(200).json({ jwttoken,message:"login success" });    
    } 
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server Error")
        
    }

}


//function to handle Forget Password 
export const Forget = async(req,res)=>{

    try {
         const{email}=req.body;
      const user= await User.findOne({email:email});
      if(!user){
         return res.status(400).send("The email is not Registered");
     }
    
     // Generate a random token
     const token = crypto.randomBytes(25).toString("hex");
    
      // Store the token in the database
      user.resetToken = token;
      await user.save();
      
      //send password resetting mail
      sendMail(email,"password-reset",`
      Click below Link to Reset Your Password
     ${token}`);
    
      res.status(200).json({message:`The password reset mail send to ${email}`})
    
    } catch (error) {
        console.log("User email not found",error);
        res.status(404).send("Error occured ",error);
    }
    
    
    }

    export //function for resetting password
    const Reset=async(req,res)=>{
    try {
        const { resetToken } = req.params;
        const { password } = req.body;
       console.log(resetToken,"hello")
        // Finding the user  token
      const user = await User.findOne({ resetToken:resetToken });
    
      if (!user) {
        return res.status(404).json({ message: "Invalid token" });
      }
       // Update the user's password and delete token
       user.resetToken = undefined;
       const hashedPassword = await bcrypt.hash(password,10);
       user.password = hashedPassword;
       await user.save();
     
       return res.status(201).json({ message: "Password reset successfully" });
      
        
    } catch (error) {
        res.status(500).send('Internal server error');
        console.log(error)
        
    }
    
    
    }
    