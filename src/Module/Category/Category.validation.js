import Joi from "joi"
import generalfileds from "../../Serveices/generalfileds.js"

export const createCategory = Joi.object({

    name:Joi.string().min(3).max(25).required().messages({
        "string.min":"not enough Character",
        "string.max":"most Cahractar are be allowed"
    }),
    file: generalfileds.file.required(),
    //file : Joi.array().items(generalfileds.file.required()).required()
    
})

export const getspecficcategory = Joi.object({
    
  id:generalfileds.id

})