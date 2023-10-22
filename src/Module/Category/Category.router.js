import { Router } from "express";
import * as CtegoryController from "./Category.controller.js"
const categoryrouter = Router()


categoryrouter.get("/",CtegoryController.hhhh)


export default categoryrouter