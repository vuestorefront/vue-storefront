const createRequestBuilder = require('@commercetools/api-request-builder').createRequestBuilder;
const createClient = require('@commercetools/sdk-client').createClient;
const createAuthMiddlewareForClientCredentialsFlow = require('@commercetools/sdk-middleware-auth').createAuthMiddlewareForClientCredentialsFlow;
const createHttpMiddleware = require('@commercetools/sdk-middleware-http').createHttpMiddleware;
const createQueueMiddleware = require('@commercetools/sdk-middleware-queue').createQueueMiddleware;
const fetch = require('node-fetch');

const projectKey = 'vsf-ct-dev';

const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey,
  credentials: {
    clientId: 'jxhWdopMwsT_vR9e8GA3_zXQ',
    clientSecret: 'shtwQ9WNME2Uhpcz4a6dkDkbH1JUByFV'
  },
  fetch
});
const httpMiddleware = createHttpMiddleware({
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch
});

const queueMiddleware = createQueueMiddleware({
  concurrency: 5
});

const client = createClient({
  middlewares: [authMiddleware, httpMiddleware, queueMiddleware]
});

const service = createRequestBuilder({ projectKey }).orders;

const createRequest = {
  uri: service.build(),
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
};

client.execute(createRequest)
  .then((response) => {
    console.log(response);
  })
  .catch(e => console.log(e.body.errors));
