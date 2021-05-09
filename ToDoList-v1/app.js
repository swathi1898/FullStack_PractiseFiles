const express = require("express");
const bodyParser = require("body-parser");


const app = express();



app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

let listItem = ["books","mobile"]
let workItem = [];

app.get("/",function(req,res){
    let today = new Date();
    let options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' };
    let day = today.toLocaleDateString("en-US", options);
    res.render("list",{whichday:day, newListItems:listItem});
});

app.get("/about",function(req,res){
    
    res.render("list",{whichday:"Work List",newListItems:workItem})
})
app.post("/",function(req,res){
    let item = req.body.itemName;
    if(req.body.button === "Work"){
        workItem.push(item);
        res.redirect("/about");
    }else{
        listItem.push(item);
        res.redirect("/");
    }
    
});
app.post("/about",function(req,res){
    
    res.redirect("/about");
});

app.listen(3000, function(){
    console.log("Server is running on port 3000.");
})