const authController = require('../auth/authController');

test('view_orders', (done) => {
    authController.login('tk','tk',(data) => {
        // console.log(data);
        expect(data.success).toBe(true);
        done();
    })
});

