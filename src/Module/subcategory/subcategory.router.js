import { Router } from "express";
import * as SubCtegoryController from "./subcategory.controller.js"
import fileUploade, { fileValidation } from "../../Serveices/Multer.js";

const Subcategoryrouter = Router({mergeParams:true})


Subcategoryrouter.post("/create" , fileUploade(fileValidation.image).single("image"), SubCtegoryController.createSubCategory)
Subcategoryrouter.get("/",SubCtegoryController.getSubcategory)


export default Subcategoryrouter