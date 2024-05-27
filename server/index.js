//dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

//app
const app = express();

//port
const PORT = process.env.PORT;

//middleware
app.use(express.json());
app.use(bodyParser.json());
//app.use(cors());
app.use(express.urlencoded({ extended: false }));

//middleWareRoutes
app.use("/", require("./routes/authRoutes"));

//db conncetion
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database is connected Successfully!"))
  .catch((err) => console.log("Database is not Connected", err));

//server
app.listen(PORT, () => console.log(`PORT is running on ${PORT}`));
