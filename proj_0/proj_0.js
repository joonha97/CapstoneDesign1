var express = require('express');
var app = express();
i=0
mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'me',
    password: 'mypassword',
    database: 'proj_0'
})
connection.connect();
/*
function insert_sensor(device, unit, type, value, seq, ip) {
  obj = {};
  obj.seq = seq;
  obj.device = device;
  obj.unit = unit;
  obj.type = type;
  obj.value = value;
  obj.ip = ip.replace(/^.*:/, '')

  var query = connection.query('insert into sensors set ?', obj, function(err, rows, cols) {
    if (err) throw err;
    console.log("database insertion ok= %j", obj);
  });
}
*/
function doit() {
        obj = {};
        obj.gocome = Math.round(Math.random()) * 2 - 1;//0~1

        var query = connection.query('insert into K set ?', obj, function(err, rows, cols) {
                if (err) throw err;
                console.log("database insertion ok= %j", obj);
        });

        console.log(`i=${i}`)
        if (i++ > 10) return
        //setTimeout(doit, 2000)//2 sec
        //setTimeout(doit, Math.random() * 1000);//0~1 sec
        setTimeout(doit, Math.random() * 10000);//0~10 sec
}
//doit()

app.get('/', function(req, res) {
  doit();
  res.end('Loyola Library......Nice to meet you');
});

/*
app.get('/log', function(req, res) {
  r = req.query;
  console.log("GET %j", r);

  insert_sensor(r.device, r.unit, r.type, r.value, r.seq, req.connection.remoteAddress);
  res.end('OK:' + JSON.stringify(req.query));
});
*/

var server = app.listen(8080, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('listening at http://%s:%s', host, port)
});
