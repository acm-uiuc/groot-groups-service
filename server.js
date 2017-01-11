/**
* Copyright © 2016, ACM@UIUC
*
* This file is part of the Groot Project.  
* 
* The Groot Project is open source software, released under the University of
* Illinois/NCSA Open Source License. You should have received a copy of
* this license in a file with the distribution.
**/

var express = require('express');
var path = require("path");

var app  = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var request = require('request');

var yaml = require('js-yaml');
var fs   = require('fs');

function loadFile(filename)
{
	var file;
	try {
		file = yaml.safeLoad(fs.readFileSync(filename, 'utf8'));
		// console.log(file);
	}catch (e) {
		console.log("ERROR: " + e);
	}
	return file;
}


var sigs = loadFile(path.resolve(__dirname) + "/store/sigs.yaml");
var committees = loadFile(path.resolve(__dirname) + "/store/committees.yaml");

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

function getGroup(groupType, groupName)
{
	for(var i = 0; i < groupType.length; i++)
	{
		// console.log(groupType[i]);
		if(groupType[i].name.toLowerCase() == groupName.toLowerCase())
			return groupType[i];
	}
	return {"Error":"Group does not exist"};
}

function checkIDs(res, group, netid)
{
	for(var i = 0; i < group.netids.length; i++)
	{
		if(group.netids[i] == netid)
			return res.json({"netid": netid, "isValid" : true});
	}
	return res.json({"isValid" : false});
}

app.get("/groups/:groupType/:groupName", function(req, res){
	var groupType = req.params.groupType;
	var groupName = req.params.groupName;
	var netid = req.query.isMember;
	if(groupType == "sigs")
	{
		var group = getGroup(sigs, groupName);
		if(netid == undefined || group["Error"])
			return res.json(group);
		else
			return checkIDs(res, group, netid);
	}
	else if(groupType == "committees")
	{
		var group = getGroup(committees, groupName);
		if(netid == undefined || group["Error"])
			return res.json(group);
		else
			return checkIDs(res, group, netid);
	}
	else
		return res.json({"Error":"groupType does not exist, must be sig or committee"});
});

app.listen(9001, function() {
    var addr = this.address().port;
    console.log("Server running on", addr);
});
