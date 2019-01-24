var Datastore = require('../util/db');

module.exports = {
    get_items: function(req,res){
        let items = [];
        Datastore.items.find({},function(err,docs){
            if (err) {
                res.send(400).json({
                    success: false,
                    message: err
                });
            };
            // resolve(docs);
            console.log(docs);
            res.send({ items: docs });

        });
    }

}