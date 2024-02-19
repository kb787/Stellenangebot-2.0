const mongoose = require('mongoose') ;

const networkProfileSchema = mongoose.Schema({
     networkProfileImage : {
        type:String
     },
     networkProfileFullName : {
        type:String
     },
     networkProfileHeading : {
        type:String
     } ,
     networkProfileDescription : {
        type:String 
     } ,
     networkProfileSkill:{
        type:String 
     } ,
     networkProfileUniversityName : {
        type:String
     } ,
     networkProfileDegreeName : {
         type:String 
     } ,
     networkProfileDegreeTime : {
         type:String
     } ,
     networkProfileDegreeGpa : {
         type:String 
     } ,
     networkProfilePreferredLocation : {
        type:String
     } ,
     networkProfileCompanyName : {
        type:String 
     } ,
     networkProfileWorkDescription : {
         type:String 
     } , 
     networkProfileWorkTenure : {
         type:Number 
     } ,
     networkProfileProjectName:{
         type:String 
     },
     networkProfileProjectDescription:{
        type:String
     } ,
     networkProfileProjectLink : {
        type:String
     }


})

let networkProfileModel ;
if(mongoose.models.networkprofiles){
    networkProfileModel = mongoose.model('networkprofiles') ;
}

networkProfileModel = mongoose.model('networkprofiles',networkProfileSchema) ;

module.exports = networkProfileModel ;
