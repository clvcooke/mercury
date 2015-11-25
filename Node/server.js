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
// Allows you to parse body messages
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//grabbing the schemas
var User = require("./app/models/user").User;
var Meeting = require("./app/models/meeting").Meeting;

// Private configuration
var privateConfig = require('./config.js')();


/*************************************
 * Setting up endpoints
 **************************************/

app.get('/findUser', function (req, res) {
    if (req.query && req.query.name) {

        User.find({name: req.query.name}).exec(callback);
    }
});

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

app.get('/createUser', function (req, res) {
    if (req.query && req.query.name) {

        var name = req.query.name;
        var transport = req.query.transport;
        var channels = req.query.channels;
        var callback = function(err) {
            if (err){
                console.log("ERR: " + err);
                res.send("Failure", 403);
            }else{
                res.send("Success",200);
            }
        };

        var user = new User({name : name, transport : transport, channels : channels});
        user.save(callback);
    } else {
        res.send("Invalid - need name", 406);
    }

});


/***********************************************************
 App Startup
 ************************************************************/
require('./app/pageRoutes')(app);
require('./app/userRoutes')(app);

var server = app.listen(PORT, function () {
    console.log("Server started successfully on port " + PORT + ".");
});


