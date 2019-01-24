const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes/routes');
// const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swaggerDoc');
// //  Connect all our routes to our application


// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
// app.use('/', routes);
swaggerDocument(app);
routes.setup(app);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
module.exports = app

// app.listen(port, serverListen(console.log,port));