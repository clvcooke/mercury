//Configure express routing
var User = require('./../models/User').User;
module.exports = function (app) {

    var saveCallback = function (err) {
        if (err) {
            console.log("ERR: " + err);
            res.send("Failure:", 403);
        } else {
            res.send("Success", 200);
        }
    };

    //get a user
    app.get('/api/user/:userId', function (req, res) {
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
    app.post('/api/user/', function (req, res) {
        var user = new User();
        user.save(function (err, document) {
            if (err) {
                console.log("ERR: " + err);
                res.send("Failure", 403);
            } else {
                res.send(document._id, 200);
            }
        });
    });

    //update a user
    app.patch('/api/user/:userId', function (req, res) {
        var userId = req.params.userId;
        var callback = function (err) {
            if (err) {
                console.log("ERR: " + err);
                res.send("Failure:", 403);
            } else {
                res.send("Success", 200);
            }
        };


        if (req.body.location && req.body.meeting_id) {
            User.findOne({_id: userId}).exec(function (err, user) {
                if (err || !user) {
                    console.log("ERR: " + err);
                    res.send("Failure:", 403);
                } else {
                    var newLocation = user.locations;
                    if (!newLocation) newLocation = {};
                    newLocation[req.body.meeting_id] = req.body.location;
                    User.findOneAndUpdate({_id: userId}, {locations: newLocation}, saveCallback);
                }
            });
        } else {
            callback(new Error());
        }
    });


    /**
     * userId = user who needs to be added
     */
    app.put('/api/user/addAnon/:userId', function (req, res) {
            //the user id which the anon user is being added to
            var userId = req.params.userId;
            var body = req.body;
            if (body && userId) {
                var success = false;
                //get the user document
                User.findOne({_id: userId}).lean().exec(function (err, user) {
                    //TODO clean up this validation
                    //if the user doesn't have a location we are in deep shit
                    var locations = user.locations;
                    if (locations) {
                        //parse the locations for the meeting we want
                        var meetingId = body.meetingId;
                        if (meetingId) {
                            var meetingLocations = locations[meetingId];
                            //assuming meetinglocations are a JSON object
                            var name = body.name;
                            var location = body.location;
                            if (name && location) {
                                meetingLocations.push({name: location});
                                User.findOneAndUpdate({_id: userId}, {"locations": meetingLocations}, function (err) {
                                    if (!err) {
                                        success = true;
                                    }
                                });

                            }
                        }
                    }


                    console.log(user);

                }).then(function () {
                        if (success) {
                            res.send("Success", 200);
                        } else {
                            res.send("Failure", 403);
                        }
                    }
                );

                //extract parameters
                var meetingId = body.meetingId;
                var anonUserName = body.name;
                var anonLocation = body.location;

                //validate the params and save them to mongo1

            } else {
                res.send("Failure:", 403);
            }
        }
    );

};