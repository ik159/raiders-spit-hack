const { User } = require("../models/user");
const { College } = require("../models/college");
const main = require("../utils/confirmationEmail");
const constructTemplate = require("../utils/registrationEmail");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userRegister = async (req, res) => {
    const findEmail = await User.findOne({email : req.body.email});
       if(findEmail) return res.status(400).send({msg : "Email already registered"})



       //hash the password
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash( req.body.password , salt);

      
      
        const  user = new User({
            name : req.body.name,
            email : req.body.email,
            password : hashedPassword,
            city : req.body.city,
            rank: req.body.rank,
         });
      

   try {
      const savedUser = await user.save();
      console.log(savedUser);
      res.send({user : user._id , success : true, msg : "Successfully Registered!"});
      const status = "Registration Successful!";
    const body = "You have successfully registered on our website Maha-Dhoondh!";
    const message = constructTemplate(savedUser.name,status,body);
    
    main(
        savedUser.email,
      "Registration at Maha-Dhoondh",
      message
    );
      
   } catch (error) {
      console.log(error);
      res.status(400).send({msg : error});
   }
  
};

const userLogin = async (req,res) => {
   //check if email exists
   const user = await User.findOne({email : req.body.email});
   if(!user) return res.status(400).send("Email doesnt exist")
   
   
   //check if password is correct
   const validatePass = await bcrypt.compare(req.body.password , user.password);
   if(!validatePass) return res.status(400).send("Password is wrong")
   
   
   //create and assign a token
   const token = jwt.sign({ _id: user._id} , process.env.TOKEN_SECRET)
   res.header('auth-token' ,token).send({token : token , success : true , id: user._id});
   

}

const collegeRegister = async (req, res) => {
   const findEmail = await College.findOne({name : req.body.name});
      if(findEmail) return res.status(400).send({msg : "College already registered"})



       const  college = new College({
           collegeid : req.body.collegeid,
           name : req.body.name,
           address : req.body.address,
           city : req.body.city,
           state: req.body.state,
           ranking: req.body.ranking,
           rating: req.body.rating,
           cutoffrank: req.body.cutoffrank,
           coordinates :req.body.coordinates
        });
     

  try {
     const savedCollege = await college.save();
     console.log(savedCollege);
     res.send({user : savedCollege._id , success : true, msg : "Successfully Registered!"}); 
  } catch (error) {
     console.log(error);
     res.status(400).send({msg : error});
  }
 
};


module.exports = {
  userRegister,
  userLogin,
  collegeRegister
};
