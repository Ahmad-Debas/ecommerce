import Joi from "joi"
const generalfileds = {
    name:Joi.string().min(3).max(15).required(),
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).min(10).max(40).required(),
    password:Joi.string().required().messages({
        "string.empty":"not allowed password to be empty  "
     
    }),
      file : Joi.object({

        fieldname:Joi.string().required() ,
        originalname:Joi.string().required()  ,
        encoding:Joi.string().required() ,
        mimetype:Joi.string().required() ,
        destination:Joi.string().required() ,
        filename:Joi.string().required() , 
        path:Joi.string().required() ,
        size:Joi.number().positive().required(),
        dest:Joi.string()

    }),


    id:Joi.string().min(24).max(24).required()
}

export default generalfileds