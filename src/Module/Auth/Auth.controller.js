import userModel from "../../../DB/model/user.model.js"
import { comparePassword, hashpass } from "../../Serveices/HashandCompare.js"
import cloudinary from "../../Serveices/Cloudinary.js"
import { sendEmail } from "../../Serveices/nodemailer.js"
import { generateToken, verifytoken } from "../../Serveices/generateAndVerifyToken.js"



export const signup = async (req,res,next)=>{
     const {userName , email , password} = req.body
    const user = await userModel.findOne({email})
    if(user){
        return res.status(400).json({message:"email is exist "})
    }
    const passhash = hashpass(password)
    const token = generateToken({email})
    const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.Signunp_folder}/profile`})
    const link = `${req.protocol}://localhost:3000/auth/confirmEmail/${token}`
    const html = `<a href="${link}" > Confirm Email  </a>`
    let subject = "Plese Confirm your Email"
     await sendEmail(email,subject,html)
    const userr = await userModel.create({userName,email,password:passhash,image:{secure_url,public_id}})
    return res.status(201).json({message:"Success",user:userr._id})

}
export const login = async (req,res,next)=>{
    const {email,password} = req.body
    const user= await userModel.findOne({email})
    if(!user){
        return res.status(400).json({message:"Invalid data"})
    }
    const com = comparePassword(password,user.password)
   if(!com){
    return res.json({message:"Invalid Data"})
   }
   const token = generateToken({id:user._id,role:user.role,status:user.status},process.env.LOGIN_SIGNTURE)
   const refrehtoken = generateToken({id:user._id,role:user.role,status:user.status},process.env.LOGIN_SIGNTURE,60*60*24*30)
   return res.status(201).json({message:"Success",token,refrehtoken})
    
    
}


export const confirmEmail = async (req,res)=>{
   const {token} = req.params
   const decodeee=  verifytoken(token)
   if(!decodeee){
    return res.status(400).json({message:"Token not correct"})
   }
   const email = decodeee.email
   const userr =  await userModel.updateOne({email},{confirmEmail:true})
   if(userr.modifiedCount>0){
    return res.json({message:"email is verify"})
   }
   return res.json({message:"not found user"})
   

}