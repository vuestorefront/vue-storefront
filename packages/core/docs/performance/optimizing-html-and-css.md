# Optimizing HTML and CSS

Large render-blocking CSS files and extensive DOM can significantly impact page performance. Below we share some tips on how to prevent that.

## Remove unused styles :ledger:

Removing unused styles reduces the amount of data needed to be sent through the network and the rendering time because the browser has fewer styles to process.

The `@vue-storefront/nuxt` package present in every Vue Storefront project has a `purgeCSS` option that does this exact thing.

```javascript{6-13}
// nuxt.config.js

export default {
  buildModules: [
    ['@vue-storefront/nuxt', {
      performance: {
        purgeCSS: {
          enabled: true,
          paths: [
            '**/*.vue'
          ]
        }
      }
    }]
  ]
};
```

`purgeCSS` option (_disabled by default_) uses [nuxt-purgecss](https://github.com/Developmint/nuxt-purgecss) plugin to remove unused CSS and accepts the same options, with two differences:

* with `enabled: false`, the plugin will not be registered at all, not only be disabled

* `**/*.vue` is added to `paths` array to detect all `.vue` files in your project, including those from `_theme` directory. Without this, the plugin would also remove some styles used on the page.

If you decide to enable this plugin, we recommend using `enabled: process.env.NODE_ENV === 'production'`, to keep development mode as fast as possible.

::: warning
Because PurgeCSS looks for whole class names in files, it may remove styles for dynamic classes. If you're using a dynamic class, make sure you use whole names instead of concatinating variables (eg. `isDev ? 'some-style-dev' : 'some-style-prod'` instead of `some-style-${ isDev ? 'dev' : 'prod' }`. If this can't be avoided, add them to `whitelist` array.
:::

## Use HTTP2 Push :blue_book:

HTTP2 Push is a performance technique to reduce latency by loading resources even before the browser knows it will need them.

Consider a website with three resources:

* index.html,
* styles.css,
* scripts.js.

First, the browser will load and parse index.html. While parsing, it will find information about styles.css and script.js, sending a request to the server to get them. Because we know that the page needs those two files, we can use HTTP2 Push to send them to the client immediately without waiting for the client to request them.

```javascript{6-8}
// nuxt.config.js

export default {
  buildModules: [
    ['@vue-storefront/nuxt', {
      performance: {
        httpPush: true
      }
    }]
  ]
};
```

The `httpPush` option (_enabled by default_) leverages [http2](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-render#http2) option in Nuxt.js. It's configured to automatically push all JavaScript files needed for the current page. If you want to override this behavior, you can disable this option and use the Nuxt.js configuration instead.

If you can't use HTTP2, you can disable this option. In this case, Nuxt.js will still `preload` these scripts, which is only slightly slower than the HTTP2 push.

## Avoid extensive DOM size :ledger:

Large DOM will increase memory usage, cause longer style calculations, and produce costly layout reflows. In your components, try to make as flat structure as possible and avoid nesting HTML elements. Check if the library you use doesn't create complex HTML structures. There are cases when a simple button generates 1000 lines of code.

## Don't load print stylesheets :blue_book:

Loading a specific stylesheet for printing slows down the page, even when not used. You can include the print styles inside your other CSS file(s) by using an `@media` query targeting type print.


```css
@import url("fineprint.css") print;
```

## Don't import SCSS files from StorefrontUI :ledger:

`@vue-storefront/nuxt` module automatically detects if you have the `@storefront-ui/vue` package installed and, registers [@nuxtjs/style-resources](https://github.com/nuxt-community/style-resources-module) module. It automatically registers all variables, mixins, and functions from StorefrontUI, which means you don't have to import them. Importing SCSS files from StorefrontUI might duplicate some styles, significantly increasing your bundle size and impacting performance.
