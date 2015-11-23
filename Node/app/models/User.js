/**
 * Created by Colin on 11/22/2015.
 */
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name : String,
    channels : [mongoose.Schema.Types.ObjectId],
    transport : String
});

var User = mongoose.model('User', UserSchema);

module.exports = {
    User : User
};