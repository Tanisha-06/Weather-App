const express= require('express');
const https=require('https');
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})
app.post("/",function(req,res){
    const query=req.body.cityName;
    console.log(query);
    console.log(req.body);
    const apikey="5f47f2f4e9e693224a911f7f4289dd51";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ query+"&appid="+ apikey+"&units="+unit;
    https.get(url,function(response){
        response.on("data",function(data){
            const weatherData= JSON.parse(data);
            console.log(weatherData);
            const temp=weatherData.main.temp;
            const weatherDescription=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const imgURL="http://openweathermap.org/img/wn/"+ icon +"@2x.png";
            res.write("<p>The weather is currently "+ weatherDescription +" </p>");
            res.write("<h1>The temperature in London is " + temp +" degree Celcius.</h1>");
            res.write("<img  src="+imgURL+">");
            res.send();
        });
    });
})

app.listen(3000,function(){
    console.log("server is running at port 3000");
})