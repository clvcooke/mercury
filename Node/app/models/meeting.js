/**
 * Created by Colin on 11/22/2015.
 */
var mongoose = require('mongoose');

var MeetingSchema = new mongoose.Schema({
    title : String,
    type: String,
    location : [String],
    time : Number,
    users : [mongoose.Schema.Types.ObjectId]
});

var Meeting = mongoose.model('Meeting', MeetingSchema);

module.exports = {
    Meeting : Meeting
}