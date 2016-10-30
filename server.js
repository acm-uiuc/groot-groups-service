var express = require('express');
var path = require("path");

var app  = express();

app.get("/sigs", function(req, res) {
    res.setHeader("Content-Type", "application/json");
    res.sendFile(path.resolve(__dirname) + "/sigs.json");
});

app.listen(9001, function() {
    var addr = this.address().port;
    console.log("Server running on", addr);
});
