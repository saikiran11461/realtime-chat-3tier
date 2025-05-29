// this is index.js server 

const express = require("express");
const webSocket = require("socket.io");
const cors = require("cors");
const { Connection } = require("./src/config/db");
const { userRouter } = require("./src/routes/user.routes");
const {socketHandler} = require("./src/controllers/socke.controller")
const http = require("http");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRouter)


const server = http.createServer(app);

const io = webSocket(server);



server.listen(3456,async()=>{
    try {
        await Connection();
        console.log("connected on port 3456")
    } catch (error) {
        console.log(error)
    }
})

