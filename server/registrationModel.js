const mongoose = require('mongoose') ;

const registerSchema = mongoose.Schema(
    {
         userName:{
             type:String,
         } ,
         userEmail : {
              type:String ,
         } ,
         userPassword : {
             type:String ,
         }, 
        followers : {
            type:Array
        } ,
        following : {
            type:Array
        }  
    }
)

let registerModel ;
if(mongoose.models.users){
    registerModel = mongoose.model('users') ;
}

registerModel = mongoose.model('users',registerSchema) ;
module.exports = registerModel ;