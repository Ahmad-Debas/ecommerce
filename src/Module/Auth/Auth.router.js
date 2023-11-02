import { Router } from "express";
import * as Authcontroller from "./Auth.controller.js"
import fileUploade, { fileValidation } from "../../Serveices/Multer.js";
const authrouter=  Router()

authrouter.post("/signup",fileUploade(fileValidation.image).single("image"),Authcontroller.signup)
authrouter.get("/confirmEmail/:token",Authcontroller.confirmEmail)
authrouter.post("/login",Authcontroller.login)





export default authrouter