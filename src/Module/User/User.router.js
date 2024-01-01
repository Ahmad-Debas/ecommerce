import { Router } from "express";
import * as userController from "./User.controller.js"
import auth, { role } from "../../MidlleWare/auth.js";
import { asynchandler } from "../../Serveices/asyncHandler.js";
import { endPoint } from "./user.endpoint.js";
import fileUploade, { fileValidation } from "../../Serveices/Multer.js";
const userrouter = Router()


userrouter.get("/profile",auth(Object.values(role)), asynchandler( userController.getprofile))
userrouter.post("/userexcel",auth(endPoint.excel),fileUploade(fileValidation.excel).single("excel"), asynchandler( userController.uploadeuserexcel))
userrouter.get("/getuserpdf", userController.getuserpdf)





export default userrouter