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

app.get("/verifyGroup/:group/:netid", function(req, res){
	var netid = req.params.netid;
	var groupName = req.params.group;

	jsonfile.readFile(file, function(err, obj) {
		if(obj[groupName] && obj[groupName].indexOf(netid)> -1)
			return res.json({"netid":netid, "groups": groupName, "member":"true"});
		else
			return res.json({"netid":netid, "member":"false"});
	});
});

app.listen(9001, function() {
    var addr = this.address().port;
    console.log("Server running on", addr);
});
