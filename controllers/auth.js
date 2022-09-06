// here are controller functions for registering , logging in and logout  
// in a separate file just to have a structure 
const {User} = require("../models/user");
const { hashPassword, comparePassword } = require("../utils/auth");
const jwt = require("jsonwebtoken");
// const {nanoid} = require("nanoid");
// const ID = nanoid();

// register

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // validations
    if (!name) return res.status(400).send("Name is required .");
    if (!password || password.length<6)
      return res
        .status(400)
        .send("Password is required and should be atleast 6 characters long .");
    let userExists = await User.findOne({email}).exec(); // email uniqueness logic
    if(userExists) return res.status(400).send("Email is taken");
    // hash password
    const hashedPassword = await hashPassword(password);
    // register
    const user = new User({
        name, email, password: hashedPassword
    });
    await user.save();
    console.log("Saved user",user);
    return res.json({ok:true});
  } 
  
  catch (err) {
    console.log(err);
    return res.status(400).send("Error . Try again .");
  }
};
exports.register= register;

// login

const login = async (req,res)=>{
  try{
      // console.log(req.body);
      // check if our db has user with that email
      const {email , password } = req.body;
      const user = await User.findOne({email}).exec();
      if(!user) return res.status(400).send("No user found");
      // check password
      const match = await comparePassword(password,user.password);
      if(!match) return res.status(400).send("Wrong Password");
      // create signed JWT
      const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{
        expiresIn:"7d",
      }); //our token will expire in 7 days , it means when a user logged in , he will remain logged in till 7 days.

      // return user and token to client , exclude hashed password.
      user.password = undefined;
      
      // send token in cookie 
      res.cookie("token",token,{
        httpOnly:true,
        // secure:true, //only works on https
      }); //create cookie with the name token

      // send user as json response 
      res.json(user);
  }
  catch(err) {
    console.log(err);
    return res.status(400).send("Error . Try again . Login wala route");

  }
};
exports.login= login;
