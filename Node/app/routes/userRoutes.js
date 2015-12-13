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
    app.post('/api/user/:userId', function(req, res) {
        var username = req.params.userId;
        var callback = function(err, document) {
            if (err) {
                console.log("ERR: " + err);
                res.send("Failure", 403);
            } else {
                res.send(document._id, 200);
            }
        };
        var user = new User({name: username, transport : "test"});
        user.save(callback);
    });

    //update a user
    app.put('/api/user/:userId', function(req, res) {
        var userId = req.params.userId;
        var callback = function(err) {
            if (err) {
                console.log("ERR: " + err);
                res.send("Failure:",403);
            } else {
                res.send("Success",200);
            }
        };
        User.findOneAndUpdate({_id:userId}, {name: req.body.name}, callback);
    });

};