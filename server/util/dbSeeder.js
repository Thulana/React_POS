
const seeder = () => {
    var Datastore = require('nedb');
    var users = new Datastore({ filename: '../../db/users.db', autoload: true });
    var orders = new Datastore({ filename: '../../db/orders.db', autoload: true });
    var items = new Datastore({ filename: '../../db/items.db', autoload: true });
    userSeeder(users);
    itemSeeder(items);
    orderSeeder(orders);

};


const itemSeeder = (items) => {
    var item1 = { id: 1, name: 'sugar', price: 180, qty: 200 };
    var item2 = { id: 2, name: 'flour', price: 60, qty: 50 };
    var item3 = { id: 3, name: 'dhal', price: 120, qty: 40 };
    items.insert(item1, () => {
        console.log("item 1 added");
    });
    items.insert(item2, () => {
        console.log("item 2 added");
    });
    items.insert(item3, () => {
        console.log("item 3 added");
    });
}

const userSeeder = (users) => {
    var tk = { name: 'tk', password: 'tk' };
    var admin = { name: 'admin', password: 'admin' };
    users.insert(tk, () => {
        console.log("tk added");
    });
    users.insert(admin, () => {
        console.log("admin added");
    });

}
const orderSeeder = (orders) => {
    var order1 = { id: 'od1', customer: 'abc', state:'open',items: {1:1, 2:1} };
    var order2 = { id: 'od2', customer: 'abcd', state:'open', items: {2:2, 3:1} };
    orders.insert(order1, function (err, doc) {
        console.log('Inserted', doc.name, 'with ID', doc._id);
    });
    orders.insert(order2, function (err, doc) {
        console.log('Inserted', doc.name, 'with ID', doc._id);
    });

}

seeder();