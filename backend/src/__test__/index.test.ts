import {createPathFilters} from '../utils/functions';

const request = require('supertest');
const app = require('../index');

describe("Checking get random quotes", () => {
  test('returns one simple quote', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.quotes).toHaveLength(1);
  });
  test('returns more than one simple quote', async () => {
    const response = await request(app).get('/?limit=4');
    expect(response.status).toBe(200);
    expect(response.body.quotes).toHaveLength(4);
  });
});

describe("Checking authentification", () => {
  test('returns a token if valid user', async () => {
    const response = await request(app).post('/auth').send({
      username: 'test',
      password: 'test'
    });
    expect(response.status).toBe(200);
    expect(response.body.token.length).toBeGreaterThan(0);
  });

  test('returns 404 error for invalid user', async () => {
    const response = await request(app).post('/auth').send({
      username: 'testerror',
      password: 'testerror'
    });
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Not found');
  });

});
