import slugify from "slugify"
import submodel from "../../../DB/model/Subcategory.model.js"
import CategoryModel from "../../../DB/model/category.model.js"
import cloudinary from "../../Serveices/Cloudinary.js"
import productModel from "../../../DB/model/Product.model.js"
import {pagnigation} from "../../Serveices/pagination.js"





export const getproduct = async  (req,res,next)=>{
  
    const result=  pagnigation(req.query.page,req.query.limit)
    let quretObj = {...req.query}
    const del = ["page","limit","skip","sort","search","filds"]
    del.map((ele)=>{
        delete quretObj[ele]
    })
    console.log(quretObj)
    quretObj = JSON.stringify(quretObj);
    console.log(quretObj)
    quretObj= quretObj.replace(/\b(gt|gte|lt|lte|in|nin|eq|neq)\b/g,match=>`$${match}`)
    quretObj = JSON.parse(quretObj)
    
    
    const monggosequery =  productModel.find(quretObj).limit(result.limit).skip(result.skip).populate({
        path:"review"
    })
    if(req.query.search){
         monggosequery.find({
    $or:[
        { name:{$regex:req.query.search,$options:"i"}},
        { describtion:{$regex:req.query.search,$options:"i"}}
    ]
   
   })
    }
  
   monggosequery.select(req.query.filds?.replaceAll(","," "))
   
    const count  = await productModel.estimatedDocumentCount()
    const product = await monggosequery.sort(req.query.sort?.replaceAll(","," "))
   return res.json({message:"Success",length : product.length,total : count,product})
}


export const createProduct = async (req,res,next)=>{
    try{
        const {name , price, discount ,describtion,stock ,categoryId , subcategoryId} = req.body
        const pro = await productModel.findOne({name})
        if(pro){
            return res.status(400).json({message:`This product name ${name} are exsit`})
        }
    const category = await CategoryModel.findById(categoryId)
    const subcategory = await submodel.findById(subcategoryId)
    if(!category){
        return res.status(400).json({message:"Category not found "})
    }
    if(!subcategory){
        return res.status(400).json({message:"Subcategory not found "})
    }
    req.body.slug= slugify(name)
    req.body.finalPrice=  price - (price * ((discount||0)/100)).toFixed(2)

    const {secure_url,public_id} = await cloudinary.uploader.upload(req.files.mainImage[0].path,{folder:`${process.env.FOLDER_NAME}/Product/mainImageproduct`})
    req.body.mainImage= {secure_url,public_id}
    if(req.files.subImages){
    req.body.subImages = []
    }
    //return res.json(req.files.subImage)
    for( const  im of req.files.subImages){
        const {secure_url,public_id} = await cloudinary.uploader.upload(im.path,{folder:`${process.env.FOLDER_NAME}/Product/subImagesproduct`})
        req.body.subImages.push({secure_url,public_id})
    }
    req.body.createdBy= req.user._id
    req.body.updatedBy= req.user._id

     const product  = await productModel.create(req.body)
     if(!product){
        return res.status(400).json({message:"Error while creating "})
     }
     return res.status(201).json({message:"Success",product})

    }catch(err){
        return res.json({message:"Catch Error ",err:err.stack})
    }
    

}

export const getproductwithcategory = async (req,res,next)=>{

    const {categoryId} = req.params
    const cat = await CategoryModel.findOne({_id:categoryId})
    if(!cat){
        return next(new Error ("category not found"))
    }
    const product = await productModel.findOne({categoryId}).populate({path: "categoryId" })
    if(!product){
        return next(new Error ("product not found"))
    }
    return res.status(201).json({message:"Success",product})

}