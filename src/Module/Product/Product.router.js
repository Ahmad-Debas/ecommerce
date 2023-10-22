import { Router } from "express";
import * as ProductController from "./Product.controller.js"
const productrouter = Router()


productrouter.get("/getproduct",ProductController.getproduct)


export default productrouter