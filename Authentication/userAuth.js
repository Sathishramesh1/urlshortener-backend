import {User} from '../Models/UserModel.js'
import jwt from 'jsonwebtoken'

 function getUserById(id) {
    return User.findById(id).select("_id firstName lastName email");
  }



// custom middleware
export const isAuthorized = async (req,res,next) => {
    let token;
    if (req.header) {
      try {
        token = await req.headers["x-auth-token"];
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.user = await getUserById(decode.id);
        next();
        
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server error" });
      }
    }
  };
  
  