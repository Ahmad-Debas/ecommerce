import mongoose , { Schema ,model, Types } from "mongoose";

const userSchema = new Schema({

    userName: {
        type:String,
        required :true,
        min:4,
        max:20
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    password:{
        type:String,
        required:true,

    },
    image:{
        type:Object,
        
    },
    gender:{
        type:String,
        enum:["Male","Female"]
    },
    phone:{
        type:String
    },
    address:{
        type:String,
    },
    confirmEmail:{
        type:Boolean,
        default:false
    },
    status:{
        type:String,
        default:"Active",
        enum:["Active","InActive"]
    },
    role:{
        type:String,
        default:"User",
        enum:["User","Admin"]
    },
    sendCode:{
        type:String,
        default:null
    },
    changPasswordTime:{
        type:Date
    },
    online:{
        type:Boolean,
        default:false,
    }
    
},{timestamps:true})

const userModel = mongoose.models.User || model("User",userSchema)

export default userModel



