var Datastore = require('../util/db');

module.exports = {
    get_items: function(cb){
        let items = [];
        Datastore.items.find({},function(err,docs){
            if (err) {
                cb({
                    success: false,
                    message: err
                });
            };
            // resolve(docs);
            console.log(docs);
            cb({ items: docs });

        });
    }

}