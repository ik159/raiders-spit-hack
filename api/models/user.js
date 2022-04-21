const mongoose = require("mongoose");
const College = require('./college')
const OrganiserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  rank: {
    type: Number,
    require: true,
  },
  subscribedTo : [ {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
  },],
  enrolledAt : {
    type :Date,
    default: Date.now(),
},
});

module.exports = {
    User: mongoose.model("User", OrganiserSchema),
};
