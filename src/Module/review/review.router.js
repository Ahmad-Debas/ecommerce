import { Router } from "express";
import * as reviewController from "./review.controller.js"
import auth from "../../MidlleWare/auth.js";
import { endpoint } from "./review.enpoint.js";

const reviewrouter = Router({mergeParams:true})

reviewrouter.post("/",auth(endpoint.create),reviewController.createreview)






export default reviewrouter