# Optimizing JavaScript

Loading too much JavaScript increases the time the browser parses, compiles, and executes it. It's even worse if a given page doesn't use most of it.

On this page, we will share some tips on how you can prevent that and serve only the scripts needed.

## Remove unused scripts :orange_book:

Removing unused scripts reduces the amount of data sent through the network and time required to make the page interactive because the browser has fewer scripts to process.

### Tree-shaking

Tree shaking it's a technique of dead code elimination.
That means any not imported/used parts of our code will not get in to final bundle.

Smaller bundles means better performance.

To help  three shaking work properly, you should not import everything, just get what you really need.

```diff
- import * as arrayUtils from 'array-utils';
+ import { unique, reverse, sortBy } from 'array-utils';
```

### Code splitting

When your application is bundled, often big chunks are created, all js code can get into one big file. 

Using code splitting we are creating more smaller files, that contains javascript needed for eg. only home page, scripts used for product page are in separate bundle.

There is also a vendor bundle where all shared scripts go. If home page and product page use a top menu, it's component scripts will go to the vendor, so it can be downloaded only once.

This technique helps to speed up a page because we don't need to download and parse unused javascript.


Nuxt uses code splitting out of the box, it is creating bundles based on pages. So everything needed for home page (that is not shared with other pages) gets to one bundle and eg product page to another.


It's default configuration is in nuxt.config.js

```javascript
export default {
  build: {
    splitChunks: {
      layouts: false,
      pages: true,
      commons: true
    }
  }
}
```

More info about code splitting in Nuxt can be found in [official documentation](https://nuxtjs.org/docs/configuration-glossary/configuration-build/#splitchunks).

## Avoid serving polyfills to modern browsers :ledger:

Polyfills and transforms enable you to use new JavaScript features in a legacy browser. However, they are unnecessary in modern browsers, making the bundle bigger and impacting the performance.

### Modern mode

The Nuxt.js has a [--modern](https://nuxtjs.org/docs/configuration-glossary/configuration-modern/) parameter that you can use with the `nuxt build` command to create two bundles:

- "legacy" bundle for older browsers,
- "modern" bundle for evergreen browsers.

Browsers will load only one of them, depending on whether it supports ES modules or not.

### Configure Babel

Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments. 


Babel in nuxt can be easily configured, default configuration is:

```javascript
{
  babelrc: false,
  cacheDirectory: undefined,
  presets: ['@nuxt/babel-preset-app']
}
```

The default targets of @nuxt/babel-preset-app are ie: '9' in the client build, and node: 'current' in the server build.


More information about babel in nuxt can be found in [official documentation](https://nuxtjs.org/docs/configuration-glossary/configuration-build/#babel).

## Avoid adding third-party scripts :ledger:

Third-party code can significantly impact the performance, and the best thing you can do is not to add them to your page at all. However, if you have to, there are some tricks to reduce the performance impact on your application.

- Load scripts with the `async` or `defer` attribute to avoid blocking document parsing.
- Self-host the script if the third-party server is slow.
- Remove the script if it doesn't add clear value to your site.
- Use the `rel=preconnect` or `rel=dns-prefetch` attributes in `<link>` to do a DNS lookup for domains hosting third-party scripts.
- Lazy load third-party resources [with facades](https://web.dev/third-party-facades/?utm_source=lighthouse&utm_medium=devtools).
- Move third-party scripts to Web worker using, for example, the [@nuxtjs/partytown](https://github.com/nuxt-community/partytown-module) module.

### Avoid Google Tag Manager

Google Tag Manager allows non-tech users to add scripts to your page that might downgrade performance.

It is often use to add additional scripts, add some styling and elements or hide/show content on web page, this can lead to Cumulate Layout Shifts, additional Total Blocking Time, bigger number of requests and their weight or even rerender whole page (by using document.write).
