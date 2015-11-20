// server.js

//modules ====================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//config =====================================

//config file
var db = require('./config/db');

//setting the port. if process.env.PORT is not set use 8080
var port  = process.env.PORT || 8080;


//used to get the date out of post requests
app.use(bodyParser.json());

//stuff I don't quite get yet, so leaving it commented
//
//parse application/vnd.api+json as json
//app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
//
//parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: true })); 
//

//override witht the X-HTTP-Method-Override header in the request to simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

//set the static files location /public.img will act as /img to any users
app.use(express.static(__dirname + '/public'));


//routes ====================================
require('./app/routes')(app); //configure the routes for this app

//start app ================================
// list at the port we saved up above (8080 unless otherwise set)
app.listen(port);

console.log('server started on port ' + port);

//expose app
exports = module.exports = app;
