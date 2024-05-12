const express= require("express");
const path = require("path");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const app= express();
mongoose.connect("mongodb://localhost:27017/userdata");


app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/signup",(req,res)=>{
    res.render("signup");
})

app.get("/login",(req,res)=>{
    res.render("login");
})

app.listen(5000);
 