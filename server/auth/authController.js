var Datastore = require('../util/db');
let jwt = require('jsonwebtoken');
let config = require('../util/config');

module.exports = {
    login: function (req, res) {
        // console.log(req.body);
        var password = req.body.password
        var username = req.body.username
        Datastore.users.findOne({ name: username }, function (err, doc) {
            // console.log(doc);
            // console.log(err);
            console.log('Found user:', doc);
            if (username && password) {
                if (doc.password == password) {
                    let token = jwt.sign({ username: username },
                        config.secret,
                        {
                            expiresIn: '24h' // expires in 24 hours
                        }
                    );
                    // return the JWT token for the future API calls
                    res.json({
                        success: true,
                        message: 'Authentication successful!',
                        token: token
                    });
                } else {
                    res.send(403).json({
                        success: false,
                        message: 'Incorrect username or password'
                    });
                }
            } else {
                res.send(400).json({
                    success: false,
                    message: 'Authentication failed! Please check the request'
                });
            }
        });
    },
    // getMovies: function (req, res) {
    //     //do something
    // },
    // postMovie: function (req, res) {
    //     //do something
    // }
}
