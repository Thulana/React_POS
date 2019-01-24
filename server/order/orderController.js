var Datastore = require('../util/db');

module.exports = {
    view_orders: function (req, res) {
        Datastore.orders.find({}, function (err, docs) {
            if (err) {
                res.send(400).json({
                    success: false,
                    message: err
                });
            };
            // resolve(docs);
            console.log(docs);
            res.send({ orders: docs });
        });
    },

    view_order: function (req, res) {
        var oid = req.body.oid;
        var orderDetail;
        var itemArray = [];
        var increment = 0;
        // console.log(req);
        Datastore.orders.findOne({ id: oid }, function (err, docs) {
            if (err) {
                res.send(400).json({
                    success: false,
                    message: err
                });
            };
            orderDetail = docs;
            // console.log(orderDetail.items);
            for (let key in orderDetail.items) {
                Datastore.items.findOne({ id: parseInt(key) }, function (err, itemFound) {
                    if (err) {
                        res.send(400).json({
                            success: false,
                            message: err
                        });
                    };
                    // console.log(itemFound);
                    // console.log(orderDetail.items[key]);
                    itemArray.push(itemFound);
                    // console.log(parseInt(key) + 1, orderDetail.items.length);
                    if (increment + 1 == Object.keys(orderDetail.items).length) {
                        send_data();
                    }
                    increment += 1;
                });
            }
            // console.log(orderDetail, itemArray);
        });
        function send_data() {
            Datastore.items.find({}, function (err, docs) {
                if (err) {
                    res.send(400).json({
                        success: false,
                        message: err
                    });
                };
                console.log('Time to return data');
                console.log(docs);
                res.send({ order: orderDetail, items: itemArray, itemList: docs });
            });

        };
    },
    save_order: function (req, res) {
        console.log("save working", req.body.order);
        Datastore.orders.findOne({ id: req.body.order['id'] }, function (err, doc) {
            if (err) {
                res.send(400).json({
                    success: false,
                    message: err
                });
            };
            console.log(req.body.order['_id']);
            if (doc) {
                Datastore.orders.update({ id: req.body.order['id'] },req.body.order, {}, function (err, numReplaced) {
                    if (err) {
                        res.send(400).json({
                            success: false,
                            message: err
                        });
                    };
                    console.log("order edited",numReplaced);
                });
            } else if(req.body.order['_id']){
                Datastore.orders.update({ _id: req.body.order['_id'] }, req.body.order, {}, function (err, numReplaced) {
                    if (err) {
                        res.send(400).json({
                            success: false,
                            message: err
                        });
                    };
                    console.log("order edited",numReplaced);
                });
            }else {
                Datastore.orders.insert(req.body.order, function (err, newDoc) {   // Callback is optional
                    if (err) {
                        res.send(400).json({
                            success: false,
                            message: err
                        });
                    };
                    console.log('New order added',err,newDoc);
                });
            }
        });
        // console.log("save working", req.body.order);

        Datastore.orders.persistence.compactDatafile();

    }


}