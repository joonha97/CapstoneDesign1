const express = require('express')
const app = express();
const port = 3000;
app.use(express.json())

var moment = require('moment');
require ('moment-timezone');
moment.tz.setDefault ("Asia/Seoul");
var date = moment().format ('YYYY-MM-DD hh:mm:ss');
var ip = require ('ip');

var field = {
	email: 'joonha97@gmail.com', 
	stuno: '20161627', 
	time: date, 
	ip: ip.address()
} 

var temp_field;

app.get('/', function(req, res){
	temp_field = Object.assign (req.query, field);
	console.log (temp_field);
	res.send (temp_field);
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})