import { Router } from "express";
import * as CoponController from "./copon.contoller.js"
const coponrouter = Router()
coponrouter.post("/create",CoponController.createCoupon)
coponrouter.get("/",CoponController.getCoupon)
coponrouter.put("/:id",CoponController.updateCopon)
coponrouter.patch("/softDelete/:id",CoponController.softDelete)
coponrouter.delete("/hardDelete/:id",CoponController.hardDelete)
coponrouter.patch("/restore/:id",CoponController.restore)







export default coponrouter