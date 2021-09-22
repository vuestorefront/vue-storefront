# Intercepting SSR requests

Although network traffic occurring between the client (browser) and VueStorefront API can be easily inspected using built-in DevTools in the browser, it's getting a bit more complicated in case we want to intercept and debug requests being sent from the backend, thus server-side. In this document, we will suggest and describe few solutions to this issue.

## Debugging with [`express-http-proxy`](https://www.npmjs.com/package/express-http-proxy)

One way of intercepting network traffic generated from VueStorefront server-side is to use a proxy server, e.g. `express-http-proxy`, which is an npm package enabling creating a proxy server that can be programmatically set to not only intercept, but also modify both requests and responses as well.

### Setting up `express-http-proxy`

First step to intercept network traffic using `express-http-proxy`, is to fetch and install required packages. We can do that simply by running following commands:

```shell
$ npm install --save-dev express express-http-proxy 	// with npm

$ yarn add -D express express-http-proxy 				// with yarn
```

Once we have the required packages installed, we can proceed to creating our proxy server script. An example `proxy.js` script can look as follow:

```js
// proxy.js
const express = require('express');
const proxy = require('express-http-proxy');
const app = express();
const port = 3030;
const proxyEndpoint = '/integration';				  // Endpoint created on proxy side
const backendEndpoint = 'http://api.integration.com'; // Endpoint of integration backend

const opts = {
  proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
    console.log(srcReq.originalUrl);
    console.log(proxyReqOpts.headers);
    return proxyReqOpts;
  },
  proxyReqBodyDecorator: function(bodyContent, srcReq) {
    console.log(bodyContent.toString(), '\n\n\n');
    return bodyContent;
  }
};

app.use(proxyEndpoint, proxy(backendEndpoint, {
  ...opts
}));
app.listen(port, () => {
  console.log(`Proxy server started at http://localhost:${port}`);
});

```

Lines `21-23` mean that requests being sent to `http://localhost:3000/integration` will be forwarded to `http://api.integration.com`. Therefore, last thing for us to configure is the `middleware.config.js` file:

```js
// middleware.config.js
module.exports = {
  integrations: {
    ct: {
      location: '@vue-storefront/<INTEGRATION>/server',
      configuration: {
        api: {
          uri: 'http://localhost:3030/integration/graphql', // endpoint set in proxy.js
          clientId: '<CLIENT_ID>',
          clientSecret: '<CLIENT_SECRET>',
          scopes: [
			  ...
          ]
        },
        currency: 'USD',
        country: 'US'
      }
    }
  }
};

```

Now everything is ready and we can run our proxy server and application:

```shell
$ node proxy.js		// to run proxy server
$ yarn dev			// to run application
```

Intercepted requests should be now logged in the terminal window of the proxy:

```shell
Proxy server started at http://localhost:3030

/integration/graphql
{
  accept: '*/*',
  'content-type': 'application/json',
  authorization: 'Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  'user-agent': 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)',
  'accept-encoding': 'gzip,deflate',
  connection: 'close'
}

{"data":{ ... }}
```
