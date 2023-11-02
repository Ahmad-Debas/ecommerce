import  nodemailer from "nodemailer"

export async function sendEmail(to,subject,html){

const transporter = nodemailer.createTransport({

 service:"gmail",
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user:process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,

  },
});
  const info = await transporter.sendMail({
    from: ` ecommerce"<${process.env.EMAIL}>`, // sender address
    to, 
    subject, 
    html, 

    

  })
  return info
  }
