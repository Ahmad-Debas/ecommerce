import mongoose , { Schema ,model, Types } from "mongoose";

const categorySchema = new Schema({

    name: {
        type:String,
        required :true,
        unique:true
    },
    slug:{
        type:String,
        required:true,
       
    },
   
    image:{
        type:Object,
    },
  
    status:{
        type:String,
        default:"Active",
        enum:["Active","InActive"]
    },
    createdBy:{
        type:Types.ObjectId,
        ref:"User"
    },
    updatedBy:{
        type:Types.ObjectId,
        ref:"User"
    }
   
},{timestamps:true})

const CategoryModel = mongoose.models.Category || model("Category",categorySchema)

export default CategoryModel
