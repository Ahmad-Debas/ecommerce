import mongoose from "mongoose";


const conn = ()=>{
    mongoose.connect(process.env.DB_LOCAL)
    .then(()=>{console.log("Success connect DB")})
    .catch((err)=>{
        console.log(`Error Connect DB ${err}`)

    })
}


export default conn