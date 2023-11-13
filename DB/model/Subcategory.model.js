import mongoose, { Schema, model, Types } from "mongoose";

const subcategorySchema = new Schema({

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
    categoryId:{
        type:Types.ObjectId,
        ref:"Category",
        required:true

    },
    createdBy:{
        type:Types.ObjectId,
        ref:"User"
    },
    updatedBy:{
        type:Types.ObjectId,
        ref:"User"
    }







})

const submodel = mongoose.models.Subcategory || model("Subcategory",subcategorySchema)

export default submodel