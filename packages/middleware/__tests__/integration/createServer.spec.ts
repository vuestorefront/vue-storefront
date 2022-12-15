import { createServer } from '../../src';
import { Express } from 'express';
import request from 'supertest';

describe('[Integration] Create server', () => {
  let app: Express;

  beforeAll(async () => {
    app = await createServer(
      {
        integrations: {
          test_integration:
            {
              configuration: {},
              location: './__tests__/integration/bootstrap/server'
            }
        }
      }
    );
  });

  it('config.integrations should be properly configured', async () => {
    app = await createServer({ integrations: {} });

    const {
      status,
      error
    } = await request(app).post('/invalid_integration/action');

    expect(status).toEqual(404);
    expect(error.text).toEqual('"invalid_integration" integration is not configured. Please, check the request path or integration configuration.');
  });

  it('can handle a valid request', async () => {
    const {
      status,
      body
    } = await request(app).post('/test_integration/success').send([]);

    expect(status).toEqual(200);
    expect(body.message).toEqual('ok');
  });

  it('\'x-powered-by\' header is removed', async () => {
    const { headers } = await request(app).post('/test_integration/success').send([]);

    expect(headers['x-powered-by']).toBeUndefined();
  });
});

