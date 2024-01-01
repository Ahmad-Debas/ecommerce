import Joi from "joi";
import generalfileds from "../../Serveices/generalfileds.js";


export const createorder= Joi.object({
    orderId:generalfileds.id,
    

})