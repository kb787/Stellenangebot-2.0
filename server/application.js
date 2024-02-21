const express = require('express') ;
const app = express() ;
const http = require('http') ;
const server = http.createServer(app) ;
const chatApp = express() ;
const chatServer = http.createServer(chatApp) ;
const {Server} = require('socket.io')
const cors = require('cors') ;
const Connection = require('./configure') ;
const {registerRouter,loginRouter,dataFetchRouter1,dataFetchRouter2,dataFetchRouter3,dataFetchRouter4,dataFetchRouter5}  = require('./controller') ;
const {profilePostingRouter,profileGetRouter,profileUpdateRouter,profileDeleteRouter} = require('./userProfileController') ;
const {networkAllFetchRouter,networkIndividFetchRouter} = require('./networkController') ;
const {followRouter,unfollowRouter} = require('./followController') ;
// const cookieParser = require('cookie-parser') ;
const dotenv = require('dotenv') ;
dotenv.config() ;

const native_server = process.env.native_server_api ;
const express_server_port = process.env.express_port_no ;
const chat_server_port = process.env.chatserver_port_no ;

const io = new Server(chatServer,{
    cors: {
      origin:native_server,
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  }) ;
const corsOptions = {
    origin:native_server,
}


io.on("connection",(socket) => {
    console.log(socket.id) ;

    socket.on("join_room",(data) => {
       socket.join(data) ;
       console.log(`User with id : ${socket.id} joined room ${data}`)  
    }
    )

    socket.on("send_message",(data) => {
        socket.to(data.room).emit("recieve_message",data) ;
    }
    )

    socket.on("disconnect", () => {
         console.log("User disconnected",socket.id) ;
    })
})

app.get("/",(req,res) => {
    res.send("The application is running") ;
})
app.use(express.json()) ;
// app.use(cookieParser()) ;
app.use(cors(corsOptions)) ;
app.use('/auth/api',registerRouter) ;
app.use('/auth/api',loginRouter) ;
app.use('/data/api',dataFetchRouter1) ;
app.use('/data/api',dataFetchRouter2) ;
app.use('/data/api',dataFetchRouter3) ;
app.use('/data/api',dataFetchRouter4) ;
app.use('/data/api',dataFetchRouter5) ;
app.use('/profile/api',profilePostingRouter) ;
app.use('/profile/api',profileGetRouter) ;
app.use('/profile/api',profileDeleteRouter) ;
app.use('/profile/api',profileUpdateRouter) ;
app.use('/network/api',networkAllFetchRouter) ;
app.use('/network/api',networkIndividFetchRouter) ;
app.use('/connection/api',followRouter) ;
app.use('/connection/api',unfollowRouter) ;
Connection() ;

server.listen(express_server_port, () => {
      console.log("App launched successfully") ;  
})

chatServer.listen(chat_server_port, () => {
    console.log("Chat server is running") ;  
})

