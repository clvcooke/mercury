//Configure express routing
var User = require('./../models/User').User;
module.exports = function(app) {

    //get a user
    app.get('/api/user/:userId',function(req, res) {
        var userId = req.params.userId;
        var callback = function (err, user) {
            if (err) {
                console.log("ERR: " + err);
                res.send("Failure", 403);
            } else {
                res.json(user);
            }
        };
        User.find({_id: userId}).exec(callback);
    });

    //add a user
    app.post('/api/user/', function(req, res) {
        var callback = function(err, document) {
            if (err) {
                console.log("ERR: " + err);
                res.send("Failure", 403);
            } else {
                res.send(document._id, 200);
            }
        };
        var user = new User();
        user.save(callback);
    });

    //update a user
    app.patch('/api/user/:userId', function(req, res) {
        var userId = req.params.userId;
        var callback = function(err) {
            if (err) {
                console.log("ERR: " + err);
                res.send("Failure:",403);
            } else {
                res.send("Success",200);
            }
        };


        if (req.body.location && req.body.meeting_id){
            var userCallback = function (err, user) {
                if (err || !user) {
                    console.log("ERR: " + err);
                    res.send("Failure:",403);
                }else{
                    var newLocation = user.locations;
                    newLocation[req.body.meeting_id] = req.body.location;
                    User.findOneAndUpdate({_id:userId}, {locations: newLocation}, callback);
                }
            };
            User.findOne({_id:userId}).exec(userCallback);
        }else{
            callback(new Error());
        }
    });

};