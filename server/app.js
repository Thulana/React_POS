const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes/routes');
const serverListen = require('./util/serverListen');
// //  Connect all our routes to our application

const port = process.env.PORT || 5000;

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use('/', routes);

module.exports = app

// app.listen(port, serverListen(console.log,port));