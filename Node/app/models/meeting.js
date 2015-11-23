/**
 * Created by Colin on 11/22/2015.
 */
var mongoose = require('mongoose');

var MeetingSchema = new mongoose.Schema({
    time : Number,
    location : [Number],
    user : mongoose.Schema.Types.ObjectId,
    subject : String
});

var Meeting = mongoose.model('Meeting', MeetingSchema);

module.exports = {
    Meeting : Meeting
}