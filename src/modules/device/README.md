### Device

Based on: https://github.com/nuxt-community/device-module

It provides as some logic helpers based on UserAgent. List of tests:
```
isMobile,
isMobileOrTablet,
isTablet,
isDesktop,
isDesktopOrTablet,
isIos,
isWindows,
isMacOS
```

They are accessible by, e.g::
```
this.$device.isMobile
```
If you want to use it server-side then just use `serverPrefetch` from Vue 2.6

Example config:
```js
"device": {
    "appendToInstance": true,
    "tests": [
      "isMobile",
      "isMobileOrTablet",
      "isTablet",
      "isDesktop",
      "isDesktopOrTablet",
      "isIos",
      "isWindows",
      "isMacOS"
    ]
  }
  ```

`appendToInstance` decides whether module will inject `$device` to Vue instances or not.

In addition when we are using installer script. I've added multiselect so we could pick which tests we want to have.

I've tested it with `curl -A "some user agent" http://localhost:3000 and it worked.
I prepared `test.js` testing script. If you want to make tests in your website, please uncomment `router.addRoutes` part in module's index.ts and register module in `src/modules/client.ts` (normally, you do not need to) - it will add route with values of tests. You also should enable every test. Then just run:
```sh
node test.js
```
And it will send requests to `http://localhost:3000/device-mod-test` with different user agents. You could multiply amount of tests with `multiplier` variable in test.js file. Ten is a good default value in my opinion.

Anyway we should use media queries whenever we can. However, sometimes we have more advanced structure and we are ending with hidden useless vue instance.

## How to install
1. Setup config
2. In `initTheme` inside `index.js` of your theme add:
```js
injectDeviceTests({
  config,
  app,
  ssrContext
})
```
You can import it at the top of the file like that:
```js
import { injectDeviceTests } from 'src/modules/device';
```
3. Check **Cache** part below.

## Cache
If you are using Redis Cache (if you don't, you should start) you might up with some mismatches between mobile & desktop versions. To prevent that, you should modify cache's key. It will differ per your project - if you have different components for desktop & non-desktops you want to add this information to Redis Cache - so it will serve proper one, based on requirements.

By default Cache key looks like:
```js
const site = req.headers['x-vs-store-code'] || 'main';
const cacheKey = `page:${site}:${req.url}`;
```

I created a new server hook called `beforeBuildCacheKey` which allows you to create own cache key based on situation. This is example usage for case I described above:
```ts
// server.ts
import { serverHooks } from '@vue-storefront/core/server/hooks';
import config from 'config';
import deviceLibrary from './logic';

serverHooks.beforeBuildCacheKey(({ req, site }) => {
  const tests = deviceLibrary(req.headers['user-agent'], config.device.tests);
  const device = tests.isDesktop ? 'desktop' : 'non-desktop';
  return `page:${device}:${site}:${req.url}`;
})

```
