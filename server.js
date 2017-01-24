/**
* Copyright © 2017, ACM@UIUC
*
* This file is part of the Groot Project.  
* 
* The Groot Project is open source software, released under the University of
* Illinois/NCSA Open Source License. You should have received a copy of
* this license in a file with the distribution.
**/

var express = require('express');
var path = require("path");
const winston = require('winston');
const expressWinston = require('express-winston');
const nodemailer = require('nodemailer');
const smtpConfig = {
	host: 'express-smtp.cites.uiuc.edu',
	port: 25,
	secure: false,
	ignoreTLS: true,
};
const transporter = nodemailer.createTransport(smtpConfig);

var app  = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  meta: false, // don't log metadata about requests (produces very messy logs if true)
  expressFormat: true, // Use the default Express/morgan request formatting.
}));

var request = require('request');

var yaml = require('js-yaml');
var fs   = require('fs');

function loadFile(filename) {
	var file;
	try {
		file = yaml.safeLoad(fs.readFileSync(filename, 'utf8'));
		// console.log(file);
	} catch (e) {
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
	if(groupType == "sigs") {
		return res.json(sigs);
	} else if(groupType == "committees") {
		return res.json(committees);
	} else {
		return res.json({"Error":"groupType does not exist, must be sig or committee"});
	}
});

function getGroup(groupType, groupName) {
	for(var i = 0; i < groupType.length; i++) {
		// console.log(groupType[i]);
		if(groupType[i].name.toLowerCase() == groupName.toLowerCase()) {
			return groupType[i];
		}
	}
	return {"Error":"Group does not exist"};
}

function checkIDs(res, group, netid)
{
	for(var i = 0; i < group.netids.length; i++)
	{
		if(group.netids[i] == netid) {
			return res.json({"netid": netid, "isValid" : true});
		}
	}
	return res.json({"isValid" : false});
}

app.get("/groups/:groupType/:groupName", function(req, res){
	var groupType = req.params.groupType;
	var groupName = req.params.groupName;
	var netid = req.query.isMember;
	if(groupType == "sigs") {
		var group = getGroup(sigs, groupName);
		if(netid == undefined || group["Error"]) { 
			return res.json(group);
		} else {
			return checkIDs(res, group, netid);
		}
	}
	else if(groupType == "committees") {
		var group = getGroup(committees, groupName);
		if(netid == undefined || group["Error"]) {
			return res.json(group);
		} else {
			return checkIDs(res, group, netid);
		}
	} else {
		return res.json({"Error":"groupType does not exist, must be sig or committee"});
	}
});
/*
process.on('uncaughtException', function (err) {
	if(process.env.EXCEPTION_FROM_EMAIL && process.env.EXCEPTION_TO_EMAIL){
		var mailOptions = {
			from: process.env.EXCEPTION_FROM_EMAIL, 
			to: process.env.EXCEPTION_TO_EMAIL,  
			subject: '[Groot-groups-service] Fatal Error: ' + (new Date).toLocaleTimeString(), 
			text: 'Uncaught Exception: Groot Groups Service\n' + err.stack,
		};

		transporter.sendMail(mailOptions, function(error, info){
			if(error){
				console.log(error);
			}else{
				console.log('Message sent: ' + info.response);
			}
		console.error((new Date).toLocaleTimeString() + ' uncaughtException:', err.message)
		console.error(err.stack)
		process.exit(1);

		});
	}
});
*/
app.listen(9001, function() {
    var addr = this.address().port;
    console.log("Server running on", addr);
});
