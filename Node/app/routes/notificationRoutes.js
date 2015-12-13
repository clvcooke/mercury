var gcm = require('node-gcm');
module.exports = function (app) {
    app.post('/notify/*', function (req, res) {
        var regTokens = [req.params[0]];
        var message = new gcm.Message({
            collapseKey: 'demo',
            delayWhileIdle: true,
            timeToLive: 3,
            data: {
                type: 'pong',
                message: 'Hello Android!'
            }
        });
        var sender = new gcm.Sender('AIzaSyA1RA60gaXhnqAzk_mtfirIvGSzmh_vgxE');
        message.addData('testkey', 'test value');
        sender.send(message, {registrationTokens: regTokens},4, function (err, response) {
            if (err) {
                console.error(err);
            } else {
                res.send(response);
            }
        });
    });
};