import categoryrouter from "./Module/Category/Category.router.js"
import productrouter from "./Module/Product/Product.router.js"
import authrouter from "./Module/Auth/Auth.router.js"
import conn from "../DB/Connection.js"
import Subcategoryrouter from "./Module/subcategory/subcategory.router.js"
import coponrouter from "./Module/Copon/copon.router.js"
import cartrouter from "./Module/Cart/Cart.router.js"
import { globalErrorhandle } from "./Serveices/asyncHandler.js"
import orderrouter from "./Module/Ordear/ordear.router.js"
import userrouter from "./Module/User/User.router.js"
import cors from "cors"



const initapp = (app,express)=>{
  app.use(cors())
  app.use(express.json())
  conn()
  app.get("/",(req,res)=>{
  return res.status(200).json("Hellow page")
})
   app.use("/userpdf",express.static("./"))
  app.use("/category",categoryrouter)
  app.use("/product",productrouter)
  app.use("/auth",authrouter)
  app.use("/subcategory",Subcategoryrouter)
  app.use("/coupon",coponrouter)
  app.use("/cart",cartrouter)
  app.use("/order",orderrouter)
  app.use("/user",userrouter)

  app.use("/*",(req,res)=>{
    return res.json({message:" Pagee Not Found"})
  })

 app.use( globalErrorhandle)

        
        

}


export default initapp