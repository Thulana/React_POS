const app = require('../app')
const request = require('supertest')(app);

describe('api login', () => {
    it('login to the system', async () => {
        let data = { username: 'admin', password: 'admin' };
        request
            .post('/api/login')
            .send(data)
            .expect({ message: 'Authentication successful!' });
    });
});

describe('api/orders', () => {
    it('get all orders of the system', async () => {
        request
            .get('/api/view_orders')
            .expect({ message: 'Auth token is not supplied' });
    });
});