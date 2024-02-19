const networkProfile = require('./networkProfile') ;


const handleFetchProfileNetworkAll = async(req,res) => {
    try {
          let fetchResponse = await networkProfile.find() ;
          if(!fetchResponse){
              return res.status(409).send({message:"Unable to fetch the details"}) ;
          }
          else {
              console.log(fetchResponse) ;
              return res.send(fetchResponse) ;
          }
    }
    catch(error) {
         console.log(error) ;
         return res.status(500).send({message:"Unable to perform the request"}) ;
    }
}

const handleFetchProfileNetworkById = async(req,res) => {
    const {_id} = req.params ;
    try {
        let gotResponse = await networkProfile.findById({_id}) ;
        if(!gotResponse){
            return res.status(404).send({message:"Unable to find the profile"}) ; 
        }
        else {
             console.log(gotResponse) ;
             return res.send(gotResponse) ;
        }       
    }
    catch(error){
        console.log(error) ;
        return res.status(500).send({message:"Unable to perform your request"}) ;
    }
}

const express = require('express') ;
const networkAllFetchRouter = express.Router() ;
const networkIndividFetchRouter = express.Router() ;

networkAllFetchRouter.get('/getAllNetworkData',handleFetchProfileNetworkAll) ;
networkIndividFetchRouter.get('/getIndividualNetworkData/:_id',handleFetchProfileNetworkById) ;

module.exports = {
    networkAllFetchRouter:networkAllFetchRouter ,
    networkIndividFetchRouter:networkIndividFetchRouter
}
