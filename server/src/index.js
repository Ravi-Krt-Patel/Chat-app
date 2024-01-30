import express from 'express'
import cors from 'cors'
import {createServer} from 'http'
import { Server } from  'socket.io'
import connect from './config/db.js'
import userController from './controllers/user.controller.js'


const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
})

app.use(cors())
app.use(express.json())

// app.use('/', (req, res)=>{
//     res.status(200).json({
//         message: 'app is working'
//     })
// }) 

app.use("/api/v1", userController)

io.on('connection', (socket) => {
    console.log("user is connected")
    console.log("Id", socket.id)
    //socket.emit('welcome', "wellcome to caht application")

    socket.on("message", (data)=>{
        console.log(data)
        socket.broadcast.emit("receive-message", data)
    })

    socket.broadcast.emit('welcome', 'welcome to server')


    socket.on('disconnect', ()=>{
        console.log("user Disconnected", socket.id)
    })
})






server.listen(3001, async ()=>{
    await connect()
    console.log("database is connected")
    console.log('app is runnig on the server using port 3001')
})