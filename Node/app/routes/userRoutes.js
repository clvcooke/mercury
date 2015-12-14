//Configure express routing
var User = require('./../models/User').User;
module.exports = function(app) {

    //get a user
    app.get('/api/user/:userId',function(req, res) {
        var userId = req.params.userId;
        User.find({_id: userId}).exec(function (err, user) {
            if (err) {
                console.log("ERR: " + err);
                res.send("Failure", 403);
            } else {
                res.json(user);
            }
        });
    });

    //add a user
    app.post('/api/user/', function(req, res) {
        var user = new User();
        user.save(function(err, document) {
            if (err) {
                console.log("ERR: " + err);
                res.send("Failure", 403);
            } else {
                res.send(document._id, 200);
            }
        });
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
            User.findOne({_id:userId}).exec(function (err, user) {
                if (err || !user) {
                    console.log("ERR: " + err);
                    res.send("Failure:",403);
                }else{
                    var newLocation = user.locations;
                    if (!newLocation) newLocation = {};
                    newLocation[req.body.meeting_id] = req.body.location;
                    User.findOneAndUpdate({_id:userId}, {locations: newLocation}, callback);
                }
            });
        }else{
            callback(new Error());
        }
    });

};