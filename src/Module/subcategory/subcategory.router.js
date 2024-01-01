import { Router } from "express";
import * as SubCtegoryController from "./subcategory.controller.js"
import fileUploade, { fileValidation } from "../../Serveices/Multer.js";
import { asynchandler } from "../../Serveices/asyncHandler.js";

const Subcategoryrouter = Router({mergeParams:true})


Subcategoryrouter.post("/create" , fileUploade(fileValidation.image).single("image"), SubCtegoryController.createSubCategory)
Subcategoryrouter.get("/", asynchandler(  SubCtegoryController.getSubcategory))


export default Subcategoryrouter