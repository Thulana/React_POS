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

// describe('api login', () => {
//     it('login to the system', () => {
//         let data = { username: 'admin', password: 'admin' };
//         request.post('/api/login').send(data).expect(200);
        
//     });
// });

describe('api login success', function() {
    it('login to the system', function(done) {
    let data = { username: 'admin', password: 'admin' };
      request
        .post('/api/login').send(data)
        .end(function(err, res) {
        //   console.log(res);  
          expect(res.statusCode).toBe(200);
          expect(res.body.message).toBe('Authentication successful!');
          done();
        });
    });
  });

  describe('api login fail', function() {
    it('login to the system', function(done) {
    let data = { username: 'admin', password: 'admin1' };
      request
        .post('/api/login').send(data)
        .end(function(err, res) {
        //   console.log(res);  
          expect(res.body.success).toBe(false);
          expect(res.body.message).toBe('Incorrect username or password');
          done();
        });
    });
  });
describe('api/orders', () => {
    it('get all orders of the system', () => {
        request
            .post('/api/view_orders')
            .expect(403);
    });
});

// describe('api/order', () => {
//     it('get all orders of the system', () => {
//         request
//             .post('/api/view_order')
//             .expect(403);
//     });
// });

describe('api/get_items', () => {
  it('get all items of the system', () => {
      request
          .post('/api/get_items')
          .expect(403);
  });
});