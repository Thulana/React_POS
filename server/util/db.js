var Datastore = require('nedb');
// var users = new Datastore({ filename: '/home/thulanak/ReactJs/my-app/db/users.db', autoload: true });
// var orders = new Datastore({ filename: '/home/thulanak/ReactJs/my-app/db/orders.db', autoload: true });
// var items = new Datastore({ filename: '/home/thulanak/ReactJs/my-app/db/items.db', autoload: true });
var users = new Datastore({ filename: 'db/users.db', autoload: true });
var orders = new Datastore({ filename: 'db/orders.db', autoload: true });
var items = new Datastore({ filename: 'db/items.db', autoload: true });
module.exports = {
    users: users,
    orders: orders,
    items: items
}