//dependenciess
const User = require("../models/user");
const { hashedPassword, comparePassword } = require("../helper/auth");
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
        error: "Please fill in required field!",
      });
    }
    //check password
    if (!password || password.length < 6) {
      return res.json({
        error: "Passord Not less than 6 char ",
      });
    }
    //check email
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.json({
        error: "User Already been Registered",
      });
    }

    //hashed password
    const passwordhash = await hashedPassword(password);

    //create User
    const user = await User.create({
      name,
      email,
      password: passwordhash,
    });
    //console.log(user);
    //user return
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

//login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validate
    if (!email || !password) {
      res.json({
        error: "Please enter Email & Password!",
      });
    }

    //check user
    const user = await User.findOne({ email });
    if (!user) {
      res.json({
        error: "User Not Found Please Register First!",
      });
    }
    //if user found then matched the password
    const matchPassword = await comparePassword(password, user.password);
    if (!matchPassword) {
      res.json({
        error: "Wrong Password! Enter Correct Password",
      });
    }
    if (matchPassword) {
      res.json("Logged In");
      //const userName = user.name;
      //console.log(`${userName} Successfuly Logged In!`);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  test,
  registerUser,
  loginUser,
};
