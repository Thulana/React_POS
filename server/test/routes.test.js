const app = require('../app')
const request = require('supertest')(app);

// describe('api login', () => {
//     it('login to the system', () => {
//         let data = { username: 'admin', password: 'admin' };
//         request
//             .post('/api/login')
//             .send(data)
//             .expect({ message: 'Authentication successful!' });
//     });
// });

describe('api login', () => {
    it('login to the system', () => {
        let data = { username: 'admin', password: 'admin' };
        request.post('/api/login').send(data).expect(200);
        
    });
});


describe('api/orders', () => {
    it('get all orders of the system', () => {
        request
            .post('/api/view_orders')
            .expect(403);
    });
});

describe('api/order', () => {
    it('get all orders of the system', () => {
        request
            .post('/api/view_order')
            .expect(403);
    });
});