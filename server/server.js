const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const storage = require('node-persist');
let jwt = require('jsonwebtoken');
let config = require('./util/config');
let middleware = require('./util/middleware');

const port = process.env.PORT || 5000;

var Datastore = require('nedb');
var users = new Datastore({ filename: './db/users.db', autoload: true });
var orders = new Datastore({ filename: './db/orders.db', autoload: true });
var items = new Datastore({ filename: './db/items.db', autoload: true });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/view_orders', middleware.checkToken, (req, res) => {
  orders.find({}, function (err, docs) {
    if (err) reject(err);
    // resolve(docs);
    console.log(docs);
    res.send({ orders: docs });
  });

});

app.post('/api/view_order', middleware.checkToken, (req, res) => {
  var oid = req.body.oid;
  var orderDetail;
  var itemArray = [];
  var increment = 0;
  // console.log(req);
  orders.findOne({ id: oid }, function (err, docs) {
    if (err) reject(err);
    orderDetail = docs;
    for (let key in orderDetail.items) {
      items.findOne({ id: orderDetail.items[key] }, function (err, itemFound) {
        if (err) reject(err);
        itemArray.push(itemFound);
        console.log(parseInt(key) + 1, orderDetail.items.length);
        if (increment + 1 == orderDetail.items.length) {
          send_data();
        }
        increment+=1;
      });
    }
    console.log(orderDetail, itemArray);
  });
  function send_data() {
    console.log('Time to return data');
    res.send({ order: orderDetail, items: itemArray });
  };

});


app.post('/api/login', (req, res) => {
  // console.log(req.body);
  var password = req.body.password
  var username = req.body.username
  users.findOne({ name: username }, function (err, doc) {

    console.log('Found user:', doc.name);
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
});



app.listen(port, () => console.log(`Listening on port ${port}`));