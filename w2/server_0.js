const express = require('express')
const app = express();
const port = 3000;
app.use(express.json())

app.get('/', function(req, res){
	console.log(req.query.value1);
	res.send(req.query.value1);
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})