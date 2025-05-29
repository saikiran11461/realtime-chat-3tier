const {userModel} = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")


const userController = {
    register:async(req,res)=>{
        const {name,email,password} = req.body
        try {
            const user = await userModel.findOne({email});
            if(user){
                return res.status(200).send("user alredy exist")
            }

             const hashPass =await bcrypt.hash(password,10);
             const newUser = await userModel({
                name,
                email,
                password:hashPass
             })

             await newUser.save();

             return res.status(201).send({message:"user created success", newUser} )

            
        } catch (error) {
            return res.status(500).send(error)
        }
    },

    logIn : async(req,res)=>{
        const {email,password} = req.body
        try {
            const user =await userModel.findOne({email});
            if(!user){
                return res.send("user not found ")
            }

            let deocodePass  =await bcrypt.compare(password, user.password);

            if(!deocodePass){
                return res.send("pelase check email or password")
            }

            let token = jwt.sign({email:user.email, id:user.id}, "saikiran");

            if(!token){
                return res.send("please login in again")
            }

           res.cookie("token", token, {
            secure: false,
            sameSite: "Lax",
            maxAge: 1000 * 60 * 60 * 24 * 7,
           })

          
           return res.send("user logged in success")

        } catch (error) {
            return res.status(500).send(error)
        }
    }
}


module.exports = {userController}