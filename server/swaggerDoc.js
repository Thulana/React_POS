const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  swaggerDefinition: {
    // Like the one described here: https://swagger.io/specification/#infoObject
    info: {
      title: 'POS API',
      version: '1.0.0',
      description: 'Pos System swagger doc',
    },
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        description: 'JWT authorization of an API',
        name: 'Authorization',
        in: 'header',
      },
    },
  },
  // List of files to be processes. You can also set globs './routes/*.js'
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(specs);
      });
      
}