const mongoose = require("mongoose");
const CollegeSchema = new mongoose.Schema({
  collegeid :{
      type: Number,
      required: true
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  ranking: {
    type: Number,
    require: true,
  },
  rating: {
    type: Number,
    require: true,
  },
  cutoffrank: {
    type: Number,
    require: true,
  },
  coordiates: [Number],
  subscribers : [String],
});

module.exports = {
    College: mongoose.model("College", CollegeSchema),
};
