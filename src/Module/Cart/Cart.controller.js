import CartModel from "../../../DB/model/Cart.model.js"
import userModel from "../../../DB/model/user.model.js"

export const createcart =  async (req,res,next)=>{
    
    const {productId,quantity}= req.body 
    
    
    const cart = await CartModel.findOne({userId:req.user._id})
    if(!cart){
        const newcart = await CartModel.create({userId:req.user._id,products:{productId,quantity}})
        return res.status(201).json({message:"Success",newcart})
    }
       let matchproduct =false 
     for(let i = 0 ;i<cart.products.length;i++){
        if(cart.products[i].productId==productId){
            cart.products[i].quantity=quantity
            matchproduct=true
            break
        }

    }
    if(!matchproduct){
        cart.products.push({productId,quantity})
    }

        await cart.save();
        
        return res.status(201).json({message:"Success",cart})

    }

export const removeItem =  async (req,res)=>{

    const {productId}= req.body
 
    const cart=  await CartModel.updateOne({userId:req.user._id},{
       $pull:{
        products: {productId}
        }

    })
   
    return res.status(200).json({message:"Success"})
}
export const clearcart =  async (req,res)=>{

    const cart =  await CartModel.updateOne({userId:req.user._id},{ products:[]})
   
    return res.status(200).json({message:"Success"})
}

export const getCart = async (req,res,next)=>{
    const cart = await CartModel.findOne({userId:req.user._id})
    return res.status(200).json({message:"Success",cart})
}


   




