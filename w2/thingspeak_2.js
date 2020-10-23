request = require("request")
fs = require("fs")

i=0
function doit() {
	v = Math.random() * 100
	url = "﻿http://localhost:3000/?value1="+ v
	request(url, function(err, res, body) {
		console.log(body) 
	})
	
	//File Appending
	fs.appendFile('random_number_0.txt', '\n\ ' + url, function(err){
		if(err) return console.log(err);
		//console.log('file write done')
	})
	
	console.log(`i=${i}`)
	if (i++ > 10) return
	setTimeout(doit, 1000)
}
console.log(`ready`)
doit()