import express from 'express'
import { Dashboard, createUrl, getAllUrl, thisMonthUrl, todayUrl } from '../Controllers/urls.js';


const router=express.Router();


//route for creating new url
router.route('/createUrl').post(createUrl);



//route for get all url
router.route("/getAllUrl").get(getAllUrl);



//route for get today url
router.route("/getTodayUrl").get(todayUrl);



//route for this monthly url
router.route('/getThisMonth').get(thisMonthUrl)


//dashboard count
router.route('/dashboard').get(Dashboard)






export const UrlRouter=router