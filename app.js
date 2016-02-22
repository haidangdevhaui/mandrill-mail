/* Các module cần thiết */
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3000;
var xmlParser = require('express-xml');
// var mongoose = require('mongoose');
// var bson = require('bson');


// var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
// var session      = require('express-session');

// var configDB = require('./config/database.js');

/*Cấu hình DB*/
// mongoose.connect(configDB.url); /* kết nối tới Mongodb */

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); /* Sử dụng ejs làm template */


/* Cấu hình đường dẫn tuyệt đối cho các thư viện khác  */
app.use('/js',express.static(__dirname + '/public/js'));
app.use('/css',express.static(__dirname + '/public/css'));
app.use('/images',express.static(__dirname + '/public/images'));
app.use('/fonts',express.static(__dirname + '/public/fonts'));

/* Router điều hướng Apps. */
require('./route/rss.js')(app); 
require('./route/mail.js')(app);



app.use(xmlParser);

/* Chạy server */
app.listen(port);
console.log("Welcome to Haidangdev's Apps. happens on port " + port);
