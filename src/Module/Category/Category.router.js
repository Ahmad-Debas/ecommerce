import { Router } from "express";
import * as CtegoryController from "./Category.controller.js"
import fileUploade, { fileValidation } from "../../Serveices/Multer.js";
import Subcategoryrouter from "../subcategory/subcategory.router.js";
const categoryrouter = Router()
import auth, { role } from "../../MidlleWare/auth.js";
import { endPoint } from "./Category.endpoint.js";
import { valid } from "../../MidlleWare/validation.js";
import * as validetor from "./Category.validation.js"
import { asynchandler } from "../../Serveices/asyncHandler.js";

categoryrouter.use("/:id/subcategory",Subcategoryrouter)
categoryrouter.post("/create" ,auth(endPoint.create)  ,fileUploade(fileValidation.image).single("image"),valid(validetor.createCategory), asynchandler(CtegoryController.createCategory))
categoryrouter.get("/get" ,auth(endPoint.getall),CtegoryController.getCategory)
categoryrouter.get("/getActive", asynchandler (CtegoryController.getActiveCategory))
categoryrouter.get("/get/:id",valid(validetor.getspecficcategory), asynchandler (CtegoryController.specCategory))
categoryrouter.put("/update/:id",auth(endPoint.update),fileUploade(fileValidation.image).single("image"),asynchandler( CtegoryController.updateCategory))
categoryrouter.delete("/deletecat/:id",auth(endPoint.delete),CtegoryController.deletecategory)


export default categoryrouter