const express = require("express");

const bodyParser = require("body-parser");

const https =require("https");
const { STATUS_CODES } = require("http");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
    // res.send("server is open");
});

app.post("/",function(req,res){
    const query = req.body.cityName;
    const apikey = "697bcb79e97a00132dd5218a19e98ec7";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;
    https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
        
        const weatherData = JSON.parse(data);
        console.log(weatherData);


        const object ={
            name:"swathi",
            favouriteFood:"briyani"
        };
        console.log(JSON.stringify(weatherData));

        const temp = weatherData.main.temp;
        // console.log(temp);

        const weatherDescription = weatherData.weather[0].description;
        // console.log(weatherDescription);

        const icon = weatherData.weather[0].icon;
        const iconURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png"

        res.write("<h1>The temperature in "+query+" is "+ temp +" degree celcius.</h1>");
        res.write("<P>The weather is currently "+ weatherDescription +"</P>");
        res.write("<img src=" +iconURL+">")
        res.send()
    })
});
})

app.listen(3000, function(){
    console.log("Server is running on port 3000.")
});

