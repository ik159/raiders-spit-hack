const express = require("express");
const router = express.Router();
const { userRegister,userLogin ,collegeRegister } = require("./reg.js");
const verify = require('./verifyToken');
const { User } = require("../models/user");
const { College } = require("../models/college");
router.post("/user/register", userRegister);
router.post("/college/register", collegeRegister);
router.post("/user/login", userLogin);
router.get('/user/fetchMe' , verify , async (req , res) => {
  const userfind = await  User.findById(req.user);
    res.json({data : userfind , success : true});
 })
 router.post('/user/subscribe', async (req , res) => {
   try {
    const collegeFind = await  College.findOne({collegeid : req.body.collegeid});
    if(!collegeFind) res.status(400).send({msg : "College doesnt exist"});
  
    collegeFind.subscribers.push(req.body.email);
    await collegeFind.save();
    const userfind = await  User.findOne({email : req.body.email});
    userfind.subscribedTo.push(collegeFind.name);
    await userfind.save();
    res.send({ success : true, msg : "Subscribed!"});
   } catch (error) {
    res.status(400).send({msg : error});
   }
  const userfind = await  User.findById(req.user);
    res.json({data : userfind , success : true});
 })


module.exports = router;
