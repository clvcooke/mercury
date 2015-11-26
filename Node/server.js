const PORT = 3000;

/***********************************************************
 Modules
 ************************************************************/

var express = require('express');
var bodyParser = require('body-parser');
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

//grabbing the schemas
var User = require("./app/models/user").User;
var Meeting = require("./app/models/meeting").Meeting;

// Private configuration
var privateConfig = require('./config.js')();


/*************************************
 * Setting up endpoints
 **************************************/


app.post('/locator', function(req, res) {
    var requestString = req.body.request;
    var key = '&key=' + privateConfig.API_KEY;
    request(requestString + key, function (error, response, body) {
      if (!error && response.statusCode/100 !== 4) {
        console.log(body)
      }
    })
    res.send(200);
});




/***********************************************************
 App Startup
 ************************************************************/
require('./app/pageRoutes')(app);
require('./app/userRoutes')(app);

var server = app.listen(PORT, function () {
    console.log("Server started successfully on port " + PORT + ".");
});


