import categoryrouter from "./Module/Category/Category.router.js"
import productrouter from "./Module/Product/Product.router.js"
import authrouter from "./Module/Auth/Auth.router.js"
import conn from "../DB/Connection.js"
import Subcategoryrouter from "./Module/subcategory/subcategory.router.js"
import coponrouter from "./Module/Copon/copon.router.js"



const initapp = (app,express)=>{
  app.use(express.json())
  conn()
  app.get("/",(req,res)=>{
  return res.status(200).json("Hellow page")
})
  app.use("/category",categoryrouter)
  app.use("/product",productrouter)
  app.use("/auth",authrouter)
  app.use("/subcategory",Subcategoryrouter)
  app.use("/coupon",coponrouter)
  app.use("/*",(req,res)=>{
    return res.json({message:" Pagee Not Found"})
  })

        
        

}


export default initapp