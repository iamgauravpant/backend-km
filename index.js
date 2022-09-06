const express = require("express");
const app = express();
const PORT = 8088;
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const { login,register } = require("./controllers/auth");

//middlewares 
app.use(express.urlencoded({extended:true}));  //iska matlab ??
app.use(express.json());
app.use(cors());

//db 
mongoose
  .connect(process.env.DATABASE, { useNewUrlParser: true })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database Error =>", err));

//route
app.get("/",cors(),async(req,res)=>{
  
});
app.post("/api/register",register);
app.post("/api/login",login);


app.listen(PORT,()=>{
    console.log(`App is listening at port : http://localhost:${PORT}`);
})