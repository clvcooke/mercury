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
        if (meetingId){
            res.render('../public/views/meeting.html');
        }else{
            //show an error page
        }
    });

};