export const pagnigation =  (page,limit) =>{
if(!page || page<=0){
    page=1
}
if(!limit || limit<=0 || limit > 5 ){
    limit=2
}
let skip = (page-1) *limit
return {skip,limit}
}