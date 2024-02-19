const mongoose = require('mongoose') ;

const userProfileSchema = mongoose.Schema({
      userImage : {
         type:Buffer
      } ,
       
      userFullName : {
          type:String 
      } ,

      userJobTitle : {
          type:String
      } ,
      userProfileDescription : {
           type:String 
      } ,
      userSkills : {
           type : Array 
      } ,
     userUniversityName : {
        type : String
      },
     userDegreeName : {
        type : String
      } ,
      userDegreeTime : {
        type : Date
      } ,
     userDegreeGPA : {
        type : Number
      } ,
      userPreferredLocation : {
          type:String ,
      } ,
      userPreferredLocationType : {
          type:String ,
      } ,
      userCompanyName : {
        type:String
      } ,
      userWorkDescription : {
        type:String
      } ,
      userWorkTenure : {
        type:Number
     },
     projectName : {
        type:String
     },
     projectDescription : {
         type:String 
     },
     projectLink : {
         type:String 
     },  
})

let userProfileModel ;
if(mongoose.models.userprofiles){
    userProfileModel = mongoose.model('userprofiles') ;
}

userProfileModel = mongoose.model('userprofiles',userProfileSchema) ;
module.exports = userProfileModel ;