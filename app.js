const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
  res.sendFile(__dirname+"/index.html");
});


app.post("/", function(req, res){
  const query = req.body.cityName;
  const appKey = "94b62cad95d2d8267e29d31b3f4411c2"
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appKey+"&units="+units+"#";
  https.get( url, function(response){
    //console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData  = JSON.parse(data);
      // console.log(weatherData);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const city = weatherData.name;
      const icon = weatherData.weather[0].icon;
      const imgUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";

      res.write("<h1>The current temperature in "+city+" is "+temp+" degree celsius.</h1>");
      res.write("<p>The weather can be described as "+desc+".</p>");
      res.write("<img src="+imgUrl+">");
      res.send();
    });
  });
});


app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});
