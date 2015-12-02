module.exports = function(app) {
    app.post('/locator', function (req, res) {
        var requestString = req.body.request;
        var key = '&key=' + privateConfig.API_KEY;
        request(requestString + key, function (error, response, body) {
            if (!error && response.statusCode / 100 !== 4) {
                console.log(body)
            }
        });
        res.send(200);
    });
};