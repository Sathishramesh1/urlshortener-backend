import express from 'express'
import { createUrl, getAllUrl, todayUrl } from '../Controllers/urls.js';


const router=express.Router();


//route for creating new url
router.route('/createUrl').post(createUrl);



//route for get all url
router.route("/getAllUrl").get(getAllUrl);



//route for get all url
router.route("/getTodayUrl").get(todayUrl);













export const UrlRouter=router