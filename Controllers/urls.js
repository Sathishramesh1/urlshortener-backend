import { Url } from "../Models/UrlModel.js";
import { User } from "../Models/UserModel.js";
import { nanoid } from 'nanoid'



//function to create new url
export const createUrl = async(req,res)=>{
    const {longUrl} = req.body;
    try {
        let user = await User.findOne({email:req.user.email})
        if(user){
            const shortUrl = nanoid(8);
            await Url.findOneAndUpdate({user:user._id}
                ,{$push:{urls:{longUrl:longUrl,shortUrl:shortUrl}}},
                { upsert: true, new: true });
            
          return  res.status(201).json({message:'new url added'})
        }else{
         return   res.status(400).json({message:'User not found'})
        }
       
    } catch (error) { 
        console.log(error)
        res.status(500).json({
            message:'Internal server error',
           
        })
    }
}


//function to get all url
export const getAllUrl=async(req,res)=>{

    try {
       let userUrls=await Url.findOne({user:req.user._id});

    if(userUrls){
        const UrlList=userUrls.urls  ;

        return res.status(200).json({UrlList,message:"UrlList Retrived Successfully"})

    }else{
       return res.status(404).json({message:'Unable to Find the UrlList'})


    }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:'Internal server error',
           
        })
        
    }


}


//function to get today url

export const todayUrl=async(req,res)=>{

    try {
      const userUrls = await Url.findOne({user:req.user._id});
      if (userUrls) {

        const currentDate = new Date();
        // Set the time to midnight of the current date
        currentDate.setHours(0, 0, 0, 0);
        const todayUrlList=userUrls.urls.filter((ele)=>ele.date>=currentDate);
        return res.status(200).json({ todayUrlList,message:"UrlList Retrived Successfully"})
        
      } else {
        return res.status(404).json({message:'Unable to Find the UrlList'})
        
      }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:'Internal server error',
           
        });

        
    }


}