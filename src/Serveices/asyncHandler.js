const asynchandler = async(fun)=>{
    return (req,res,next)=>{
        fun.catch(error=>{
            return res.json({message:" catch Error",err:error.stack})
        })
    }
}



export default asynchandler