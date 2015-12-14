/**
 * Created by Colin on 11/22/2015.
 */
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name : String,
    channels : [String],
    transport : String,
    locations : mongoose.Schema.Types.Mixed
});

var User = mongoose.model('User', UserSchema);

module.exports = {
    User : User
};

/*

user document example:

{
    name: 'Colin Cooke',
    channels: [eAezQw5m7dM:APA91bFg6eROiSWarz6TFsSxZ4ghuPIlpeS7ssiGaEj1zBVA8ZEBfYbB_WQXnYbra5WGbodOK3JKKRJxLR33LV-x1gEcsMmkljCzfCQTczjyrQUQVMp1_BbiGpaEsHnqkWn4_KVQj4e0],
    transport: 'Walking',
    locations: { '566df5b1715e8a34086dbf0d' : '24 Mary Hill Cr',
                  'meeting object id' : String address
    }
}


 */