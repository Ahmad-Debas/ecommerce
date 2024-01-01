
import CartModel from "../../../DB/model/Cart.model.js"
import productModel from "../../../DB/model/Product.model.js"
import coponmodel from "../../../DB/model/copon.model.js"
import ordearmodel from "../../../DB/model/ordear.model.js"
import userModel from "../../../DB/model/user.model.js"

export const createorder =async (req,res,next)=>{
    const {coponName} = req.body
    
   //check cart 
    const cart = await CartModel.findOne({userId:req.user._id})
    if(!cart){
        return next(new Error("cart is empty "))
    }
    req.body.products = cart.products
       //check copon 
    if(coponName){
        const copon = await coponmodel.findOne({name:coponName})
      
        
        if(!copon){
            return next( new Error("copon is not found",{cause:404}))
        }
        
     const currentdate= new Date()
     if(currentdate>copon.expireDate){
      return    next( new Error("this copon is expired",{cause:400}))
     }
     if(copon.usedBy.includes(req.user._id)){
        return next(new Error ("this copon already by used",{cause:401}))
     }
     req.body.copon = copon
    }
    
    let Subtotal = 0;
    let finalProduct = []

    for ( let product of req.body.products ){
        const checkproduct = await productModel.findOne({
            _id : product.productId,
            stock:{$gte:product.quantity}
        })
        
        if(!checkproduct){
            return next(new Error(`00This product ${product.productId} is not avialable `))
        }
        product = product.toObject()
        product.name = checkproduct.name
        product.unitPrice= checkproduct.price
        product.discount = checkproduct.discount
        product.finalPrice = product.quantity *checkproduct.finalPrice
        Subtotal+=product.finalPrice
        finalProduct.push(product)

    }
    const user = await userModel.findById(req.user._id)
    
    if(!req.body.address){
        req.body.address= user.address
    }
    if(!req.body.phone){
        req.body.phone= user.phone
    }

 
    

    const order = await ordearmodel.create({
        userId:req.user._id,
        products:finalProduct,
        finalPrice:Subtotal - (Subtotal*((req.body.copon?.amount||0) /100 )),
        address:req.body.address,
        phoneNumber:req.body.phone,
        coponName:req.body.copon?.name



    })

    for( let product of req.body.products){
        await productModel.updateOne({_id:product.productId},{$inc:{stock:-product.quantity}})
    }
    await CartModel.updateOne({userId:req.user._id},{products:[]})
    if(req.body.copon){

        await coponmodel.updateOne({_id:req.body.copon._id},{$addToSet:{usedBy:req.user._id}})
    }
    return res.status(201).json({message:"Success",order})



   

    




}

export const canselorder = async (req,res,next)=>{

    const {orderId}= req.params
    const ordear = await ordearmodel.findOne({_id:orderId,userId:req.user._id})
    if(!ordear){
        return next(new Error("oreder not found",{cause:400}))
    }
    if(ordear.status!="pendeing"){
        return next(new Error("can not cancelld order"))
    }
    req.body.status= "canselled"
    req.body.updatedBy = req.user._id
    const neworder= await ordearmodel.findByIdAndUpdate(ordear._id,req.body,{new:true})
    for( let product of ordear.products){
        await productModel.updateOne({_id:product.productId},{$inc:{stock:product.quantity}})
    }
    if(req.body.copon){

        await coponmodel.updateOne({_id:req.body.copon._id},{$pull:{usedBy:req.user._id}})
    }
    



    return res.json({message:"Success",ordear:neworder})

}
export const getorder = async (req,res,next)=>{
    const oreder = await ordearmodel.find({userId:req.user._id})
    return res.status(200).json({message:"Success",oreder})
}

export const changeStatus = async(req,res,next)=>{
    const {orderId}= req.params
    const ordear = await ordearmodel.findById(orderId)
    if(!ordear){
        return next(new Error("order is not found",{cause:404}))
    }
    if(ordear.status=="canselled"||ordear.status=="deliverd" ){
        return next(new Error("can not cancell this order ",{cause:400}))
    }
    const neworder = await ordearmodel.findByIdAndUpdate(orderId,{
        status:req.body.status
    },{new:true})

    if(req.body.status=="canselled"){
        for( let product of ordear.products){
            await productModel.updateOne({_id:product.productId},{$inc:{stock:product.quantity}})
        }
        if(ordear.coponName){
    
            await coponmodel.updateOne({name:ordear.coponName},{$pull:{usedBy:ordear.userId}})
        } 

    }

    return res.status(201).json({message:"Success",oreder:neworder})
    
}