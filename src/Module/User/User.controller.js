
import userModel from "../../../DB/model/user.model.js"
import xlsx from "xlsx"
import { createpdf } from "../../Serveices/pdf.js"


export const getprofile = async (req,res,next)=>{
    const user = await userModel.findById(req.user._id)
    return res.status(200).json({messags:"Success",user})
}


export const uploadeuserexcel= async (req,res,next)=>{
 
    const woorkbook = xlsx.readFile(req.file.path) 
    const woorksheet = woorkbook.Sheets[woorkbook.SheetNames[0]]
    const user = xlsx.utils.sheet_to_json(woorksheet)
    if(!await userModel.insertMany(user)){
        return next(new Error("can not add data",{cause:404}))
    }

    console.log(user)
    return res.json("Success")


}
export const getuserpdf = async (req,res,next)=>{
    const user = await userModel.find({}).lean()
    await createpdf(user,"reem",req,res)
   
}

