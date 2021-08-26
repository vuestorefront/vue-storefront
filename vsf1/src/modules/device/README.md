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
Or in asyncData by (you need to import Vue):
```
Vue.prototype.$device.isMobile
```

We could totally disable this feature by setting `config.device.appendToInstance` to false and the small library will not by imported.

In addition when we are using installer script. I've added multiselect so we could pick which tests we want to have.

I've tested it with `curl -A "some user agent" http://localhost:3000 and it worked.

That's obvious we should use media queries whenever we can. However, sometimes we have more advanced structure and we are ending with hidden useless vue instance.
