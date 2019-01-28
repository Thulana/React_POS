const itemController = require('../item/itemController');

test('get items - success', (done) => {
    itemController.get_items((data) => {
        // console.log(data);
        expect(data.items).toHaveLength(3);
        done();
    })
});


