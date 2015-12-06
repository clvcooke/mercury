const PORT = 3000;

/***********************************************************
 Modules
 ************************************************************/

var express = require('express');
var app = express();
var ejs = require('ejs');
var request = require('request');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


/***********************************************************
 Configuration
 ************************************************************/
mongoose.connect('mongodb://159.203.31.35:27017/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('Connected to Mongo');
});

app.engine('html', ejs.renderFile);
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json({
    extended: true
}));
//app.use(express.static(__dirname + "/bower_components"));

// Private configuration
var privateConfig = require('./config.js')();

/***********************************************************
 App Startup
 ************************************************************/
require('./app/routes/pageRoutes')(app);
require('./app/routes/userRoutes')(app);
require('./app/routes/locationRoutes')(app, request, privateConfig);
require('./app/routes/meetingRoutes')(app);

var server = app.listen(PORT, function () {
    console.log("Server started successfully on port " + PORT + ".");
});


