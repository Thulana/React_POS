const app = require('./app')
const serverListen = require('./util/serverListen');

const port = process.env.PORT || 5000;

app.listen(port, serverListen(console.log,port));