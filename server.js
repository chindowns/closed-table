const express = require("express");
const path = require("path");

// Create the express app
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// tables and waitlest are an array of objects
// obj {routeName:, name:, email:, phone:, id: }
var tables = [];

var waitlist = [];

// Route Listeners

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/view", function(req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "make.html"));
});

app.get("/clear", function(req, res) {
    tables = [];
    waitlist = [];
})

// displays table list and wait list

app.get("/api/tables", function(req, res) {
    return res.json(tables);
});

app.get("/api/wait", function(req, res) {
    return res.json(waitlist);
});

app.post("/api/add", function(req, res){
    var newTable = req.body;

    newTable.routeName = newTable.name.replace(/\s+/g, "").toLowerCase();

    console.log(newTable);
    if(table.length<6){
        tables.push(newTable);
        res.json("Your Table is available");
    } else {
        waitlist.push(newTable);
        res.json("You are on the waitlist");
    }
    
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
