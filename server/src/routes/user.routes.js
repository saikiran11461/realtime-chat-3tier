const express = require("express");

const userRouter = express.Router();

const {userController} = require("../controllers/user.controller");

userRouter.post("/register", userController.register)
userRouter.post("/login", userController.logIn)

module.exports = {userRouter}