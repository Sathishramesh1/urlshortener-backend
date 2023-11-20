import { Url } from "../Models/UrlModel";
import { nanoid } from 'nanoid'


const createUrl = async(req,res)=>{
    const {longUrl} = req.body;
    try {
        let url = await Url.findOne({longUrl})
        if(!url){
            const shortUrl = shortid(8);
            const url = await Url.create({
                longUrl,
                shortUrl,
                userId: id
                
            })
            res.json({
                message: "Url create successfull",
                statusCode: 201,
                url
            });
        }else{
            res.json({
                message:'Given url already found',
                statusCode:400
            })
        }
       
    } catch (error) { 
        console.log(error)
        res.json({
            message:'Internal server error',
            statusCode:500
        })
    }
}
