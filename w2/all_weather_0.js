//const convert = require('xml-js');
const request = require('request');
var parseString = require('xml2js').parseString;
fs = require("fs")

//10분마다 xml가져오고
//파싱해서 파라미터 추출하고
//그거를 1시간마다 thingspeak로 쏴준다
//동시에 내 서버로 쏴준다

i=0

//10분마다 XML 가져와서 JSON 파싱까지
function getWeather() {
	url = "http://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=1159051000"
	request(url, function(err, res, body) {
		if(err){
			console.log(`err=>${err}`)
		}
		else{
			if(res.statusCode == 200) {
				parseString(body, function(err, result){
					if(err)
						console.error(err);
					
					var weather = result.rss.channel[0].item[0].description[0].body[0].data[0].temp;
					console.log(weather);
					
					
					//내 서버에 데이터 보내기
					request("http://localhost:3001/?temp="+weather, function(err,res, body) {
						if(err)
							console.error(err);
						else
							console.log(body)
					})
					

					
					//thingspeak에 데이터 보내기
					request("https://api.thingspeak.com/update?api_key=VQJFO6OUBMSEORID&field1="+weather, function(err,res,body){
						if(err)
							console.error(err)
						else
							console.log(body)
					})
					
				})
			}
		}
	})
	
	console.log(`i=${i++}=================================================`)
	//10분
	//setTimeout(getWeather, 600000)
	//10초
	setTimeout(getWeather, 10000)
}

console.log(`ready`)
getWeather()