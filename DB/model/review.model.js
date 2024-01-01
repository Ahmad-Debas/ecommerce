import mongoose,{Schema,Types, model} from "mongoose";
const reviewSchema = new Schema({
    Comment:{type:"String",required:true},
    createdBy:{type:Types.ObjectId,required:true,ref:"User"},
    rating:{type:Number,required:true,min:1,max:5},
    productId:{
        type:Types.ObjectId,
        required:true,
        ref:"Product"
    },
    orderId:{
        type:Types.ObjectId,
        required:true,
        ref:"ordear"
    }

},{timestamps:true})

const reviewmodel = mongoose.models.Review|| model("Review",reviewSchema)

export default reviewmodel

