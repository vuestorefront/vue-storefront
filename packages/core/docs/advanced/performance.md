# Performance

This document will walk you through performance configuration options for `@vue-storefront/nuxt` package and allow you to easily reduce size of your app and improve performance.

## Configuration

`nuxt.config.js` file contains contains few `buildModules`, one of which is `@vue-storefront/nuxt`. It already has some options passed to it, however there are few more, which are not used by default:

```javascript
// nuxt.config.js
['@vue-storefront/nuxt', {
  // other options
  performance: {
    httpPush: true,
    purgeCSS: {
      enabled: false,
      paths: [
        '**/*.vue'
      ]
    }
  }
}]
```

### HTTP2 Push

`httpPush` option (_enabled by default_) leverages [`http2` option in Nuxt.js](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-render#http2). It's configured to automatically push all JavaScript files needed for the current page. If you want to override this behaviour, you can disable this option and use Nuxt.js configuration instead.

If you can't use HTTP2, you can disable this option. In this case, Nuxt.js will still `preload` these scripts, which is only slightly slower than HTTP2 push.

### PurgeCSS

`purgeCSS` option (_disabled by default_) uses [`nuxt-purgecss` plugin](https://github.com/Developmint/nuxt-purgecss) to remove unused CSS and accepts the same options, with two differences:

* when `enabled` is set to `false`, plugin will not be registered at all, not only be disabled,

* `**/*.vue` is added to `paths` array to detect all `.vue` files in your project, including those from `_theme` directory. Without this, some styles used on the page would also be removed.

If you decide to enable this plugin, we recommend using `enabled: process.env.NODE_ENV === 'production'`, to keep development mode as fast as possible.

::: warning
Because PurgeCSS looks for whole class names in files, it may remove styles for dynamic classes. If you're using a dynamic class, please use whole names instead of concatinating variables (eg. `isDev ? 'some-style-dev' : 'some-style-prod'` instead of `some-style-${ isDev ? 'dev' : 'prod' }`. If this can't be avoided, add them to `whitelist` array.
:::

## Best practices

### Using StorefrontUI

`@vue-storefront/nuxt` module automatically detects if you have `@storefront-ui/vue` installed and if so, registers [`@nuxtjs/style-resources` module](https://github.com/nuxt-community/style-resources-module). It automatically registers all variables, mixins and functions from StorefrontUI, which means you don't have to import them. **_Importing SCSS files from StorefrontUI might duplicate some styles, significantly increasing your bundle size and impact performance._**
