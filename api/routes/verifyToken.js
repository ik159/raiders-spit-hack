
const jwt = require('jsonwebtoken');

module.exports =  function(req , res , next) {
     //const token = req.header('auth-token');
     const token = req.headers["auth-token"];
     console.log("token" ,token)
     if(!token) return res.status(401).send("Access Denied");


     try {
         const verified = jwt.verify(token , process.env.TOKEN_SECRET)
         req.user = verified;
         next(); // we get the payload back 
     } catch (error) {
         res.status(400).send("error")
     }
}
