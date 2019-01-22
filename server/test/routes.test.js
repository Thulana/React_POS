const app = require('../app')
const request = require('supertest')(app);

describe('api login', function () {
    it('login to the system', function (done) {
        let data = { username:'admin',password:'admin'};
        request
            .post('/api/login')
            .send(data)
            .expect({ success: true }, done);
    });
});