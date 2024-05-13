const express= require("express");
const path = require("path");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const app= express();
mongoose.connect("mongodb://localhost:27017/userdata");
const User = require("./users")


app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/signup",(req,res)=>{
    res.render("signup");
})

app.post("/signup", async(req,res)=>{
    let data = req.body;
    const auth = await User.findOne({name : req.body.name});
    if(!auth){
    let result = await User.insertMany(data);
    console.log("connected");
    console.log(result);
    res.redirect("/login");
    }
    else{
        res.status(404).json({ error: "username already exists" });
    }
})

app.get("/login",(req,res)=>{
    res.render("login");
});

app.post("/login", async(req,res)=>{
    const check = await User.findOne({name: req.body.name });
    if(!check){
        res.send("User name cannot found");
    }
    else if(req.body.password != check.password){
        res.send("wrong Password");
    }
    else{
        res.send(check);
    }
})

app.listen(5000);
 