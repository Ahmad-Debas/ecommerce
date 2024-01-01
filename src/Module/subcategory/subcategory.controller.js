import slugify from "slugify"
import submodel from "../../../DB/model/Subcategory.model.js"
import CategoryModel from "../../../DB/model/category.model.js"
import cloudinary from "../../Serveices/Cloudinary.js"

export const createSubCategory = async (req,res,next)=>{
    try {

         const {name, categoryId} =req.body
         const namee = name.toLowerCase()
         
    const sub = await submodel.findOne({name:namee})
    
    if(sub){
        return res.json({message:`This category name ${name} is already exsit `})
    }
    const cat = await CategoryModel.findById(categoryId)

    if(!cat){
        return res.json({message:"not found category"})
    }
    const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.FOLDER_NAME}/categ`})
     const subcat = await submodel.create({name:namee.toLowerCase(),categoryId,slug:slugify(namee),image:{secure_url,public_id}})
     return res.status(201).json({message:"Success",subcat})
    }
    catch(err){
        return res.json({message:"ERROR",err:err.stack})
    }
   



}

export const getSubcategory = async (req,res,next) =>{
    const categoryId = req.params.id
    
    const cat = await CategoryModel.findById(categoryId)
    if(!cat){
      return res.status(404).json({message:"Category not founddd "})
    } 
    const subcategory = await submodel.find({categoryId}).populate({
        path:"categoryId"
    }).populate({
      path:"Product"
    })
   
      return res.status(200).json({message:"Success",subcategory})
    
}