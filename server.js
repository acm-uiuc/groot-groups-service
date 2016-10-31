var express = require('express');
var path = require("path");

var app  = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var jsonfile = require('jsonfile');
var file = 'groups.json';


app.get("/sigs", function(req, res) {
    res.setHeader("Content-Type", "application/json");
    res.sendFile(path.resolve(__dirname) + "/sigs.json");
});

app.post("/groups", function(req, res){
	var netid = req.body.netid;
	var groupType = req.body.group;

	jsonfile.readFile(file, function(err, obj) {
		if(obj[groupType] && obj[groupType].indexOf(netid)> -1)
			return res.json({"netid":netid, "authenticated":"true"});
		else
			return res.json({"authenticated":"false"});
	});
});

app.listen(9001, function() {
    var addr = this.address().port;
    console.log("Server running on", addr);
});
