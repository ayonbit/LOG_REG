//dependenciess
const User = require("../models/user");
//test auth
const test = (req, res) => {
  res.send("Home Page");
};
//register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //validation
    if (!name || !email) {
      return res.json({
        message: "Please fill in required field!",
      });
    }
    //check password
    if (!password || password.length < 6) {
      return res.json({
        message: "Passord Not less than 6 char ",
      });
    }
    //check email
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.json({
        message: "User Already been Registered",
      });
    }
    //create User
    const user = await User.create({
      name,
      email,
      password,
    });
    console.log(user);
    //user return
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  test,
  registerUser,
};
