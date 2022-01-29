const express = require("express");
const router = express.Router();
const { userRegister,userLogin } = require("./reg.js");
const verify = require('./verifyToken');
const { User } = require("../models/user");

router.post("/user/register", userRegister);
router.post("/user/login", userLogin);
router.get('/user/fetchMe' , verify , async (req , res) => {
  const userfind = await  User.findById(req.user);
    res.json({data : userfind , success : true});
 })
 router.get('/user/subscribe', async (req , res) => {
  const userfind = await  User.findById(req.user);
    res.json({data : userfind , success : true});
 })


module.exports = router;
