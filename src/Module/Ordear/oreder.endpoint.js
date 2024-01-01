import { role } from "../../MidlleWare/auth.js";

 export const endPoint = {
    create:[role.User],
    canseled:[role.User],
    change:[role.Admin]
}