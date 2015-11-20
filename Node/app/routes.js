//get the meeting model
var Meeting = require('./models/meeting');

module.exports = function(app) {

	//server routes ================================

	app.get('/api/meetings', function(req, res) {
	//get all the meetings in the database
		Meeting.find(function (err, meetings) {
			//if we have an error, send it as the response
			if (err) {
				res.send(err);
			}else{
				res.json(meetings); //return all the meetings in json format
			}
		});

	});


	//post and delete stuff here

	//frontend routes =============================
	//route to handle all the angular requests
	app.get('*', function(req, res) {
		res.sendFile('./public/views/index.html'); //send the only page we have
	});

};
