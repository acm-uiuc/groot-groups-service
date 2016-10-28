var app = require("express")();
var path = require('path');

/**
  * Get '/sigs/'
  * Returns SIG information as JSON
  */
app.get('/sigs', function(req, res){
  res.setHeader('Content-Type', 'application/json');
  res.sendFile(path.resolve(__dirname) + '/sigs.json');
});

app.listen(process.env.PORT || 8000, function(){
  var port = this.address().port;
  console.log("Server running on" , port);
});
