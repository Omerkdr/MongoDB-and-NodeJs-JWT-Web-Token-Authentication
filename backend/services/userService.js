var express = require("express");
var router = express.Router();
var jwt = require("jwt-simple");

var User = require("../models/user");

router.post("/register", (request, response) => {
  var userData = request.body;
  var user = new User(userData);

  user.save((error, result) => {
    if (error) {
      console.log("Error saving the user");
    }
    return response.status(201).send({message: "Created"})
  });
});

router.post("/login", async (request, response) => {
  var userData = request.body;
  var user = await User.findOne({ email: userData.email }); //userdata icinde varsa gir demek
  if (!user) {
    return response
      .sendStatus(401)
      .send({ message: "Email or password invalid" }); //guvenlik acıgı olmaması icin aynı hata mesajını gönderiyoruz
  }
  if (userData.password != user.password) {
    return response
      .sendStatus(401)
      .send({ message: "Email or password invalid" });
  }
  var payload = {}; //jwt bilgi tutabiliyor bu da payload
  var token = jwt.encode(payload,'12345') //sifreyi cozmek icin gerekli anahtar
  return response.status(200).send({token}); // send yapınca postman cevap veriyor
});

var user = { router,checkAuthenticated:(request,response,next)=>{
  
  if(!request.header('authorization')) {
    
    return response.status(401).send({message: 'You are not authorized Header'})
  }

  var token = request.header('authorization').split(' ')[1]

  var payload = jwt.decode(token,'12345')

  if (!payload) {
    return response.status(401).send({message: "Unauthorized. Token is not valid"})
  }


  next() //next demek calısabilirsin sıkıntı yok demek

}};

module.exports = user;
