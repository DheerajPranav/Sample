const express = require("express");
const app = express();

app.use(function(req, res, next){
	console.log(`${new Date()} - ${req.method} request for ${req.url}`);




	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:81');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();

});
app.use(express.static("../static")); 

app.listen(81, function(){
	console.log("Skin Cancer classifier running on port:81")

});











