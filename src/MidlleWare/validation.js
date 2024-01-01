 export const valid = (Schema)=>{

  return (req,res,next)=>{

    const Inputdata= {...req.body,...req.params,...req.query}
    if(req.file || req.files){
        Inputdata.file = req.file || req.files
    }
    const ResaultValidation = Schema.validate(Inputdata,{abortEarly:false})
    //return res.json(ResaultValidation)
    if(ResaultValidation.error?.details){
        return res.json({message:"Validtion Error",ResaultValidation:ResaultValidation.error?.details})
    }
    return  next()



  }

}