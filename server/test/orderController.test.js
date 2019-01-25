const orderController = require('../order/orderController');

test('view_orders', (done) => {
    orderController.view_orders((data) => {
        // console.log(data);
        expect(data.orders).toHaveLength(3);
        done();
    })
});


test('view_order', (done) => {
    orderController.view_order('od1',(data) => {
        // console.log(data);
        expect(data.order.id).toBe('od1');
        done();
    })
});

test('save_order', (done) => {
    orderController.view_order('od1',(data) => {
        // console.log(data);
        expect(data.order.id).toBe('od1');
        orderController.save_order(data.order,(data) => {
            // console.log(data);
            expect(data.value).toBe(1);
            done();
        })
    })
    
});