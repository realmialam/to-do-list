//jshint esversion:6


const express = require("express");
const bodyParser = require("body-parser");
//Since date.js is present local to our system.
//So, We have require it in method shown below.
const date = require(__dirname + "/date.js"); //This module return function reference.

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];


const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/", function(req, res) {

  let day = date();
  res.render("list", {
    listTitle: day,
    newListItems: items
  });

});


app.post("/", function(req,res){

  if(req.body.list === "Work")
  {
    workItems.push(req.body.newItem);
    res.redirect("/work");
  }
  else{
    //items collection  is Declared at top.
    items.push(req.body.newItem);
    //This will redirect to root route.
    res.redirect("/");
  }

});

app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.post("/work", function(req,res){
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})


app.get("/about", function(req,res){
  res.render("about");
});








app.listen(3000, function() {
  console.log("Server is running at 3000.");
})
