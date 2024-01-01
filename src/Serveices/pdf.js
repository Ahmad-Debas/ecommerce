import  pdf from "pdf-creator-node";
import  fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import {options} from  "./pdf.options.js"

 let __filename = fileURLToPath(import.meta.url)
 let __direname = dirname(__filename)




export const  createpdf = (user,filename,req,res)=>{
 const htmlpath = join(__direname,"../../Templts/pdf.html")
 const html = fs.readFileSync(htmlpath,"utf-8")
 let document = {
    html: html,
    data: {user},
    path: `./${filename}.pdf`,
    type: "",
  };
  pdf.create(document,options).then(()=>{
    return res.send(`<a download href=" ${req.protocol}://${req.headers.host}/userpdf/reem.pdf"> Download  </a>`)
  })

}