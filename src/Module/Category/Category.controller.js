import cloudinary from "../../Serveices/Cloudinary.js"
import CategoryModel from "../../../DB/model/category.model.js"
import slugify from "slugify"


export const createCategory= async (req,res,next)=>{
    
    const name  =req.body.name.toLowerCase()
    const category = await CategoryModel.findOne({name})
    if(category){
        return res.status(409).json({message:"Category is Already exist "})
    }
    const slug = slugify(name)
    const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.FOLDER_NAME}/categ`})
   const cat =  await CategoryModel.create({name,slug,image:{secure_url,public_id}})
   return res.status(201).json({message:"Successfuly Created Category ",cat})
   
  



}