import { Router } from "express";
import * as CtegoryController from "./Category.controller.js"
import fileUploade, { fileValidation } from "../../Serveices/Multer.js";
import Subcategoryrouter from "../subcategory/subcategory.router.js";
const categoryrouter = Router()
import auth from "../../MidlleWare/auth.js";
import { endPoint } from "./Category.endpoint.js";

categoryrouter.use("/:id/subcategory",Subcategoryrouter)
categoryrouter.post("/create" ,auth(endPoint.create)  ,fileUploade(fileValidation.image).single("image"), CtegoryController.createCategory)
categoryrouter.get("/get",CtegoryController.getCategory)
categoryrouter.get("/getActive",auth(endPoint.getActive),CtegoryController.getActiveCategory)
categoryrouter.get("/get/:id",auth(endPoint.specCategory),CtegoryController.specCategory)
categoryrouter.put("/update/:id",auth(endPoint.update),fileUploade(fileValidation.image).single("image"),CtegoryController.updateCategory)


export default categoryrouter