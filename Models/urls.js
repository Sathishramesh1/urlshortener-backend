import mongoose from "mongoose";

const UrlSchema=mongoose.Schema({
   user:{ 
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
},
urls:[{
    longUrl:String,
    shortUrl:{
        type:String,
        unique:true,
        trim:true
    },
    clickCount:{
        type:Number,
        default:0
    },
    date:{
        type:Date,
        default:Date.now
    }
}]


});

const Url=mongoose.model("Url",UrlSchema);

export {Url}