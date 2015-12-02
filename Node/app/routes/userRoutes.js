//Configure express routing
var User = require('./../models/User').User;
module.exports = function(app) {

    //get a user
    app.get('/API/user/*',function(req, res){
        var userId = req.params[0];
        var callback = function (err, user) {
            if (err) {
                console.log("ERR: " + err);
                res.send("Failure", 403);
            }else {
                res.json(user);
            }
        };
        User.find({_id: userId}).exec(callback);
    });


    /**
     * @api {post} /user/:id update user info
     * @apiName updateUser
     * @apiGroup user
     *
     * @apiParam {String} user id
     */

    app.post('/API/user/*', function(req, res){
        var userId = req.params[0];
        var callback = function(err) {
            if (err) {
                console.log("ERR: " + err);
                res.send("Failure:",403);
            }else{
                res.send("Success",200);
            }
        };
        User.findOneAndUpdate({_id:userId},{name: req.body.name}, callback);
    });


    //add a user
    app.put('/API/user/*',function(req, res){
        var username = req.params[0];
        var callback = function(err, document) {
            if (err){
                console.log("ERR: " + err);
                res.send("Failure", 403);
            }else{
                res.send(document._id, 200);
            }
        };
        var user = new User({name: username, transport : "test"});
        user.save(callback);
    });
};