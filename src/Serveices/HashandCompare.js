import bcrypt from "bcrypt"

export const hashpass = (password , salatRound = parseInt( process.env.SALAT_ROUND))=>{
    const hash = bcrypt.hashSync(password,salatRound)
    return hash
}

export const comparePassword = (plaintext,password)=>{
    
    let com = bcrypt.compareSync(plaintext,password)
    return com

}