const bcrypt = require("bcrypt");
// import user from "../models/user";
const user = require("../models/user"); //was not here till lecture 19
// we'll write 2 functions , one for hashing the password , another one for comparing the passwords


// comparing passwords -> when user will login to the system , he will write plain password .
// we will hash this plain password and compare it with the already hashed password which the user
// gave when he signed up the first time that is saved in the database .

exports.hashPassword = (password)=>{
    // to take a plain password and encrypt is using bcrypt.
    return new Promise((resolve , reject)=>{
        bcrypt.genSalt(12,(err,salt)=>{
            if(err) {
                reject(err);
            }
            bcrypt.hash(password,salt,(err,hash)=>{
                if(err) {
                    reject(err);
                }
                resolve(hash);
            });
        })
    })

}
exports.comparePassword = (password,hashed) =>{   
    // we'll retrieve hashedPassword from the database and plain password from the front-end when we're comparing 
    return bcrypt.compare(password,hashed); //this will return a boolean value , either true or false .
}