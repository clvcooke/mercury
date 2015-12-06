var Meeting = require('./../models/Meeting').Meeting;
module.exports = function (app) {

    //get an existing meeting
    app.get('/API/meeting/*', function (req, res) {
        var meetingId = req.params[0];
        var callback = function (err, meeting) {
            if (err) {
                console.log("ERR: " + err);
                res.send("Failure: " + err, 403);
            } else {
                res.json(meeting);
            }
        };
        Meeting.find({_id: meetingId}).exec(callback);
    });

    //update a meeting
    app.post('/API/meeting/*', function(req, res){
        var meetingId = req.params[0];
        var callback = function(err) {
            if (err) {
                console.log("ERR: " + err);
                res.send("Failure:",403);
            }else{
                res.send("Success",200);
            }
        };
        var object = {};
        var body = req.body;
        if (body){
            if (body.time) object[time] = body.time;
            if (body.location) object[location] = JSON.parse(body.location);
            if (body.users) object[users] = JSON.parse(body.users);
            if (body.subject) object[subject] = body.subject;
        }
        Meeting.findOneAndUpdate({_id:meetingId}, object, callback);
    });

    //create a new meeting(sends back meeting id)
    app.put('/API/meeting/*', function (req, res) {
        var callback = function (err, document) {
            if (err) {
                console.log("ERR: " + err);
                res.send("Failure: " + err, 403);
            }else{
                res.send(document._id, 200);
            }
        };
        var body = req.body;
        //array of users
        var users;
        var subject;
        //lat lng pair
        var location;
        var time;
        if (body){
            users = JSON.parse(body.users);
            subject = body.subject;
            location = JSON.parse(body.location);
            time = body.time;
        }
        if (users && subject && location && time){
            var meeting = new Meeting({time: time, location : location, users: users, subject: subject});
            meeting.save(callback);
        }else{
            callback(new Error("Missing parameter"), null);
        }
    });
};