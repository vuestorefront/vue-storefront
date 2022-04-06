# Cookie-based configuration

This document shows how to dynamically change integration configuration in both Server Middleware and Nuxt based on the cookies.

## Server Middleware integration

You can change integration configuration in Server Middleware using extensions explained in the [Extending integrations](/integrate/extending-integrations.html) document.

### Create integration extension

Create a new JavaScript file and paste the code shown below. Let's assume that the path is `extensions/cookie-config.js`.

```js
// extensions/cookie-config.js

module.exports = {
  name: 'cookieBasedConfiguration',
  hooks: (request) => ({
    beforeCreate({ configuration }) {
      const cookie = request.cookies.foo || 'default';
      const cookieConfiguration = loadCookieConfiguration(cookie);

      return {
        ...configuration,
        ...cookieConfiguration
      };
    }
  })
};
```

The extension has a `beforeCreate` hook, which gets called on every request to the integration before any other hook.

We read the cookie value from the `request` object. Then using the `loadCookieConfiguration` function (which you must implement yourself), we load the associated configuration and override the base configuration.

### Register the extension

Now let's register our extension in the `middleware.config.js` file. Find the integration you want to override and add the `extensions` property if it doesn't exist already. Then, add the extension we created in the previous step to the returned array.

```js{23}
// middleware.config.js

const cookieBasedConfiguration = require('./extensions/cookie-config');

module.exports = {
  integrations: {
    '{INTEGRATION}': {
      location: '{INTEGRATION}',
      extensions: extensions => [...extensions, cookieBasedConfiguration]
    }
  }
};
```

## Nuxt integration

You can change the integration configuration in Nuxt using middleware.

```ts
export default ({ $vsf, $cookies }) => {
  const cookie = $cookies.get('foo') || 'default';
  const cookieConfiguration = loadCookieConfiguration(cookie);

  const integration = $vsf.$integration; // Instead of `$integration`, use the integration key instead

  integration.config = {
    ...integration.config,
    ...cookieConfiguration
  };
};
```

We read the cookie value using the `$cookies` property. Then using the `loadCookieConfiguration` function (which you must implement yourself), we load the associated configuration and override the base configuration.

See the [Handling cookies](/miscellaneous/handling-cookies.html) document to learn more about cookies.
