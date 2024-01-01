import { Router } from "express";
import * as Authcontroller from "./Auth.controller.js"
import fileUploade, { fileValidation } from "../../Serveices/Multer.js";
import {asynchandler} from "../../Serveices/asyncHandler.js";

const authrouter=  Router()

authrouter.post("/signup",fileUploade(fileValidation.image).single("image"), asynchandler( Authcontroller.signup))
authrouter.get("/confirmEmail/:token",Authcontroller.confirmEmail)
authrouter.post("/login", asynchandler(Authcontroller.login))
authrouter.patch("/sendcode",asynchandler(Authcontroller.sendCode))
authrouter.patch("/forgetpass",asynchandler(Authcontroller.forgetPassword))
authrouter.delete("/notInvalid",asynchandler(Authcontroller.deleteInvvalidConfirm))

 
export default authrouter