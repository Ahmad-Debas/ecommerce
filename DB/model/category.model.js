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
        ref:"User",
        required:true
    },
    updatedBy:{
        type:Types.ObjectId,
        ref:"User",
        required:true
    }
   
},{timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
    
})


categorySchema.virtual("subCategory",{
    localField:"_id",
    foreignField:"categoryId",
    ref:"Subcategory"

})

const CategoryModel = mongoose.models.Category || model("Category",categorySchema)

export default CategoryModel
