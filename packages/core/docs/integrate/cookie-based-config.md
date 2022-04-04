# Cookie-based configuration

This document shows how to dynamically change Server Middleware configuration based on the cookies included in the request.

## Create integration extension

We will start by creating an extension for the integration in which configuration we want to change dynamically.

Create a new JavaScript file and paste the code shown below. Let's assume that the path is `extensions/cookie-config.js`.

```js
// extensions/cookie-config.js

module.exports = {
  name: 'cookieBasedConfiguration',
  hooks: (request) => ({
    beforeCreate({ configuration }) {
      const cookie = request.cookies.foo || 'default';
      const cookieConfiguration = loadCoookieConfiguration(cookie);

      return {
        ...configuration,
        ...cookieConfiguration
      };
    }
  })
};
```

Let's walk through this code step by step.

The exported object is an integration extension explained in detail in the [Extending integrations](/integrate/extending-integrations.html) document. It has a `hooks` callback that returns the `beforeCreate` hook called on every request to the Server Middleware before any other hook in the integration itself.

The `beforeCreate` hook returns a new configuration later passed to the integration. Because inside it, we have access to the `request` object, we can read a cookie from it, which we do in the first line. If the `foo` cookie doesn't exist, we use the string `default` instead. Then we load the configuration based on that value using the `loadCoookieConfiguration` function (which you have to implement yourself). Then the function returns the result by merging the base and the cookie configurations.

## Register the extension

Now let's register our extension in the `middleware.config.js` file. Find the integration you want to override and add the `extensions` property if it doesn't exist already. Then, add the imported extension we created in the previous step to the returned array.

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

## Create a cookie

Thanks to the preinstalled [cookie-universal-nuxt](https://www.npmjs.com/package/cookie-universal-nuxt) package, we can easily add cookies from both components and middlewares.

Handling cookies in components:

```vue
<script>
import { useContext } from '@nuxtjs/composition-api';

export default {
  setup () {
    const { $cookies } = useContext();

    // `$cookies.get()` or `$cookies.set()`
  }
};
</script>
```

Handling cookies in middlewares:

```ts
export default ({ $cookies }) => {
  // `$cookies.get()` or `$cookies.set()`
};
```
