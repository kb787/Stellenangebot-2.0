const userProfileModel = require('./userProfileModel') ;
const multer = require('multer') ;
const authenticated = require('./middleware') ;
const createdStorage = multer.diskStorage(
    {
        destination:function(req,file,cb){
           cb(null,'profiles/') ;
        },
        filename:function(req,file,cb){
          cb(null,Date.now()) ;
        } 
    }
 )
const fileUpload = multer({storage:createdStorage}) ;

const handlePostUserProfile = async(req,res) => {

    const {userFullName,userJobTitle,userProfileDescription,userSkills,userUniversityName,userDegreeName,userDegreeTime,userDegreeGPA,userPreferredLocation,userPreferredLocationType,userCompanyName,userWorkDescription,userWorkTenure,projectName,projectDescription,projectLink} = req.body ;
    try { 

           if(!userFullName) {
               return res.status(406).send({message:'Fill the mandatory fields'}) ;
           }
           const {userImage} = req.file.path ;
           if(!req.file) {
              return res.status(400).send({message:'Profile image is required',success:false}) ;
           }
           const newUser = await new userProfileModel({userImage,userFullName,userJobTitle,userProfileDescription,userSkills,userUniversityName,userDegreeName,userDegreeTime,userDegreeGPA,userPreferredLocation,userPreferredLocationType,userCompanyName,userWorkDescription,userWorkTenure,projectName,projectDescription,projectLink})
           const savedUser = await newUser.save() ;
           console.log(savedUser) ;
           return res.status(201).send({message:'Profile details saved successfully',success:true,savedUser}) ;  
    }
    catch(error){
           return res.status(500).send({message:'Server side error occured',success:false}) ;
    }
}

const handleUpdateUserProfileById = async(req,res) => {

     const {_id} = req.params ; 
    
    try {
        const updatedObject = await userProfileModel.findByIdAndUpdate({_id}) ;
        if(!updatedObject){
           return res.status(404).send({message:"Profile does not exists"}) ;
        }
        else {
           let savedOne = await updatedObject.save() ;
           console.log(savedOne) ;  
          return res.status(200).send({message:"Successfully updated the object"}) ;  
        }
    }
    catch(error){
        console.log(error) ;
        return res.status(500).send({message:'Unable to perform your request'}) ;
    }    
}

const handleDeleteUserProfileById = async(req,res) => {
    const {_id} = req.params ;
    try {
        const deletedObject = await userProfileModel.findByIdAndDelete({_id}) ;
        if(!deletedObject){
           return res.status(404).send({message:"Profile does not exists"}) ;
        }
        else {
          return res.status(200).send({message:"Successfully updated the object"}) ;  
        }
    }
    catch(error){
        console.log(error) ;
        return res.status(500).send({message:'Unable to perform your request'}) ;
    }
}

const handleGetUserProfileById = async(req,res) => {
    const {_id} = req.params ;
    try {
        const foundObject = await userProfileModel.findById({_id}) ;
        if(!foundObject){
           return res.status(404).send({message:"Profile does not exists"}) ;
        }
        else {
          console.log(foundObject) ;  
          return res.status(200).send({foundObject}) ; 
        }
    }
    catch(error){
        console.log(error) ;
        return res.status(500).send({message:'Unable to perform your request'}) ;
    }
}



const express = require('express') ;
const profilePostingRouter = express.Router() ;
const profileGetRouter = express.Router() ;
const profileDeleteRouter = express.Router() ;
const profileUpdateRouter = express.Router() ;

profilePostingRouter.post('/postUserProfile',fileUpload.single('profileImage'),authenticated,handlePostUserProfile) ;
profileGetRouter.get('/getUserProfile/:_id',authenticated,handleGetUserProfileById) ; 
profileDeleteRouter.delete('/deleteUserProfile/:_id',authenticated,handleDeleteUserProfileById) ;
profileUpdateRouter.put('/updateUserProfile/:_id',authenticated,handleUpdateUserProfileById) ;

module.exports = {
 profilePostingRouter:profilePostingRouter,
 profileGetRouter:profileGetRouter,
 profileDeleteRouter:profileDeleteRouter ,
 profileUpdateRouter:profileUpdateRouter
} 



