import mongoose, { Schema, model, Types } from "mongoose";

const CoponSchema = new Schema({

    name: {
        type:String,
        required :true,
        unique:true
    },
    amount:{
     type:Number,
     default:1,
     required:true

    },
    usedBy:[{type:Types.ObjectId,ref:"User"}],
    expireDate:{
        type:Date,

    },
    isDeleted:{
      type:Boolean,
      default:false  
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

const coponmodel = mongoose.models.Copon || model("Copon",CoponSchema)

export default coponmodel