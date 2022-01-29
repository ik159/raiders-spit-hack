require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const logger = require("morgan");
const organiserRoutes = require("./routes/index");
const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use("/", organiserRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to hack API", success: true });
});

const PORT = process.env.PORT || 5000;

const start = () => {
  if (!process.env.mongo_dev) {
    console.log("Error: mongoURI missing !!");
    return;
  }
  connectDB();

  app.listen(PORT, () => console.log(`Running on port ${PORT}`));
};

start();
