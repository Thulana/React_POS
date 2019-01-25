const authController = require('../auth/authController');

test('login success', (done) => {
    authController.login('tk','tk',(data) => {
        // console.log(data);
        expect(data.success).toBe(true);
        done();
    })
});

test('login fail', (done) => {
    authController.login('tk','tk1',(data) => {
        // console.log(data);
        expect(data.success).toBe(false);
        done();
    })
});

