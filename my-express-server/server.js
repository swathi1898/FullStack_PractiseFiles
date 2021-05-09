const express = require('express');

const app = express();

app.get("/", function(req,res){
    res.send("<h1> hello world!</h1>");
});

app.get("/contact",function(req, res){
    res.send("Contact me :");
});

app.get("/about",function(req, res){
    res.send("i am swathi");
});

app.get("/hobbies",function(req, res){
    res.send("<ul><li>craft</li><li>drawing</li><li>cooking</li> </ul>");
});

app.listen(3000, function(){
    console.log("Server started on port 3000");
});