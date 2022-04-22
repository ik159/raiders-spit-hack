const express = require("express");
const router = express.Router();
const { userRegister, userLogin, collegeRegister } = require("./reg.js");
const verify = require("./verifyToken");
const { User } = require("../models/user");
const { College } = require("../models/college");
const main = require("../utils/confirmationEmail");
const constructTemplate = require("../utils/registrationEmail");

var admin = require("firebase-admin");

var serviceAccount = require("./spit-service-acc.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

function sendMessage(payload) {
  admin
    .messaging()
    .sendAll([payload])
    .then(function (response) {
      console.log("Successfully sent message:", response);
    })
    .catch(function (error) {
      console.log("Error sending message:", error);
    });
}

router.post("/user/register", userRegister);
router.post("/college/register", collegeRegister);
router.post("/user/login", userLogin);
router.get("/user/fetchMe", verify, async (req, res) => {
  const userfind = await User.findById(req.user).populate("subscribedTo");
  res.json({ data: userfind, success: true });
});
router.post("/getCollegeById", async (req, res) => {
  console.log(req.body);
  const college = await College.findOne({ collegeid : req.body.collegeid })
  console.log(college);
 return  res.status(200).send({ data: college, success: true });
});
router.post("/getAllColleges", verify, async (req, res) => {
  const colleges = await User.findById(req.user);
  return res.json({ data: colleges, success: true });
});
router.get("/getsubs", verify, async (req, res) => {
  const user = await User.findById(req.user).populate("subscribedTo");
  res.json({ data: user, success: true });
});

router.post("/user/subscribe", verify, async (req, res) => {
  try {
    //const token = req.headers["authorization"];
    const findUser = await User.findById(req.user);

    console.log("here", findUser);
    const { eventID, collegeid } = req.body;
    const collegeFind = await College.findOne({
      collegeid: req.body.collegeid,
    });
    if (!collegeFind)
      return res.status(400).send({ msg: "College doesnt exist" });
    const emailCheck = await College.findOne(
      { collegeid },
      {
        subscribers: 1,
      }
    );
    emailCheck.subscribers.forEach((subs) => {
      if (subs.toString() == findUser._id.toString()) {
        return res.status(400).send({ msg: "Already Subscribed!" });
      }
      
    });
    userSubscribe = await User.findOneAndUpdate(
      {
        _id: findUser._id
      },
      {
        $addToSet: { subscribedTo: collegeFind._id },
      }
    );
    collegeSubscribed = await College.findOneAndUpdate(
      {
        // eventID,
        collegeid,
      },
      {
        $addToSet: { subscribers: findUser._id },
      }
    );
    return res.status(200).send({
      success: true,
      msg: "Subscribed",
      data: collegeSubscribed,
    });
    collegeFind.subscribers.push(req.body.email);
    await collegeFind.save();
    const userfind = await User.findOne({ email: req.body.email });
    userfind.subscribedTo.push(collegeFind.name);
    await userfind.save();
    res.send({ success: true, msg: "Subscribed!" });
  } catch (error) {
    res.status(400).send({ msg: error });
  }
  const userfind = await User.findById(req.user);
  res.json({ data: userfind, success: true });
});

router.get("/deadlineReminder", async (req, res) => {
  //const collegeFind = await College.findOne({ collegeid: req.body.collegeid });
  const status = "Deadline Nearing";
  const body = `Last date to apply is 31-01-2021`;
  const message = constructTemplate(":)", status, body);

  //firebase
  var payload = {
    notification: {
      title: "Reminder!",
      body: `Last date to apply is 30-04-2021`,
    },
    topic: "all",
  };

  sendMessage(payload);
  for (let i = 0; i < collegeFind.subscribers.length; i++) {
    main(collegeFind.subscribers[i], "Tick-Tock", message);
  }
  res.json({ msg: "Mail Sent!", success: true });
});

module.exports = router;
