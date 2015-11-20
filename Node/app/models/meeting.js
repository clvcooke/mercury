//grab the mongoose module
var mongoose = require('mongoose');

//define the meeting model
// module.exportsallows the passing of the to other files when its called
module.exports = mongoose.model('Meeting', {
	name : {type : String, default: ''}
});
