const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
require('dotenv').config()
const APPID = process.env.APPID
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");

});
app.post("/", function(req,res){
  let city = req.body.city;
  let url = "https://api.openweathermap.org/data/2.5/weather?q="+city+`&appid=${APPID}&units=metric`;
  https.get(url,function(responce){
    console.log(responce.statusCode);
    responce.on("data", (data)=>{
      var weatherReport = JSON.parse(data);
      var temp = weatherReport.main.temp;
      var des = weatherReport.weather[0].description;
      var imgCode = weatherReport.weather[0].icon;
      var imgUrl = " http://openweathermap.org/img/wn/"+imgCode+ "@2x.png"
      res.write("<h1> the temparature in "+city+" is "+ temp +" degree </h1>");
      res.write("<p> description :"+ des+":  </p><img src="+ imgUrl+">");
      res.send()
    });
  });
})


app.listen(3000, function(){
  console.log("hello there...");
});
