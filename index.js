const express= require("express");
const mongoose = require('mongoose');
const app= express();
mongoose.connect("mongodb://localhost:27017/userdata");
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/signup",(req,res)=>{
    res.render("signup");
})

app.listen(5000);
 