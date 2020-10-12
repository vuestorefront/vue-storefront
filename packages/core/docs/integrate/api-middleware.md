# API middleware

Sometimes, due to security reasons, our integrations need to be hidden behind some server middleware which works as a sort of proxy, but it introduces a bit more transparency for the client-side so the app doesn't have to know, how API works itself.

If some of the integration need to implement such a proxy for Nuxt.js, the core introduces a special function `createMiddleware` which registers provided middleware and gives us the ability to extend it.

## Nuxt module
As each integration has its own nuxt module, we are able to add a middleware as well. Below is the example:

```js
import { createMiddleware } from '@vue-storefront/core/server';

export default function (moduleOptions) {
  const { middleware, extend } = createMiddleware(moduleOptions);

  extend((app) => {
    app.get('/add-user', (req, res) => {
      res.send({ userAdded: true });
    });
  })

  this.addServerMiddleware(middleware);
}
```

The function `createMiddleware` returns two properties:
- `middleware` - which is the created middleware used directly by `addServerMiddleware`
- `extend` - a function that adds a new endpoint to the middleware. It takes as an argument an express.js instance

## Nuxt module configuration

Once we have created our middleware in the integration, `createMiddleware` exposes also config option, called `extendApi`. It works in the same way as `extend` - gives us a possibility to extend api anywhere else in the project.

```js
['@vue-storefront/commercetools/nuxt', {
  extendApi: (app) => {
    app.get('/add-custom-user', (req, res) => {
      res.send({ customizedUser: true });
    });
  }
}]
```
