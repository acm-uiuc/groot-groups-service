# groot-groups-service
A service for holding groups(sig + committee)

Groot core development:

[![Join the chat at https://gitter.im/acm-uiuc/groot-development](https://badges.gitter.im/acm-uiuc/groot-development.svg)](https://gitter.im/acm-uiuc/groot-development?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Questions on how to add your app to Groot or use the Groot API:

[![Join the chat at https://gitter.im/acm-uiuc/groot-users](https://badges.gitter.im/acm-uiuc/groot-users.svg)](https://gitter.im/acm-uiuc/groot-users?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

##Getting Started

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
