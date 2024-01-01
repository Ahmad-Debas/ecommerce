import { Router } from "express";
import * as ProductController from "./Product.controller.js"
import auth from "../../MidlleWare/auth.js";
import { endPoint } from "./product.endpoint.js";
import fileUploade, { fileValidation } from "../../Serveices/Multer.js";
import * as validator from "./Product.validation.js"
import { valid } from "../../MidlleWare/validation.js";
import { asynchandler } from "../../Serveices/asyncHandler.js";
import reviewrouter from "../review/review.router.js";


const productrouter = Router()

productrouter.use("/:productId/review",reviewrouter)
productrouter.get("/getproduct", asynchandler( ProductController.getproduct))
productrouter.post("/",auth(endPoint.create),fileUploade(fileValidation.image).fields([
    {name:"mainImage",maxCount:1},{name:"subImages",maxCount:4}
]),valid(validator.createproduct),ProductController.createProduct)
productrouter.post("/category/:categoryId", asynchandler( ProductController.getproductwithcategory))


export default productrouter