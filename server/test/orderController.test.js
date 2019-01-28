const orderController = require('../order/orderController');

test('view_orders', (done) => {
    orderController.view_orders((data) => {
        // console.log(data);
        expect(data.orders).toHaveLength(2);
        done();
    })
});


test('view_order', (done) => {
    orderController.view_order('od1', (data) => {
        // console.log(data);
        expect(data.order.id).toBe('od1');
        done();
    })
});

test('view_order', (done) => {
    orderController.view_order('od6', (data) => {
        console.log(data);
        expect(data.success).toBe(false);
        expect(data.message).toBe('order not found');
        done();
    })
});

test('save_order - update order', (done) => {
    orderController.view_order('od1', (data) => {
        // console.log(data);
        expect(data.order.id).toBe('od1');
        orderController.save_order(data.order, (data) => {
            // console.log(data);
            expect(data.value).toBe(1);
            done();
        })
    })

});

test('save_order - new order', (done) => {
    let order = { id: 'od3', customer: 'abc', state:'closed',items: {1:1, 2:1,3:3} };
    orderController.save_order(order, (data) => {
        // console.log(data);
        expect(data.value).toBe(0);
        done();
    })

});


// test('save_order', (done) => {

//     // console.log(data);
//     let order = {}
//     orderController.save_order(order, (data) => {
//         console.log(data);
//         expect(data.value).toBe(0);
//         expect(data.success).toBe(false);
//         done();
//     })

// });