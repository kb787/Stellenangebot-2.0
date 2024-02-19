const jwt = require('jsonwebtoken') ;
const registerModel = require('./registrationModel') ;
const bcryptjs = require('bcryptjs') ;
const jobsDataModel = require('./jobsDataModel') ;
const category1 = ['Software Developer' , 'Software Engineer']
const category2 = ['Web Developer','Mobile App Developer','Full Stack Developer','Frontend Developer','Backend Developer'] ;
const category3 = ['Machine Learning Engineer','Data Analyst','Data Scientist','DevOps Engineer','Cloud Engineer'] ;
const category4 = ['Marketing,Sales,Human Resource','Human Resource Manager','Sales Representative','Marketing Specialist'] ;
const authenticated = require('./middleware') ;




const handleRegisterUser = async(req,res) => {
   
   const {userName,userEmail,userPassword} = req.body ;
    if((!userName) || (!userEmail) || (!userPassword)) {
          return res.status(400).send({message:'Entering all field is mandatory',success:false}) ;
    }
    try {
         let regResponse = await registerModel.findOne({userEmail:req.body.userEmail}) ;
         if(regResponse) {
              return res.status(409).send({message:'User already exists',success:false}) ;
         }
         else {
              const salt = await bcryptjs.genSalt(10) ; 
              const password = req.body.userPassword ;
              const hashedPassword =  await bcryptjs.hash(password,salt) ;
              const newResponse = await new registerModel({userName,userEmail,userPassword:hashedPassword}) ;
              const savedUser = await newResponse.save({userName,userEmail,userPassword:hashedPassword}) ;  
              const userDetails = {
                  userName:savedUser.userName,
                  userEmail:savedUser.userEmail
              }
              console.log(userDetails) ; 
              return res.status(201).send({message:'Successfully done the registration',success:true,userDetails}) ;         
         }
    }
    catch(error){
            console.log(error) ;
            return res.status(500).send({message:'Could not process the request',success:false}) ;
    }
 
}

const handleUserLogin = async(req,res) => {
    const {userEmail,userPassword} = req.body ;
    console.log(req.body) ;
    if((!userEmail) || (!userPassword)) {
         {
            return res.status(400).send({message:'Entering all fields is mandatory',success:false}) ; 
         }
    }
    try {
          let comparisonOutput ;
          let loginResponse = await registerModel.findOne({userEmail:req.body.userEmail}) ;
          if(!loginResponse) {
             return res.status(404).send({message:'Invalid email',success:false}) ;
          }
          else if(!loginResponse.userPassword){
             return res.status(405).send({message:'Invalid user',success:false}) ;  
          }
          const userDetails = {
               userEmail: loginResponse.userEmail
          }
          console.log(userDetails) ;
          comparisonOutput = await bcryptjs.compare(userPassword,loginResponse.userPassword) ;
          if(!comparisonOutput){
              return res.status(406).send({message:'Invalid credentials',success:false}) 
          }
          else {
            const token = jwt.sign({id:comparisonOutput._id},process.env.secret_key,{
                expiresIn:"1d"
            }) 
            const loginCookie = {
                _id : comparisonOutput._id,
                email : comparisonOutput.email 
            }    
              res.cookie(loginCookie) ; 
              return res.status(201).send({message:'Login successfull',success:true,token}) ;
          }
    }
    catch(error) {
         console.log(error) ;
         return res.status(500).send({message:'Unable to process the request',success:false}) ;
    }
}


/*
const handleDeleteProfileData = async(req,res) => {

     try {

     }
     catch(error) {
           console.log(error) ;
           return res.status(500).send({message:'Unable to perform the request'}) ;
     }
}
*/
const handleFetchDataDomain1 = async(req,res) => {
       const {jobTitle,jobCompany,jobLocation,jobSkills,jobType} = req.body 

       try {

           let filteredData = await jobsDataModel.find({ jobTitle: { $in: category1 } })
           if(!filteredData){
                return res.status(404).send({message:'No matching entries found'})
           }
           else {
                return res.send(filteredData) ;
           }
       }
       catch(error){
            console.log(error) ;
            return res.status(500).send({message:'Unable to perform your request'}) ;
       }
}

const handleFetchDataDomain2 = async(req,res) => {
      const {jobTitle,jobCompany,jobLocation,jobSkills,jobType} = req.body ;
      try {
           let filteredData2 = await jobsDataModel.find({jobTitle:{$in : category2}}) 
           if(!filteredData2){
                return res.status(404).send({message:'No matching entries found'}) ;
           }
           else {
                return res.send(filteredData2) ;
           }
      }
      catch(error){
             return res.status(500).send({message:'Unable to perform your request'}) ;
      }
}

const handleFetchDataDomain3 = async(req,res) => {
     const {jobTitle,jobCompany,jobLocation,jobSkills,jobType} = req.body ;
     try {
          let filteredData3 = await jobsDataModel.find({jobTitle:{$in : category3}}) 
          if(!filteredData3){
               return res.status(404).send({message:'No matching entries found'}) ;
          }
          else {
               return res.send(filteredData3) ;
          }
     }
     catch(error){
            return res.status(500).send({message:'Unable to perform your request'}) ;
     }
}

const handleFetchDataDomain4 = async(req,res) => {
     const {jobTitle,jobCompany,jobLocation,jobSkills,jobType} = req.body ;
     try {
          let filteredData4 = await jobsDataModel.find({jobTitle:{$in : category4}}) 
          if(!filteredData4){
               return res.status(404).send({message:'No matching entries found'}) ;
          }
          else {
               return res.send(filteredData4) ;
          }
     }
     catch(error){
            return res.status(500).send({message:'Unable to perform your request'}) ;
     }
}

const handleFetchDataDomain5 = async(req,res) => {
     const {jobTitle,jobCompany,jobLocation,jobSkills,jobType} = req.body ;
     try {
          let filteredData5 = await jobsDataModel.find({jobTitle:{$nin : category1}} && {jobTitle:{$nin : category2}} && {jobTitle:{$nin : category3}} && {jobTitle:{$nin : category4}}) 
          if(!filteredData5){
               return res.status(404).send({message:'No matching entries found'}) ;
          }
          else {
               return res.send(filteredData5) ;
          }
     }
     catch(error){
            return res.status(500).send({message:'Unable to perform your request'}) ;
     }
}

const express = require('express') ;
const registerRouter = express.Router() ;
const loginRouter = express.Router() ;
const dataFetchRouter1 = express.Router() ;
const dataFetchRouter2 = express.Router() ;
const dataFetchRouter3 = express.Router() ;
const dataFetchRouter4 = express.Router() ;
const dataFetchRouter5 = express.Router() ;


registerRouter.post('/postUserRegister',handleRegisterUser) ;
loginRouter.post('/postUserLogin',handleUserLogin) ;
dataFetchRouter1.get('/getDataCategory1',handleFetchDataDomain1) ;
dataFetchRouter2.get('/getDataCategory2',handleFetchDataDomain2) ;
dataFetchRouter3.get('/getDataCategory3',handleFetchDataDomain3) ;
dataFetchRouter4.get('/getDataCategory4',handleFetchDataDomain4) ;
dataFetchRouter5.get('/getDataCategory5',handleFetchDataDomain5) ;



module.exports = {
      registerRouter:registerRouter,
      loginRouter:loginRouter,
      dataFetchRouter1:dataFetchRouter1,
      dataFetchRouter2:dataFetchRouter2,
      dataFetchRouter3:dataFetchRouter3,
      dataFetchRouter4:dataFetchRouter4,
      dataFetchRouter5:dataFetchRouter5

}