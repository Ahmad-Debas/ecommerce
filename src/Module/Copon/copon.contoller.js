import coponmodel from "../../../DB/model/copon.model.js"

export const createCoupon = async (req,res,next)=>{

    const {name,amount} = req.body
    if(await coponmodel.findOne({name})){
        return res.status(409).json({message:`Copon name ${name} is exsit`})
    }
    const copoun = await coponmodel.create(req.body)
    return res.status(201).json({message:"Success",copoun})
    
    
    
}

export const getCoupon = async (req,res,next)=>{
    const copon = await coponmodel.find({isDeleted:false})
    return res.status(200).json({message:"Success",copon})

}

export const updateCopon = async (req,res,next)=>{
    const {id} = req.params
    const coupon = await coponmodel.findById(req.params.id)
    if(!coupon){
        return res.status(404).json({message:"Coupon not Found "})
    }
    if(req.body.name){
        if(await coponmodel.findOne({name:req.body.name})){
            return res.json({message:`name Coupon ${req.body.name}  is exist `})
        }
        coupon.name = req.body.name

    }
    if(req.body.amount){
       coupon.amount= req.body.amount 
    }
    await coupon.save()
    return res.status(200).json({message:"Success",coupon})
}

export const softDelete =  async (req,res,next)=>{
    const {id} = req.params
    const coupon = await coponmodel.findOneAndUpdate({_id:id,isDeleted:false},{isDeleted:true},{new:true})
    if(!coupon){
        return res.status(404).json({message:"Can not found coupon"})
    }

    return res.status(201).json({message:"Success"})


}

export const hardDelete = async(req,res,next)=>{
    const {id } = req.params
    const coupon = await coponmodel.findOneAndDelete({_id:id,isDeleted:true})
    if(!coupon){
        return res.status(404).json({message:"not delete Coupon"})
    }
    return res.json({message:"Success"})

}
export const restore =  async (req,res,next)=>{
    const {id} = req.params
    const coupon = await coponmodel.findOneAndUpdate({_id:id,isDeleted:true},{isDeleted:false},{new:true})
    if(!coupon){
        return res.status(404).json({message:"Can not restore coupon"})
    }

    return res.status(201).json({message:"Success"})


}