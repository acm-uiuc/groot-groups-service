require('dotenv').config();


var express = require('express');
var path = require("path");

var app  = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// var jsonfile = require('jsonfile');
// var file = 'groups.json';

var yaml = require('js-yaml');
var fs   = require('fs');

function loadFile(filename)
{
	var file;
	try {
		file = yaml.safeLoad(fs.readFileSync(filename, 'utf8'));
		console.log(file);
	}catch (e) {
		console.log(e);
	}
	return file;
}


var sigs = loadFile("sigs.yaml");
var committees = loadFile("committees.yaml");

console.log(committees[0]);
app.get("/groups", function(req, res){
	return res.json(["sigs","committees"]);
});

app.get("/groups/:groupType", function(req, res){
	var groupType = req.params.groupType;
	if(groupType == "sigs")
		return res.json(sigs);
	else if(groupType == "committees")
		return res.json(committees);
	else
		return res.json({"Error":"groupType does not exist, must be sig or committee"});
});

function getGroup(res, groupType, groupName)
{
	for(var i = 0; i < groupType.length; i++)
	{
		console.log(groupType[i]);
		if(groupType[i].name.toLowerCase() == groupName.toLowerCase())
			return res.json(groupType[i]);
	}
	return res.json({"Error":"Group does not exist"});
}

app.get("/groups/:groupType/:groupName", function(req, res){
	//could have header ?isMember=<netid>
	var groupType = req.params.groupType;
	var groupName = req.params.groupName;
	if(groupType == "sigs")
	{
		return getGroup(res, sigs, groupName);
	}
	else if(groupType == "committees")
	{
		return getGroup(res, committees, groupName);
	}
	else
		return res.json({"Error":"groupType does not exist, must be a sig or committee"});

});

app.listen(9001, function() {
    var addr = this.address().port;
    console.log("Server running on", addr);
});
