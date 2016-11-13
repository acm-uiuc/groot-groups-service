# groot-groups-service
A service for holding groups(sig + committee)

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
