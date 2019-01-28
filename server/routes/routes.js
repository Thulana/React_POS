const controller = require('../auth/authController')
var express = require('express')
// sg = require('../util/config');
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
 *   get:
 *     description: Fetch all the items in the system
 *     security:
 *       - JWT: [] 
 *     tags: [Items]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Items found
 *       400:
 *         description: Error occured
 */

  app.get('/api/get_items', middleware.checkToken, (req, res) => {
    itemController.get_items((data)=>{
      res.jsonp(data);
    });

  });
  /**
 * @swagger
 * /api/view_orders:
 *   get:
 *     description: Fetch all the open orders in the system
 *     tags: [Orders]
 *     security:
 *       - JWT: [] 
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Orders found
 *       400:
 *         description: Error occured
 */

  app.get('/api/view_orders', middleware.checkToken, (req, res) => {
    orderController.view_orders((data) => {
      res.jsonp(data);
    });

      // console.log(data);
      // if ('err' in data) {
      //   res.send(400).json({
      //     success: false,
      //     message: data.err
      //   });
      // };
      // // console.log(docs);
      // res.send({ orders: data.result });
  });

  /**
   * @swagger
   * /api/view_order:
   *   post:
   *     description: Fetch all the details of a given order
   *     tags: [Orders]
   *     security:
 *       - JWT: [] 
   *     produces:
   *       - application/json
   *     parameters:
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
    orderController.view_order(req.body.oid, (data)=>{
      res.jsonp(data);
    });

  });

  /**
    * @swagger
    * /api/save_order:
    *   post:
    *     description: Save order to the database
    *     tags: [Orders]
    *     security:
 *       - JWT: [] 
    *     produces:
    *       - application/json
    *     parameters:
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
    orderController.save_order(req.body.order, (res)=>{
      console.log('saved');
    });

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
    authController.login(req.body.username,req.body.password, (data)=>{
      res.jsonp(data);
    });
  });
}


// module.exports = router;