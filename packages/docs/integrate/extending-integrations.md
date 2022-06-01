# Extending integrations

## Introduction

Server Middleware extensions allow to extend Express.js server, register additional API endpoints, or inject into the lifecycle of a request sent to a given Server Middleware integration from the application.

<center>
  <img src="../images/middleware-extensions.jpg" alt="Middleware Extensions" />
</center>

## Creating an extension

You can define as many extensions as you want. Each extension has the following structure:

```js
const extension = {
  name: 'extension-name',
  extendApiMethods: {
    getProduct: async () => { /* ... */ }
  },
  extendApp: (app) => {  /* ... */ },
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

- `name` - defines the unique name of the extension
- `extendApiMethods` - overrides the original functions from API-client
- `extendApp` - a function that gives you access to the express.js app
- `hooks` - defines lifecycle hooks of API-client
- `hooks:beforeCreate` - called before API-client creates a connection. It accepts configuration as an argument, and must return it as well. You can use it to modify the configuration or merge with the default values.
- `hooks:afterCreate` - similar to the previous function, but called after the connection has been created. It accepts configuration as an argument, and must return it as well.
- `hooks:beforeCall` - called before each API-client function. We have access to the configuration, function name, and its arguments. This function must return the arguments, and based on the input parameters we can change it.
- `hooks:afterCall` - called after each API-client function. We have access to the configuration, function name, and its arguments. This function must return the response, and based on the input parameters we can attach something to it.

See the [ApiClientExtension interface](/reference/api/core.apiclientextension.html) for more information.

## Registering an extension

To register an extension, add it to the array returned from the `extensions` function of a given integration in the `middleware.config.js` file:

```js
module.exports = {
  integrations: {
    <TAG NAME>: {
      location: '@<integration-package>/server',
      configuration: {},
      extensions: (extensions) => [
        ...extensions,
        {
          name: 'our-extension',
          hooks: () => { /* ... */}
        }
      ],
      customQueries: {}
    }
  }
};
```
