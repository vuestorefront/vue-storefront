# Server middleware

## What is Vue Storefront Middleware and why we need it?

The Vue Storefront middleware is an Express proxy that takes the requests from the front-end, translates them to a given integration, and calls related API-client.

We have implemented it for a variety of reasons.

First of all, it allows us to provide a proven way of extensibility. As a developer, you have control of the requests and responses in the given platform with [extensions](/advanced/server-middleware.html#extending-middleware))

All platform credentials are stored only on the server side and not exposed to the frontend part of your application.

Performance optimizations - since we moved the networking layer to the server-side, the final code shipped to the browser is way smaller, which impacts the initial loading time. 

## How it works (in a nutshell)

The way it works represents the following diagram:

<center>
  <img src="../images/middleware-diagram.jpg" alt="Middleware Diagram" />
</center>

The API-client is being called only on the middleware, but you still can access it on the front-end side - how is that possible?

When you access an API-client on the front-end side, you are accessing actually a stub, instead of a real API-client instance. This stub makes a call to the middleware ([Remote Procedure Call](https://en.wikipedia.org/wiki/Remote_procedure_call)), and asks for loading a specific integration and executing a function you are asking for.

For example, the following code:
```js
context.$ct.getProduct({ id 1})
```

Generates the request to our middleware:
- `POST / api/ct/getProduct` - a http call, where `ct` is a tag name of integation and `getProduct` is the name of a function needs to be called
- `http body` - the body of HTTP request we are sending array of arguments

Middleware reads tag name of integration and the function name that needs to be called, executes it, and sends a response back to the browser as if it was transferred using a direct connection.

## Configuration

When it comes to configuration, middleware has a dedicated config called `middleware.config.js` that contains a section with integrations(`integrations`) along with their credentials and other options.

```js
module.exports = {
  integrations: {
    <TAG NAME>: {
      location: '@<integration-package>/server',
      configuration: {}
      extensions: (extensions) => extensions,
      customQeries: {}
    }
  }
};
```

Each entry under the `integrations` section starts with a tag name of given integration, and contains an object with the following fields:

- `location` - points to the package of the API-client, related to given integration (server entry point)
- `configuration` - contains a configuration of given integration, such as credentials and others
- `extensions` - a function that returns a extensions (jump to the next section)
- `customQueries` - section that contains custom queries (graphql only)

## Extending Integrations

<center>
  <img src="../images/middleware-extensions.jpg" alt="Middleware Extensions" />
</center>

Middleware allows you to inject into the lifecycle of the entire network flow, starting with configuring a connection and ending with a final response. To use those things, we created an extension feature.

You can define as many extensions as you want. Remember they are always correlated with a specyfic API-client (integration). How they look like? Each extension has the followin structure:

```js
const extension = {
  name: 'extension-name',
  extendApiMethods: {
    getProduct: async () => { /* ... */ }
  },
  hooks: (req, res) => {
    return {
      beforeCreate: ({ configuration }) => configuration,
      afterCreate: ({ configuration }) => configuration,
      beforeCall: ({ configuration, callName, args }) => args,
      afterCall: ({ configuration, callName, args, response }) => response
    }
  }
}
```

- `name` - defines the unique name of an extension
- `extendApiMethods` - overrides the original functions from API-client
- `hooks` - defines lifecycle hooks of API-client
- `hooks:beforeCreate` - called before API-client creates a connection, takes the given configuration as an argument, and must return the configuration. Here you can attach something else to the configuration or even change it.
- `hooks:afterCreate` - Similar to the previous one, but called after the connection has been created. It also returns a configuration and you can change it.
- `hooks:beforeCall` - Triggered before each API-client function. We have access to the configuration, function name, and its arguments. This function must return the arguments and based on the input parameters we can change it.
- `hooks:afterCall` - Triggered after each API-client function.We have access to the configuration, function name, and its arguments. This function must return the response and based on the input parameters we can attach something to it.


To register a created extension, we have to add it do the middleware config file:

```js
module.exports = {
  integrations: {
    <TAG NAME>: {
      location: '@<integration-package>/server',
      configuration: {}
      extensions: (extensions) => [
        ...extensions,
        {
          name: 'our-extension'
          hooks: () => { /* ... */}
        }
      ],
      customQeries: {}
    }
  }
};
```

## Separating middleware from Nuxt

By default, Vue Storefront middleware is running within the Nuxt.js process. Sometimes there is a need to disconnect it from the app, and run it as a separate instance, and independent process.

Since is the real express.js application, you can do this, by creating file:

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
