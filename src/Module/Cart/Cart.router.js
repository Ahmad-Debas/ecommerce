import { Router } from "express";
import * as CartController from "./Cart.controller.js"
import auth from "../../MidlleWare/auth.js";
import { endPoint } from "./Cart.endpoint.js";
const cartrouter = Router()

cartrouter.post("/create",auth(endPoint.create),CartController.createcart)
cartrouter.patch("/removeItem",auth(endPoint.delete),CartController.removeItem)
cartrouter.patch("/clear",auth(endPoint.clear),CartController.clearcart)
cartrouter.get("/",auth(endPoint.get),CartController.getCart)



export default cartrouter