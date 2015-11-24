//Configure express routing
module.exports = function(app)
{
	//When root of server is accessed, directs to index.html
	app.get('/', function(req, res){
		res.render("../public/index.html");
	});

    app.get('/meetings/*', function(req, res){

    });

};