import { Router } from "express";
import * as CtegoryController from "./Category.controller.js"
import fileUploade, { fileValidation } from "../../Serveices/Multer.js";

const categoryrouter = Router()


categoryrouter.post("/create" , fileUploade(fileValidation.image).single("image"), CtegoryController.createCategory)
categoryrouter.get("/get",CtegoryController.getCategory)
categoryrouter.get("/getActive",CtegoryController.getActiveCategory)
categoryrouter.get("/get/:id",CtegoryController.specCategory)
categoryrouter.put("/update/:id",fileUploade(fileValidation.image).single("image"),CtegoryController.updateCategory)


export default categoryrouter