import { Router } from "express";
import * as orderControrller from "./oreder.controller.js"
import auth, { role } from "../../MidlleWare/auth.js";
import { endPoint } from "./oreder.endpoint.js";
import { asynchandler } from "../../Serveices/asyncHandler.js";
import { valid } from "../../MidlleWare/validation.js";
import * as validator from "./ordera.validation.js"


const orderrouter = Router()

orderrouter.post("/create",auth(endPoint.create),valid(validator.createorder),orderControrller.createorder)
orderrouter.patch("/cancelled/:orderId",auth(endPoint.canseled), asynchandler( orderControrller.canselorder ))
orderrouter.get("/",auth(endPoint.canseled),orderControrller.getorder)
orderrouter.patch("/changStatus/:orderId",auth(endPoint.change),orderControrller.changeStatus)




export  default orderrouter
