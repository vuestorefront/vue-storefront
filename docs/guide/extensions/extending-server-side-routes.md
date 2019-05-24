# Extending Express.js server-side routes

From Vue Storefront 1.4.0, you can add your own custom server-side routes without Vue.js SSR context. These routes may be used, for example, for generating large, unbuffered files like XML maps, binary files, etc.

You can add numerous, custom Express js middlewares and routes by simply modifying the `src/server/index.js`:

```js
// You can extend Vue Storefront server routes by binding to the Express.js (expressApp) in here
module.exports.registerUserServerRoutes = expressApp => {
  require('./example/generator')(expressApp);
};
```

The example route handler looks like this:

```js
module.exports = expressApp => {
  /**
   * This is an example on how You can bind Your own Express.js server routes to SSR server running Vue Storefront.
   * It may be usefull to avoid all the Vue.js processing and context - and useful for example for large XML/binary file generation
   */
  expressApp.get('/vue-storefront.xml', (req, res) => {
    res.end('<content>Vue Storefront custom XML generator example</content>');
  });
};
```

## Data operations inside Express routes

Unfortunately, as you may have seen above in the `core/scripts/server.js`, all modules used by the script (including the dynamic routes) can not use ES modules (`import ... from ...` type of statements). By this limitation, you can't currently use `@vue-storefront`modules inside the custom Express.js routes as they're not compiled to the CommonJS. This is likely to be fixed. To get the data, you may execute `fetch()` requests to the `vue-storefront-api` endpoints. You can still use `const config = require('config')` to read the endpoints, URLs, etc.

