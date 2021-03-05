# Server middleware

The server middleware is a part of Vue Storefront networking. That's the way of making conenctions with eCommerce platform and also a solution to reduce bundle size, number of calls, credentials sharing, extensibility handling and more.

## What is Vue Storefront Middleware and why we need it?

The Vue Storefront middleware is a express.js proxy that taking the rquests from the front-end, translate them to the certaing integration, and call related API-client.

We have implemented it for variety of reasons.

First of all it allows us to provide a prover way of extensibility - As developer you have controll of the requests and the responses in the given platform and you can write an extension to add something extra in you project.

A front-end application sometimes need an additional API endpoint - that's also possible since you have server written in express.

All of credentials for your platform are stored only on the backend side, there are no shared keys in the browser.

## How it works (in a nutshell)

The way of how it works represents the following diagram:

<center>
  <img src="../images/middleware-diagram.jpg" alt="Middleware Diagram" />
</center>

In the Vue Storefront platform, you always have a few compoenents: Core, UI, Middleware and integration part: composables, API-client (and sometimes UI). As we mentioned before, API-client is being called only on the middleware, but you still can access it on the front-end side - how is that possible?

When you access a API-client on the front-end side, you are accessing actually a stub, instead of real API-client instance. This stub makes a call to the middleware (Remote Procedure Call), and ask for loading a specific integration, and executing specific function.

Middlware recognises this by the tagname of a integration and the function name that needs to be called.

When the middleware has loaded an API-client (integration) it proceeds to create a connection and make a requested API-client function call. Within this whole process, all of extensions are being executed. Once the middleware has finished its job, the response backs to the front-end side as if it was transferred using a direct connection.


## Configuration

When it comes to configuration, you only need to tell middleware what the integrations you have along with their credentials. There is dedicated config to do that called `middleware.config.js` that contains a section with integrations definition (`integrations`).

Each entry under this section starts with a tag name of given integration, and contains an object with a following fields:

- `location` - points to the package of the API-client, related with given integration (server entrypoint)
- `configuration` - contains a configuration of given integration, such as credentials and others
- `extensions` - a function that returns a extensions (jump to the next section)
- `customQueries` - section that contains custom queries (graphql only)

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

## Extending Middleware

A middleware allows you to inject into lifecycle of entire network flow, starting with configuring a connection and ending with final response. To use that things, we created a extension feature.

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

- `name` - defines the unique name of a extension
- `extendApiMethods` - overides the original functions from API-client
- `hooks` - defines a lifecycle hooks of API-client
- `hooks:beforeCreate` - called before API-client creates a connection, takes the given configuration as argument and must return the configuration. In this place you can attach something else to the configuration or even change it.
- `hooks:afterCreate` - Similar to the previous one, but called after connection has been created. It also returns a configuration and you can change it.
- `hooks:beforeCall` - Triggered before each API-client function. We have access to the configuraton, function name and its arguments. This function must return the arguments and based on the input parameters we can change it.
- `hooks:afterCall` - Triggered after each API-client function.We have access to the configuraton, function name and its arguments. This function must return the response and based on the input parameters we can attach something to it.


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

By default, Vue Storefront middleware is running withing the Nuxt.js process. Sometimes there is a need to disconnect it from the app, and run as a separate instance, and independent process.

Since is the real express.js application, you can do this, by creating file:

```js
const { createServer } = require('@vue-storefront/middleware');
const { integrations } = require('./middleware.config');

const app = createServer({ integrations });

app.listen(8181, () => {
  console.log('Middleware started');
});
```

Now, when you run this using node, your middleware should work separetly.

Additionally, you need to remove middleware module entry from the nuxt.config.js and configure the domain, where yor middleware is settled.

```js
export default {
  publicRuntimeConfig: {
    middlewareUrl: 'https://api.commerce.com'
  }
}
```