import ordearmodel from "../../../DB/model/ordear.model.js"
import reviewmodel from "../../../DB/model/review.model.js"

export const createreview= async (req,res,next)=>{
    const {productId} = req.params
    const order = await ordearmodel.findOne({userId:req.user._id,status:"deliverd","products.productId":productId})
    if(!order){
        return next(new Error("can not review this product ",{cause:400}))
    }

   
    const checkReview = await reviewmodel.findOne({
        createdBy:req.user._id,
        productId:productId.toString(),

    })
    
    if(checkReview){
        return next(new Error("you will reviewd for this product later"),{cause:400})
    }
     const review = await reviewmodel.create({
        Comment:req.body.Comment,
        createdBy:req.user._id,
        productId:productId,
        orderId:order._id,
        rating:req.body.rating
     })
     if(!review){
        return next(new Error("error while create review "),{cause:400})
     }
     return res.status(201).json({message:"Success",review})
   
}