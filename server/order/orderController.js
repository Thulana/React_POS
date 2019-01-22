var Datastore = require('../util/db');

module.exports = {
    view_orders: function (req,res) {
        Datastore.orders.find({}, function (err, docs) {
            if (err) reject(err);
            // resolve(docs);
            console.log(docs);
            res.send({ orders: docs });
        });
    },

    view_order: function (req,res) {
        var oid = req.body.oid;
        var orderDetail;
        var itemArray = [];
        var increment = 0;
        // console.log(req);
        Datastore.orders.findOne({ id: oid }, function (err, docs) {
            if (err) reject(err);
            orderDetail = docs;
            // console.log(orderDetail.items);
            for (let key in orderDetail.items) {
                Datastore.items.findOne({ id: parseInt(key) }, function (err, itemFound) {
                    if (err) reject(err);
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
                console.log('Time to return data');
                console.log(docs);
                res.send({ order: orderDetail, items: itemArray, itemList:docs });
            });
            
        };
    },
    save_order: function (req,res) {
       console.log("save working",req.body.order);
       Datastore.orders.update({ _id: req.body.order['_id'] }, { $set: { items: req.body.order['items'] } }, { multi: false }, function (err, numReplaced) {
        // numReplaced = 1
        // The doc #3 has been replaced by { _id: 'id3', planet: 'Pluton' }
        // Note that the _id is kept unchanged, and the document has been replaced
        // (the 'system' and inhabited fields are not here anymore)
        console.log(err,numReplaced);
      });
      Datastore.orders.persistence.compactDatafile();
      
    }


}