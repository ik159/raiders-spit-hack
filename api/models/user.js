const mongoose = require("mongoose");
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
  subscribedTo : [String],
  enrolledAt : {
    type :Date,
    default: Date.now(),
},
});

module.exports = {
    User: mongoose.model("User", OrganiserSchema),
};
