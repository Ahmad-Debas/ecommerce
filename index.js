import express from 'express'
import initapp from './src/app.router.js';
import * as dotenv from "dotenv"
dotenv.config()
import {createpdf} from "./src/Serveices/pdf.js"
const app = express()
const port = process.env.PORT ||3000

initapp(app,express)




app.listen(port,()=>{
    console.log(`this Server running in port ${port}`)
})