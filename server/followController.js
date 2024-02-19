const registerModel = require('./registrationModel') ;

const handleFollowFeature = async(req,res) => {
    try {
      const myId = req.body._id ;
      const {followId} = req.params ;
       
      const currentUser = await registerModel.findById({myId}) ;
      const expectedUser = await registerModel.findById({followId}) ;
      
      if(currentUser.following.includes(expectedUser)){
          return res.status(400).send("Already following the user") ;
      }
      else {
          currentUser.following.push(expectedUser) ;
          expectedUser.followers.push(currentUser) ;
          
          const savedCurrentUser = await registerModel.save() ;
          const savedExpectedUser = await registerModel.save() ;
          console.log(`Successfully updated the users ${savedCurrentUser} and ${savedExpectedUser}`)  ;
      }
    }
    catch(error){
        return res.status(500).send({message:'Unable to perform the request'}) ;
    }  

}

const handleUnfollowFeature = async(req,res) => {
    try {
      const myId = req.body._id ;
      const {followId} = req.params ;

      const currentUser = await registerModel.findById({myId}) ;
      const expectedUser = await registerModel.findById({followId}) ;

      if(currentUser.following.includes(expectedUser)){
             currentUser.following.pull(expectedUser) ;
             expectedUser.followers.pull(currentUser) ; 

             const savedCurrentUser = await registerModel.save() ;
             const savedExpectedUser = await registerModel.save() ;
             console.log(`Successfully updated the users ${savedCurrentUser} and ${savedExpectedUser}`)  ;
      }
      else {
          return res.status(400).send({message : "Unable to get the id"}) ;
      }
    }
    catch(error){
        return res.status(500).send({message:'Unable to perform the request'}) ;
    }    
}

const express = require('express') ;
const followRouter = express.Router() ;
const unfollowRouter =  express.Router() ;

followRouter.put(`/followNewAccount/:_id`,handleFollowFeature) ;
unfollowRouter.put(`/unfollowAccount/:_id`,handleUnfollowFeature) ;


module.exports = {
    followRouter:followRouter,
    unfollowRouter:unfollowRouter
}