
var express = require("express");
var mongoose = require("mongoose"); 
var bodyParser = require("body-parser");
var cors = require("cors");

var Author = require("./models/author"); //nesne
var User = require("./models/user"); //nesne


var author=require("./services/authorService");// servis
var user=require("./services/userService"); // servis

var app = express();

app.use(cors())
app.use(bodyParser.json()); //json formatidna gonderiyor

mongoose.connect(
  "mongodb+srv://omer:1234@cluster0.beezlpk.mongodb.net/?retryWrites=true&w=majority",(error) => {
    if (!error) {
      console.log("Connected to DataBase...");
    }
  }
);

app.use("/author", author.router);
app.use("/user", user.router); //user/register yani

app.listen(8080);


