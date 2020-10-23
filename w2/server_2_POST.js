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

app.post('/', function(req, res){
	//POST 방식은 페이지가 로드되는 순간이 아니라 POST하는 순간의 시간을 저장해야 하므로 time을 갱신한다.
	field.time = moment().format ('YYYY-MM-DD hh:mm:ss');
	temp_field = Object.assign (req.body, field);
	
	//일단 (JSON 형태로 들어오는)정보를 모두 저장한다.
	var body = '';
	req.on ('data', function(data) {
		body += data;
	});
	
	req.on('end', function() {
		//JSON 형태의 정보를 파싱하여 저장
		temp_field = Object.assign (JSON.parse(body), field);
		console.log (temp_field);
		res.send (temp_field);
	});
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})