import  Jwt from "jsonwebtoken";
export const generateToken = (info , signture= process.env.SIGNTRURE_SIGNUP, expiresIn ='1d') =>{

    const token = Jwt.sign(info,signture,{expiresIn})
    return  token

}

export const  verifytoken =  (token,signture=process.env.SIGNTRURE_SIGNUP)=>{
    const decode =  Jwt.verify(token,signture)
    return decode
}