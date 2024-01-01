import userModel from "../../DB/model/user.model.js"
import { verifytoken } from "../Serveices/generateAndVerifyToken.js"

 export const role = {
   
   Admin:"Admin",User:"User"

}

const auth = (accessRole=[])=>{
   return async (req,res,next)=>{
      
         const {authrization} = req.headers
         if(!authrization?.startsWith(process.env.BERAR_KEY)){
             return res.status(400).json({message:"Invalid Authrization  "})
         }
          const token = authrization.split(process.env.BERAR_KEY)[1]
          if(!token){
             return res.json({message:"Can not find token "})
          }
     
          let decodee = verifytoken(token,process.env.LOGIN_SIGNTURE)
          if(!decodee){
           return res.status(400).json({message:"not valid  authrization "})
          }
         
          const info = await userModel.findById(decodee.id).select("userName role changPasswordTime ")
          
          if(!info){
           return res.status(404).json({message:"NOt regester user"})
          }
            req.user = info
           
            if(parseInt((info.changPasswordTime?.getTime())/1000)>decodee.iat){

              next (new Error("Token is expired pelase log in"))

            }

            
            if(!accessRole.includes(info.role)){
               return res.json({message:"not auth user"})
            }
           
          return next()
   }
}

export default auth