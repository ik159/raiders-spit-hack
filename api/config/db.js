const mongoose = require("mongoose");

async function connectDB() {
  mongoose
    .connect(
      "mongodb+srv://prehack:prehack@pre-hack.vhcqd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("DB CONNECTED");
    })
    .catch(console.log("DB NOT CONNECTED"));
}
module.exports = connectDB;
