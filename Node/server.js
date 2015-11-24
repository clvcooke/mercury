const PORT = 3000;

/***********************************************************
 Modules
 ************************************************************/

var express = require('express');
var app = express();
var ejs = require('ejs');
var mongoose = require('mongoose');


/***********************************************************
 Configuration
 ************************************************************/

mongoose.connect('mongodb://159.203.31.35:27017/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('connected to mongo');
});

app.engine('html', ejs.renderFile);
app.use(express.static(__dirname + "/public"));
//app.use(express.static(__dirname + "/bower_components"));

//grabbing the schemas
var User = require("./app/models/user").User;
var Meeting = require("./app/models/meeting").Meeting;


/*************************************
 * Setting up endpoints
 **************************************/

app.get('/findUser', function (req, res) {
    if (req.query && req.query.name) {
        var callback = function (err, user) {
            if (err) {
                console.log("ERR: " + err);
                res.send("Failure", 403);
            }else {
                res.json(user);
            }
        };
        User.find({name: req.query.name}).exec(callback);
    }
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
        }

        var user = new User({name : name, transport : transport, channels : channels});
        user.save(callback);
    } else {
        res.send("Invalid - need name", 406);
    }
});


/***********************************************************
 App Startup
 ************************************************************/
require('./app/routes')(app);

var server = app.listen(PORT, function () {
    console.log("Server started successfully on port " + PORT + ".");
});


