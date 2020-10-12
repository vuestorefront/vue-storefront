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

Once we have created our middleware in the integration, `createMiddleware` exposes also config option, called `apiMiddleware`. Inside of this section you can extend your API by using `extend` function, or disable it at all by setting `apiMiddleware` to false

Extending example:
```js
['@vue-storefront/{PLATFORM}/nuxt', {
  apiMiddleware: {
    extend: (app) => {
      app.get('/add-custom-user', (req, res) => {
        res.send({ customizedUser: true });
      });
    }
  }
}]
```

Disabling middleware example:
```js
['@vue-storefront/{PLATFORM}/nuxt', {
  apiMiddleware: false
}]
```
