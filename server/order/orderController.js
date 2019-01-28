var Datastore = require('../util/db');

module.exports = {
    view_orders: function (cb) {
        Datastore.orders.find({ state: 'open' }, function (err, docs) {
            if (err) {
                return cb({
                    success: false,
                    message: err
                });
            };
            cb({ orders: docs });
        });
    },

    view_order: function (oid, cb) {
        var oid = oid;
        var orderDetail;
        var itemArray = [];
        var increment = 0;
        // console.log(req);
        Datastore.orders.findOne({ id: oid }, function (err, docs) {
            if (err) {
                cb({
                    success: false,
                    message: err
                });
            };
            if (docs) {
                orderDetail = docs;
                for (let key in orderDetail.items) {
                    Datastore.items.findOne({ id: parseInt(key) }, function (err, itemFound) {
                        if (err) {
                            cb({
                                success: false,
                                message: err
                            });
                        };

                        itemArray.push(itemFound);
                        if (increment + 1 == Object.keys(orderDetail.items).length) {
                            send_data();
                        }
                        increment += 1;
                    });
                }
            }else{
                cb({
                    success: false,
                    message: "order not found"
                });
            }

        });
        function send_data() {
            Datastore.items.find({}, function (err, docs) {
                if (err) {
                    cb({
                        success: false,
                        message: err
                    });
                };
                // console.log('Time to return data');
                // console.log(docs);
                cb({ order: orderDetail, items: itemArray, itemList: docs });
            });

        };
    },
    save_order: function (order, cb) {
        console.log("save working", order);
        Datastore.orders.findOne({ id: order['id'] }, function (err, doc) {
            if (err) {
                cb({
                    success: false,
                    message: err
                });
            };
            console.log(order['_id']);
            if (doc) {
                Datastore.orders.update({ id: order['id'] }, order, {}, function (err, numReplaced) {
                    if (err) {
                        cb({
                            success: false,
                            message: err
                        });
                    };
                    cb({ value: numReplaced })
                    console.log("order edited", numReplaced);
                });
            } 
            // else if (order['_id']) {
            //     Datastore.orders.update({ _id: order['_id'] }, order, {}, function (err, numReplaced) {
            //         if (err) {
            //             cb({
            //                 success: false,
            //                 message: err
            //             });
            //         };
            //         cb({ value: numReplaced })
            //         // console.log("order edited",numReplaced);
            //     });
            // }
             else {
                Datastore.orders.insert(order, function (err, newDoc) {   // Callback is optional
                    if (err) {
                        cb({
                            success: false,
                            message: err
                        });
                    };
                    cb({ value: 0 })
                    // console.log('New order added',err,newDoc);
                });
            }
        });
        Datastore.orders.persistence.compactDatafile();

    }


}