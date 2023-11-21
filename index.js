
import express from "express"
import dotenv from "dotenv";
import cors from "cors";
import { dbconnection } from "./db.js";
import { UserRouter } from "./Routes/users.js";
import { UrlRouter } from "./Routes/urls.js";
// import { urlRouter } from "./Routes/urls.js";
import  {isAuthorized}  from "./Authentication/userAuth.js";
import { redirectUrl } from "./Controllers/user.js";
// import { getURL } from './Controllers/urls.js';

dotenv.config();
const PORT = process.env.PORT;
const app = express(); 


app.use(express.json());
app.use(cors());


dbconnection();

//user is the base route 
app.use("/user", UserRouter);
app.use("/url",isAuthorized, UrlRouter);

app.get("/", (req,res)=> {
   res.status(200).send({msg:"connection working - URL shortener app"});
});


//redirect based on short url
app.get("/:shortUrl",redirectUrl)


 
app.listen(PORT,()=>console.log(`Server started at localhost:${PORT}`))