import userModel from "../../../DB/model/user.model.js"
import { comparePassword, hashpass } from "../../Serveices/HashandCompare.js"
import cloudinary from "../../Serveices/Cloudinary.js"
import { sendEmail } from "../../Serveices/nodemailer.js"
import { generateToken, verifytoken } from "../../Serveices/generateAndVerifyToken.js"
import { nanoid , customAlphabet } from "nanoid"



export const signup = async (req,res,next)=>{
    
     const {userName , email , password} = req.body
    const user = await userModel.findOne({email})
    if(user){
        return res.status(400).json({message:"email is exist "})
    }
    const passhash = hashpass(password)
    const token = generateToken({email})
    const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.Signunp_folder}/profile`})
    const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`
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
        return res.status(404).json({message:"Invalid data"})
    }
    const com = comparePassword(password,user.password)
   if(!com){
    return res.json({message:"Invalid Data"})
   }
   if(user.confirmEmail==false){
    return res.status(400).json({message:"Please confirm your email "})
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

export const sendCode= async (req,res,next)=>{
    const {email}= req.body
   let code  =  customAlphabet("123456789ABCZ",3)
     code = code()
   const user = await userModel.findOneAndUpdate({email},{sendCode:code},{new:true})
   if(!user){
    return res.status(404).json({message:"Not found email"})
   }
   const html = `<h2 >Code id ${code}</h2>`
   await sendEmail(email,"Reset Password ",html)
   
   return res.status(201).json({message:"Success"})

} 

export const forgetPassword = async (req,res,next)=>{
    const {email, password, code} = req.body
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(400).json({message:"User not regesterd"})
    }
    if(code!=user.sendCode){
        return res.json({message:"not correct code "})
    }
    //let match= comparePassword(password,user.password)
    if(comparePassword(password,user.password)){
        return res.json({message:" same Password  "})
    }
     let newpassword = hashpass(password,parseInt(process.env.SALAT_ROUND))
     user.password=newpassword
     user.sendCode=null
     await user.save()
     return res.status(200).json({message:"Success"})
     
}
