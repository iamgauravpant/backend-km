const mongoose = require("mongoose");
const {Schema} = mongoose; // destructuring Schema from mongoose

const userSchema  = new Schema({
    name:{
        type:String,
        trim:true,
        required:true,
    },
    email:{
        type:String, // there is no email type ?
        trim:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:64,
    },
    // picture:{
    //     type:String,
    //     default:"./avatar.png",
    // },
},{timestamps:true});  //2nd argument is optional 
const User = mongoose.model("User",userSchema);
exports.User = User;
// Reference chaoo charles ->  require() vs import statement in Node.js #4 | MERN Stack Tutorial With Auth video lecture