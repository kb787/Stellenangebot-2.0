const mongoose = require('mongoose') ;

const jobDataSchema = mongoose.Schema({
      jobTitle:{
         type:String,
      } ,
      jobCompany:{
         type:String,
      },
      jobLocation:{
         type:String
      },
      jobSkills:{
         type:Array,
      },
      jobDescription: {
         type:String ,
      } ,
      jobSalary : {
         type:String ,  
      } ,
      requiredExperience : {
         type:String ,
      } ,
      jobLocationType:{
         type:String,
      }
})

let jobDataModel ;

if(mongoose.models.jobdatas){
     jobDataModel = mongoose.model('jobdatas') ;
}

jobDataModel = mongoose.model('jobdatas',jobDataSchema) ;
module.exports = jobDataModel ;