import { Router } from "express";
import * as CtegoryController from "./Category.controller.js"
import fileUploade, { fileValidation } from "../../Serveices/Multer.js";

const categoryrouter = Router()


categoryrouter.post("/create" , fileUploade(fileValidation.image).single("image"), CtegoryController.createCategory)


export default categoryrouter