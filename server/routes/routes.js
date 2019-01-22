const controller = require('../auth/authController')
var express = require('express')
var router = express.Router()
let config = require('../util/config');
let middleware = require('../util/middleware');
const authController = require('../auth/authController')
const orderController = require('../order/orderController');

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});


router.get('/api/view_orders', middleware.checkToken, (req, res) => {
    orderController.view_orders(req,res);

});

router.post('/api/view_order', middleware.checkToken, (req, res) => {
    orderController.view_order(req,res);

});

router.post('/api/save_order', middleware.checkToken, (req, res) => {
  orderController.save_order(req,res);

});

router.post('/api/login', (req, res) => {
  authController.login(req,res);
});


module.exports = router;