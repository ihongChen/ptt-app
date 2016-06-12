var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

app.use(function(req, res, next) {
  res.contentType('application/json');
  next();
});


//載入MySQL模組
var mysql = require('mysql');
//建立連線
global.pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'ihongchen.ctbx4pq8or72.us-west-2.rds.amazonaws.com',
  port            : '3306',
  user            : 'ehome4829',
  password        : 'a126234829',
  database        : 'ptt_db'
});

//api rount
var article = require('./route/article');

app.get('/', function (req, res) {
  res.send('Hello World!');
});

// GET方法的路由，處理「/article」路徑
app.get('/article', article.getList);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});