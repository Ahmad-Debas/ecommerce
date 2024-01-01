import Joi from "joi";
import generalfileds from "../../Serveices/generalfileds.js";



export const createCopon = Joi.object({
    name: generalfileds.name,
    amount:Joi.number().positive(),
    expireDate:Joi.date().greater("now").required()



})