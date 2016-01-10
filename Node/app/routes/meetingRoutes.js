var Meeting = require('./../models/meeting').Meeting;
var fs = require('fs');
var crypto = require('crypto');
var path = require('path');

module.exports = function (app) {

    //get an existing meeting
    app.get('/api/meeting/:meetingId', function (req, res) {
        var meetingId = req.params.meetingId;
        Meeting.findOne({_id: meetingId}).lean().exec(function (err, meeting) {
            if (err) {
                console.log("ERR: " + err);
                res.send("Failure: " + err, 403);
            } else {
                //check if this is OK?
                res.json(meeting);
            }
        });
    });

    //update a meeting
    app.put('/api/meeting/:meetingId', function (req, res) {
        var meetingId = req.params.meetingId;
        var object = {};
        var body = req.body;
        if (body) {
            if (body.time) object[time] = body.time;
            if (body.location) object[location] = JSON.parse(body.location);
            if (body.users) object[users] = JSON.parse(body.users);
            if (body.subject) object[subject] = body.subject;
        }
        Meeting.findOneAndUpdate({_id: meetingId}, object, function (err) {
            if (err) {
                console.log("ERR: " + err);
                res.send("Failure:", 403);
            } else {
                res.send("Success", 200);
            }
        });
    });

    //create a new meeting(sends back meeting id)
    app.post('/api/meeting', function (req, res) {
        var callback = function (err, document) {
            if (err) {
                console.log("ERR: " + err);
                res.send("Failure: " + err, 403);
            } else {
                res.send(document._id, 200);
            }
        };
        var body = req.body;
        if (body && body.title && body.type && body.location && body.time ) {
            var meeting = new Meeting({
                title: body.title,
                type: body.type,
                location: body.location,
                time: body.time,
                users: body.users
            });
            meeting.save(callback);
        } else {
            callback(new Error("Missing parameter"), null);
        }
    });

};
