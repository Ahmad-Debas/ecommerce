import mongoose , { Schema ,model, Types } from "mongoose";

const ProductSchema = new Schema({

    name: {
        type:String,
        required :true,
        unique:true,
        trim:true
    },
    slug:{
        type:String,
        required:true, 
    },
    describtion:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        required:true

     },discount:{
       type:Number,
       default:0
     },
     finalPrice:{
        type:Number,
        
     },
     number_sellers:{
     type:Number,
      default:0
     },
     mainImage:{
        type:Object,
        required:true
     },
     subImages:[{
        type:Object,
        required:true,
     }],
  
    status:{
        type:String,
        default:"Active",
        enum:["Active","InActive"]
    },
    isDeleated:{
        type:Boolean,
        default:false
    },
    categoryId:{
        type:Types.ObjectId,
        ref:"Category",
        required:true
    },
    subcategoryId:{
        type:Types.ObjectId,
        ref:"Subcategory",
        required:true
    },
    createdBy:{
        type:Types.ObjectId,
        ref:"User",
        required:true
    },
    updatedBy:{
        type:Types.ObjectId,
        ref:"User",
        required:true
    }
   
},{timestamps:true, 
    toJSON: {virtuals:true},
    toObject:{virtuals:true}
})

ProductSchema.virtual("review",{
    localField:"_id",
    ref:"Review",
    foreignField:"productId"

})



const productModel = mongoose.models.Product || model("Product",ProductSchema)

export default productModel
