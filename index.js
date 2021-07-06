var express = require("express");
var fetch =require("node-fetch");
var app= express();
var router =express.Router();
 require("dotenv").config()
app.use(express.static('public'));
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//----------------- Start Routing GET && POST ------------------//
router.get("/",(req, res) => {
    res.json({msg:"sucess get request"}); 
});
//example ("localhost:4000/cairo,eg")
router.post("/:id",async(req,res)=>{
    const id = req.params.id;
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${id}}&units=metric&appid=${process.env.api_key_weather}`;
try{
    //get the data from api 
    await fetch(url)
      .then(res => res.json())
      .then(data => {
          if(data.message =="city not found"){
              console.log("city not found") 
              res.json({msg:"city not found plese enter correct name"})
          }
          else{
              console.log(data); //show all data that come from api 
              res.json({temp:data.main.temp,description:data.weather[0].description,like:data.main.feels_like})
          }
      });
}catch(err){
    console.log(err)
} 

});
//----------------- END Routing GET && POST ------------------//

app.use(router);
const PORT =process.env.PORT||4000; 
app.listen(PORT,()=>{console.log(`server run on ${PORT}`)})
 