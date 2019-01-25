const itemController = require('../item/itemController');

test('view_orders', (done) => {
    itemController.get_items((data) => {
        // console.log(data);
        expect(data.items).toHaveLength(3);
        done();
    })
});

