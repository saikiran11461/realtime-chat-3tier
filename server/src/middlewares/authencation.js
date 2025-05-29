const jwt = require("jsonwebtoken")

const authencation  = (req,res,next) =>{
    const token = req.cookie?.token;

    if(!token){
        return res.send("token is not found in the cookies")
    }

    jwt.verify(token,"saikiran", (err,decode)=>{
        if(err){
            return res.send("something went wrong ")
        }
        req.user = decode;

        next()
    })
}


module.exports = {authencation}