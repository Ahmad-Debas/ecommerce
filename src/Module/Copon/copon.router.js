import { Router } from "express";
import * as CoponController from "./copon.contoller.js"
import * as validator from "./copon.validation.js"
import {valid} from "../../MidlleWare/validation.js"
const coponrouter = Router()
coponrouter.post("/create",valid(validator.createCopon),CoponController.createCoupon)
coponrouter.get("/",CoponController.getCoupon)
coponrouter.put("/:id",CoponController.updateCopon)
coponrouter.patch("/softDelete/:id",CoponController.softDelete)
coponrouter.delete("/hardDelete/:id",CoponController.hardDelete)
coponrouter.patch("/restore/:id",CoponController.restore)







export default coponrouter