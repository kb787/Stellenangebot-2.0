const dotenv = require('dotenv') ;
const mongoose = require('mongoose') ;
const colors = require('colors') ;


dotenv.config() ;

const Connection = async() => {
    try {
          await mongoose.connect(process.env.mongodb_uri) ;
          console.log(`Successfully connected to mongodb database`.bgGreen) ;
    }
    catch(error){
          console.log(`Unable to connect to database due to error ${error}`.bgRed) ;
    }
}

module.exports = Connection ;

