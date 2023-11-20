import mongoose from "mongoose";


const UserSchema=mongoose.Schema({
    firstName:String,
    lastName:String,
     email:{
        type:String,
        unique:true,
        required:true,
        trim:true
     },
     password:{
        type:String,
        required:true,
    },
    isActivated:{
        type:Boolean,
        default:false
    },
    activationKey:String,
    resetToken:String
    


});

const User=mongoose.model("User",UserSchema);

export {User}