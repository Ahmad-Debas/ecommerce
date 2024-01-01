import Joi from "joi"
import generalfileds from "../../Serveices/generalfileds.js"

export const createproduct = Joi.object({

  name:Joi.string().min(3).max(25).required(),
  describtion:Joi.string().min(3).max(1500).required(),
  stock:Joi.number().integer().required(),
 price:Joi.number().positive().required(),
 discount:Joi.number().min(1),
 file:Joi.object({
    mainImage:Joi.array().items(generalfileds.file.required()).min(1).max(1),
    subImages:Joi.array().items(generalfileds.file.required()).min(1).max(4)
  }),
status:Joi.string().validate("Active", "InActive"),
categoryId:generalfileds.id,
subcategoryId:generalfileds.id

})