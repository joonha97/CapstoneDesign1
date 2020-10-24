const express = require('express')
const app = express();
const port = 3001;
fs = require("fs")

app.get('/', function(req, res){
	//Write on File
	fs.appendFile('weather_0.txt', req.query.temp + "\n", function(err){
		if(err) return console.log(err);
	})
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})