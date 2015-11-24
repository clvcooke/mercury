//Configure express routing
var User = require('./models/user').User;
module.exports = function(app) {

    app.get('/user/*',function(req, res){
        var username = req.originalUrl.substring(6);
        var callback = function (err, user) {
            if (err) {
                console.log("ERR: " + err);
                res.send("Failure", 403);
            }else {
                res.json(user);
            }
        };
        User.find({name: username}).exec(callback);
    });

    app.post('/user/*', function(req, res){

    });

    app.put('/user/*',function(req, res){
        var username = req.originalUrl.substring(6);
        var callback = function(err) {
            if (err){
                console.log("ERR: " + err);
                res.send("Failure", 403);
            }else{
                res.send("Success",200);
            }
        };
        var user = new User({name: username, transport : "test"});
        user.save(callback);
    });
};