const express = require("express");
const https = require("https");                  //native node module to send get request to external server
const bodyParser= require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req , res){

  res.sendFile(__dirname+"/index.html");

})


app.post("/", function(req , res){



  const query = req.body.cityName;
  const apiKey="42760cb6c1819000f726acc2a5e2b500";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey;
  https.get(url , function(response){               // sending external api get request
    console.log(response.statusCode);

    response.on("data" , function(data){           // on function is triggered when we recieved "data" (first parameter)
      const weatherData= JSON.parse(data);
      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      const imageURL ="http://openweathermap.org/img/wn/"+icon+"@2x.png";
      console.log(temp);

      const weatherDescription= weatherData.weather[0].description;
      console.log(weatherDescription);
      console.log(weatherData);
      res.write("<p>The weather is currently " +weatherDescription+"</p>");

      res.write("<h1>the temperature in "+query+" is " + (temp-272.15) + " degree celcius</h1>");

      res.write("<img src="+imageURL+">");
      res.send();
    })
  })

})







app.listen(3000,function() {
  console.log("server is running on port 3000");
})
