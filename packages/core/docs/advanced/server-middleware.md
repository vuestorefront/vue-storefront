# Server Middleware

:::danger Don't forget to reload the application
The application does not reload automatically after saving the changes in Server Middleware. Due to this, you have to restart the application manually. We are working on enabling Hot Reloading in future updates.
:::

## What is Server Middleware

The Server Middleware in Vue Storefront application is an Express proxy that takes the requests from the front end, translates them to a given integration, and calls related API-client.

We have implemented it for a variety of reasons. First of all, it allows us to provide a proven way of extensibility. As a developer, you have control of the requests and responses in the given platform with [extensions](/advanced/server-middleware.html#extending-integrations)).

All platform credentials are stored only on the server side and not exposed to the front-end part of your application.

Performance optimizations - since we moved the networking layer to the server-side, the final code shipped to the browser is way smaller, which impacts the initial loading time. 

## How it works (in a nutshell)

The way it works represents the following diagram:

<center>
  <img src="../images/middleware-diagram.jpg" alt="API Middleware Diagram" />
</center>

The API-client is being called only on the middleware, but you still can access it on the front-end side - how is that possible?

When you access an API-client on the front-end side, you are accessing a stub instead of a real API-client instance. This stub makes a call to the middleware ([Remote Procedure Call](https://en.wikipedia.org/wiki/Remote_procedure_call)) and asks for loading a specific integration and executing a function you are asking for.

For example, the following code:
```js
context.$ct.getProduct({ id: 1 })
```

Generates the request to our middleware:
- `POST / api/ct/getProduct` - a http call, where `ct` is a tag name of integation and `getProduct` is the name of a function needs to be called
- `http body` - the body of HTTP request we are sending an array of arguments

Middleware reads the tag name of integration and the function name that needs to be called, executes it, and sends a response back to the browser as if it was transferred using a direct connection.

## Configuration

When it comes to configuration, middleware has a dedicated config called `middleware.config.js` that contains a section with integrations(`integrations`) along with their credentials and other options.

```js
module.exports = {
  integrations: {
    <TAG NAME>: {
      location: '@<integration-package>/server',
      configuration: {}
      extensions: (extensions) => extensions,
      customQueries: {}
    }
  }
};
```

Each entry under the `integrations` section starts with a tag name of given integration and contains an object with the following fields:

- `location` - points to the package of the API-client, related to given integration (server entry point)
- `configuration` - contains a configuration of given integration, such as credentials and others
- `extensions` - a function that returns a extensions (jump to the next section)
- `customQueries` - a section that contains custom queries (GraphQL only)

## Extending Integrations

Refer to the [Extending integrations](/integrate/extending-integrations.html) page to learn how to extend existing integrations.

## Separating middleware from Nuxt

By default, Vue Storefront middleware is running within the Nuxt.js process. Sometimes there is a need to disconnect it from the app and run it as a separate and independent instance (process).

Since it's just an Express application, you can do this by creating a `middleware.js` file:

```js
const { createServer } = require('@vue-storefront/middleware');
const { integrations } = require('./middleware.config');

const app = createServer({ integrations });

app.listen(8181, () => {
  console.log('Middleware started');
});
```

Now, when you run this using Node, your middleware should work separately.

Additionally, you need to remove the middleware module entry from the `nuxt.config.js` and configure the domain, where your middleware is settled.

```js
export default {
  publicRuntimeConfig: {
    middlewareUrl: 'https://api.commerce.com'
  }
}
```
