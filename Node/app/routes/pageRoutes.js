var http = require('http');

//Configure express routing
module.exports = function(app)
{
	//When root of server is accessed, directs to index.html
	app.get('/', function(req, res){
		res.render("../public/index.html");
	});

    app.get('/meeting/:meetingId', function(req, res){
        var meetingId = req.params.meetingId;

		//http request to get the mongo object
		var option = {
            host: 'localhost',
            port: 3000,
			path: '/api/meeting/' + meetingId
		};

		var callback = function(response){
            response.setEncoding('utf8');
            response.on('data', function (res2) {
               console.log("SDF");
            });



		};

		http.request(option, callback).end();

    });

};