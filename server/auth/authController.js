var Datastore = require('../util/db');
let jwt = require('jsonwebtoken');
let config = require('../util/config');

module.exports = {
    login: function (username,password, cb) {
        // console.log(req.body);
        var password = password
        var username = username
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
                    cb({
                        success: true,
                        message: 'Authentication successful!',
                        token: token
                    });
                } else {
                    cb({
                        success: false,
                        message: 'Incorrect username or password'
                    });
                }
            } else {
                cb({
                    success: false,
                    message: 'Authentication failed! Please check the request'
                });
            }
        });
    },
    
}
