import cloudinary from "../../Serveices/Cloudinary.js"
import CategoryModel from "../../../DB/model/category.model.js"
import slugify from "slugify"
import { pagnigation } from "../../Serveices/pagination.js"
import productModel from "../../../DB/model/Product.model.js"


export const createCategory= async (req,res,next)=>{
    
        const name  =req.body.name.toLowerCase()
    const category = await CategoryModel.findOne({name})
    if(category){
       // return res.status(409).json({message:"Category is Already exist "})
       return next(new Error("Category is Already exist"))
    }
    const slug = slugify(name)
   
    const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.FOLDER_NAME}/categ`})
    
   const cat =  await CategoryModel.create({name,slug,image:{secure_url,public_id},createdBy:req.user._id,updatedBy:req.user._id})
   return res.status(201).json({message:"Successfuly Created Category ",cat})

}

export const getCategory = async (req,res,next)=>{
  
    const category = await CategoryModel.find({}).populate("subCategory")
    return res.status(200).json({message:"Success",category})
}
export const getActiveCategory = async( req,res,next)=>{
    let {page , limit} = req.query
      let result = pagnigation(page,limit)

    const category = await CategoryModel.find({status:"Active"}).skip(result.skip).limit(result.limit).select("name image -_id")
    return res.status(200).json({message:"Success",count:category.length,category})

}
export const specCategory = async(req,res,next)=>{
    const {id} = req.params
    const cat = await CategoryModel.findById(id)
    if(!cat){
       // return res.status(400).json({message:"not found Categoty "})
       return next(new Error("not found Categoty ",{cause:404}))
    }
    return res.status(200).json({message:"Success",cat})

}
export const updateCategory = async(req,res,next)=>{
    
        
        const {id} = req.params

    const cate = await CategoryModel.findById(id)
    
    if(!cate){
       // return res.status(400).json({message:"not found Categoty "})
       return next(new Error("not found Categoty ",{cause:400}))
    }
    if(req.body.name){
        if(await CategoryModel.findOne({name:req.body.name,_id:{$ne:cate._id}})){
            return res.json({message:`name Category ${req.body.name}  is exist `})
        }
        cate.name= req.body.name
        cate.slug = slugify(req.body.name)
    }

    if(req.file){
        const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.FOLDER_NAME}/categ`})
        await cloudinary.uploader.destroy(cate.image.public_id)
        cate.image= {secure_url,public_id}
    }
    if(req.body.status){
        cate.status= req.body.status
    }
      cate.updatedBy= req.user._id
      await cate.save()
      return res.status(201).json({message:"Success",cate})
    
}

export const deletecategory = async (req,res,next)=>{
    const {id} = req.params
    const cat = await CategoryModel.findByIdAndDelete(id)
    if(!cat){
        return next( new Error("not found category",{cause:404}))
    }
    await productModel.deleteMany({categoryId:id})
   
    return res.status(200).json({message:"Success",cat})
}



