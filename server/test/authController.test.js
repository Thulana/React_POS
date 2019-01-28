const authController = require('../auth/authController');

test('login success', (done) => {
    authController.login('tk','tk',(data) => {
        // console.log(data);
        expect(data.success).toBe(true);
        done();
    })
});

test('login fail - unvalid user', (done) => {
    authController.login('tk','tk1',(data) => {
        // console.log(data);
        expect(data.success).toBe(false);
        done();
    })
});

test('login fail - unvalid request', (done) => {
    authController.login('','',(data) => {
        // console.log(data);
        expect(data.success).toBe(false);
        done();
    })
});