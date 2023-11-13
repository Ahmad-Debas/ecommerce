
const role = {
   
    Admin:"Admin",User:"User"

}


export const endPoint = {

    create:[role.Admin],
    getall:[role.Admin],
    getActive:[role.User,role.Admin],
    specCategory:[role.User,role.Admin],
    update:[role.Admin]
    


}