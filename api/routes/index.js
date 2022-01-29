const express = require("express");
const router = express.Router();
const { userRegister,userLogin ,collegeRegister } = require("./reg.js");
const verify = require('./verifyToken');
const { User } = require("../models/user");
const { College } = require("../models/college");
const main = require("../utils/confirmationEmail");
const constructTemplate = require("../utils/registrationEmail");




router.post("/user/register", userRegister);
router.post("/college/register", collegeRegister);
router.post("/user/login", userLogin);
router.get('/user/fetchMe' , verify , async (req , res) => {
  const userfind = await  User.findById(req.user);
    res.json({data : userfind , success : true});
 })
 router.post('/user/subscribe', async (req , res) => {
   try {
    const collegeFind = await  College.findOne({name : req.body.name});
    if(!collegeFind) return res.status(400).send({msg : "College doesnt exist"});
   const emailCheck = await College.find({name : req.body.name, subscribers: req.body.email });
   if(emailCheck.length > 0)return res.status(400).send({msg : "Already Subscribed!"});
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

 router.post("/deadlineReminder", async (req , res)=>{
  const collegeFind = await  College.findOne({collegeid : req.body.collegeid});
  const status = "Deadline Nearing";
    const body = `Last date to apply for ${collegeFind.name} is 31-01-2021`;
    const message = constructTemplate(":)",status,body);
    
    
  for(let i=0; i<collegeFind.subscribers.length;i++){
    main(
      collegeFind.subscribers[i],
    "Tick-Tock",
    message
  );
  }
  res.json({msg : "Mail Sent!" , success : true});
 });


module.exports = router;
