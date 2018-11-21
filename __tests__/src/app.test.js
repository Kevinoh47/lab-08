'use strict';

const {server} = require('../../src/app.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('api server', () => {

  it('should respond with a 404 on an invalid route', () => {

    return mockRequest
      .get('/foo')
      .then(results => {
        expect(results.status).toBe(404);
      })
      .catch(err => {
        expect(err).not.toBeDefined();
      });

  });

  it('should respond with a 404 on an invalid method', () => {

    return mockRequest
      .post('/api/v1/notes/12')
      .then(results => {
        expect(results.status).toBe(404);
      })
      .catch(err => {
        expect(err).not.toBeDefined();
      });

  });

  it('should respond properly on a GET request to /api/v1/notes', () => {

    return mockRequest
      .get('/api/v1/notes')
      .then(results => {
        expect(results.status).toBe(200);
      })
      .catch(err => {
        expect(err).not.toBeDefined();
      });
  });

  it('should respond properly on a GET request for a specific id to /api/v1/notes/:id', () => {

    return mockRequest
      .get('/api/v1/notes/4747')
      .then(results => {
        expect(results.status).toBe(200);
      })
      .catch(err => {
        expect(err).not.toBeDefined();
      });
  });

  it('should be able to POST to /api/v1/notes', () => {

    let obj = {title:'test',text:'foo'};

    return mockRequest
      .post('/api/v1/notes')
      .send(obj)
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.body.title).toEqual(obj.title);
      })
      .catch(err => {
        expect(err).not.toBeDefined();
      });
  });

  it('should be able to PUT to /api/v1/notes/:id', () => {

    let obj = {title:'test',text:'foo',_id:4747};

    return mockRequest
      .put('/api/v1/notes/4747')
      .send(obj)
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.body.title).toEqual(obj.title);
      })
      .catch(err => {
        expect(err).not.toBeDefined();
      });
  });

  it('should be able to PATCH to /api/v1/notes/:id', () => {

    let obj = {title:'test',text:'foo',_id:4747};

    return mockRequest
      .patch('/api/v1/notes/4747')
      .send(obj)
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.body.title).toEqual(obj.title);
      })
      .catch(err => {
        expect(err).not.toBeDefined();
      });
  });

  /**!!!!!!!!!!!!!!!!! users !!!!!!!!!!!!!!!!! */
  it('should respond properly on a GET request to /api/v1/users', () => {

    return mockRequest
      .get('/api/v1/users')
      .then(results => {
        expect(results.status).toBe(200);
      })
      .catch(err => {
        expect(err).not.toBeDefined();
      });
  });

  it('should respond properly on a GET request for a specific id to /api/v1/users/:id', () => {

    return mockRequest
      .get('/api/v1/notes/4747')
      .then(results => {
        expect(results.status).toBe(200);
      })
      .catch(err => {
        expect(err).not.toBeDefined();
      });
  });

  it('should be able to POST to /api/v1/users', () => {

    let obj = {firstname:'Joe',lastname:'Montana',email:'jm@montana.com',role:'editor'};

    return mockRequest
      .post('/api/v1/users')
      .send(obj)
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.body.title).toEqual(obj.title);
      })
      .catch(err => {
        expect(err).not.toBeDefined();
      });
  });

  it('should be able to strip unwanted properties from a POST to /api/v1/users', () => {

    let obj = {firstname:'Joe',lastname:'Montana',email:'jm@montana.com',role:'editor', bogusProp:'lala'};

    return mockRequest
      .post('/api/v1/users')
      .send(obj)
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.body.bogusProp).toBeUndefined;
      })
      .catch(err => {
        expect(err).not.toBeDefined();
      });
  });

  it('should return an error on POST when firstname property fails validation on /api/v1/users', () => {

    let obj = {firstname:'',lastname:'Montana',email:'jm@montana.com',role:'editor'};

    return mockRequest
      .post('/api/v1/users')
      .send(obj)
      .then(results => {
        expect(results.status).toBe(500);
      })
      .catch(err => {
        expect(err).toBeDefined();
      });
  });

  it('should return an error on POST when lastname property fails validation on /api/v1/users', () => {

    let obj = {firstname:'Joe',lastname:'',email:'jm@montana.com',role:'editor'};

    return mockRequest
      .post('/api/v1/users')
      .send(obj)
      .then(results => {
        expect(results.status).toBe(500);
      })
      .catch(err => {
        expect(err).toBeDefined();
      });
  });

  it('should return an error on POST when email  property fails validation on /api/v1/users', () => {

    let obj = {firstname:'Joe',lastname:'Montana',email:'thisShouldFailValidation',role:'editor'};

    return mockRequest
      .post('/api/v1/users')
      .send(obj)
      .then(results => {
        expect(results.status).toBe(500);
      })
      .catch(err => {
        expect(err).toBeDefined();
      });
  });

  it('should return an error on POST when role property fails validation on /api/v1/users', () => {

    let obj = {firstname:'Joe',lastname:'Montana',email:'thisShouldFailValidation',role:'quarterback'};

    return mockRequest
      .post('/api/v1/users')
      .send(obj)
      .then(results => {
        expect(results.status).toBe(500);
      })
      .catch(err => {
        expect(err).toBeDefined();
      });
  });

  it('should be able to PUT to /api/v1/users/:id', () => {

    let obj = {firstname:'Joe',lastname:'Montana',email:'jm@montana.com',role:'editor',_id:4747};

    return mockRequest
      .put('/api/v1/users/4747')
      .send(obj)
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.body.firstname).toEqual(obj.firstname);
      })
      .catch(err => {
        expect(err).not.toBeDefined();
      });
  });

  it('should be able to PATCH to /api/v1/users/:id', () => {

    let obj = {firstname:'Joe',lastname:'Montana',email:'jm@montana.com',role:'editor',_id:4747};

    return mockRequest
      .patch('/api/v1/users/4747')
      .send(obj)
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.body.role).toEqual(obj.role);
      })
      .catch(err => {
        expect(err).not.toBeDefined();
      });
  });
});
