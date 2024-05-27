//dependencies
const express = require("express");
const cors = require("cors");
const { test, registerUser } = require("../controllers/authController");
//app router
const router = express.Router();

//middle ware Request

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

//router request handle
router.get("/", test);
router.post("/register", registerUser);

module.exports = router;
