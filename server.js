var app=require("express")(),path=require("path");app.get("/sigs",function(a,b){b.setHeader("Content-Type","application/json"),b.sendFile(path.resolve(__dirname)+"/sigs.json")}),app.listen(process.env.PORT||8e3,function(){var a=this.address().port;console.log("Server running on",a)});