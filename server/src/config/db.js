const mongoose = require("mongoose");

const Connection = () =>{
    return mongoose.connect("mongodb://127.0.0.1:27017/chat-app")
}

module.exports = {Connection};