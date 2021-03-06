# groot-groups-service

[![Build Status](https://travis-ci.org/acm-uiuc/groot-groups-service.svg?branch=master)](https://travis-ci.org/acm-uiuc/groot-groups-service)

A service for ACM groups (sig + committee)

[![Join the chat at https://acm-uiuc.slack.com/messages/C6XGZD212/](https://img.shields.io/badge/slack-groot-724D71.svg)](https://acm-uiuc.slack.com/messages/C6XGZD212/)

## Getting Started

To use,``` npm install ``` and ```node server.js```

### Endpoints

GET `groups`

  Returns the two group types: `{["sigs","committees"]}`

GET `groups/:groupType`
  
  Returns the data of all sigs or all committees

GET `groups/:groupType/:groupName`

  Returns all data about particular group or committee

GET `groups/:groupType/:groupName?isMember=<NETID>`

  Returns True or False depending on if a person is part of a specific group

## License

This project is licensed under the University of Illinois/NCSA Open Source License. For a full copy of this license take a look at the LICENSE file. 

When contributing new files to this project, preappend the following header to the file as a comment: 

```
Copyright © 2017, ACM@UIUC

This file is part of the Groot Project.  
 
The Groot Project is open source software, released under the University of Illinois/NCSA Open Source License. 
You should have received a copy of this license in a file with the distribution.
```
