
import mongoose , { Schema ,model, Types } from "mongoose";

const ordearSchema = new Schema({
     
    userId:{type:Types.ObjectId,ref:"User",required:true},
    
    products:[{
       name:{type:String},
        productId:{type:Types.ObjectId,ref:"Product",required:true},
        quantity:{type:Number,default:1},
        unitPrice:{type:Number,required:true},
        finalPrice:{type:Number}
    }],
    finalPrice:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    coponName:{
        type:String,
        
    },
    paymentType:{
        type:String,
        enum:["Cash","Cart"],
        default:"Cash"
    },
    status:{
        type:String,
        default:"pendeing",
        enum:["pendeing","canselled","confirmed","onWay","deliverd"]

    },
    phoneNumber:{
        type:String,
        required:true
    },
    resonRojected:{
        type:String,

    },
    updatedBy:{
       type:Types.ObjectId,ref:"User"
        
    },
    note:{
        type:String,

    }
    
   
},{timestamps:true,  
})

const ordearmodel = mongoose.models.ordear || model("ordear",ordearSchema)

export default ordearmodel
