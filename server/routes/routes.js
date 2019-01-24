const controller = require('../auth/authController')
var express = require('express')
var router = express.Router()
let config = require('../util/config');
let middleware = require('../util/middleware');
const authController = require('../auth/authController')
const orderController = require('../order/orderController');
const itemController = require('../item/itemController');

module.exports.setup = function (app) {
  //Middle ware that is specific to this router
  app.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
  });

      /**
     * @swagger
     * /api/get_items:
     *   post:
     *     description: Fetch all the items in the system
     *     tags: [Orders]
     *     parameters:
     *       - name: auth token
     *         description: jwt auth token
     *         in: json
     *         required: true
     *         type: string
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Items found
     *       400:
     *         description: Error occured
     */

    app.get('/api/get_items', middleware.checkToken, (req, res) => {
      itemController.get_items(req, res);
  
    });
      /**
     * @swagger
     * /api/view_orders:
     *   post:
     *     description: Fetch all the open orders in the system
     *     tags: [Orders]
     *     parameters:
     *       - name: auth token
     *         description: jwt auth token
     *         in: json
     *         required: true
     *         type: string
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Orders found
     *       400:
     *         description: Error occured
     */

  app.get('/api/view_orders', middleware.checkToken, (req, res) => {
    orderController.view_orders(req, res);

  });

    /**
     * @swagger
     * /api/view_order:
     *   post:
     *     description: Fetch all the details of a given order
     *     tags: [Orders]
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: auth token
     *         description: jwt auth token
     *         in: json
     *         required: true
     *         type: string
     *       - name: oid
     *         description: Order Id
     *         in: json
     *         required: true
     *         type: number
     *     responses:
     *       200:
     *         description: Order found
     *       400:
     *         description: Order not found
     */
  app.post('/api/view_order', middleware.checkToken, (req, res) => {
    orderController.view_order(req, res);

  });

   /**
     * @swagger
     * /api/save_order:
     *   post:
     *     description: Save order to the database
     *     tags: [Orders]
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: auth token
     *         description: jwt auth token
     *         in: json
     *         required: true
     *         type: string
     *       - name: order
     *         description: Order object
     *         in: json
     *         required: true
     *         type: object
     *     responses:
     *       200:
     *         description: order saved successfully
     *       400:
     *         description: Order not saved properly
     */
  app.post('/api/save_order', middleware.checkToken, (req, res) => {
    orderController.save_order(req, res);

  });
  /**
     * @swagger
     * /api/login:
     *   post:
     *     description: Login to the application1
     *     tags: [Users]
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: username
     *         description: User's username.
     *         in: formData
     *         required: true
     *         type: string
     *       - name: password
     *         description: User's password.
     *         in: formData
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: login successful 
     *       403:
     *         description: Incorrect username or password
     *       400:
     *         description: Authentication failed!
     *      
     */
  app.post('/api/login', (req, res) => {
    authController.login(req, res);
  });
}


// module.exports = router;