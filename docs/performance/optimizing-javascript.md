# Optimizing JavaScript

Loading too much JavaScript increases the time the browser parses, compiles, and executes it. It's even worse if a given page doesn't use most of it.

On this page, we will share some tips on how you can prevent that and serve only the scripts needed.

## Remove unused scripts :orange_book:

Removing unused scripts reduces the amount of data sent through the network and time required to make the page interactive because the browser has fewer scripts to process.

### Analyze JavaScript bundles

You can check the JavaScript bundles with tools like [Webpack bundle analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer). In Nuxt, this library is available out of the box by [changing the configuration](https://nuxtjs.org/docs/configuration-glossary/configuration-build/#analyze) or running a build with the `--analyze` flag.

```bash
yarn nuxt build --analyze
```

:::warning
Remember to never use these options in production.
:::

### Tree-shaking

Tree shaking is a technique for eliminating dead code from the final bundle. "Dead code" is the code that never gets used or called. Smaller bundles mean that the browser has less JavaScript to download and parse.

To make tree-shaking work properly, you should avoid importing the whole package, but instead just what you need.

```diff
- import * as arrayUtils from 'array-utils';
+ import { unique, reverse, sortBy } from 'array-utils';
```

### Code splitting

Bundlers often output big JavaScript files, which contain all application's code. Code splitting allows for creating smaller files with only the code needed for a specific page or component. This technique helps speed up a page by skipping unused JavaScript code.

There is also a vendor bundle with common parts shared between multiple bundles. For example, if Home and Product pages use the same Navigation component, it will go to the vendor bundle and be downloaded only once.

Nuxt.js does code-splitting out of the box by creating separate bundles for every page/route. You can control this behavior using the [build.splitChunks](https://nuxtjs.org/docs/configuration-glossary/configuration-build/#splitchunks) property in `nuxt.config.js` file.

## Avoid serving polyfills to modern browsers :ledger:

Polyfills and transforms enable you to use new JavaScript features in a legacy browser. However, they are unnecessary in modern browsers, making the bundle bigger and impacting the performance.

### Modern mode

The Nuxt.js has a [--modern](https://nuxtjs.org/docs/configuration-glossary/configuration-modern/) parameter that you can use with the `nuxt build` command to create two bundles:

* "legacy" bundle for older browsers,
* "modern" bundle for evergreen browsers.

Browsers will load only one of them, depending on whether it supports ES modules or not.

### Configure Babel

Babel is a toolchain used to converting modern JavaScript code into a backwards compatible version for current and older browsers or environments.

Nuxt.js includes it out of the box. You can control its behavior using the [build.babel](https://nuxtjs.org/docs/configuration-glossary/configuration-build/#babel) property in `nuxt.config.js` file.

Default configuration:

```javascript
// nuxt.config.js

export default {
  build: {
    babel: {
      babelrc: false,
      cacheDirectory: undefined,
      presets: ['@nuxt/babel-preset-app']
    }
  }
};
```

With this configuration, the default targets are:

* `ie: '9'` for the legacy bundle.
* `esmodules:true` for the modern bundle.
* `node: 'current'` for the server bundle.

## Avoid adding third-party scripts :ledger:

Third-party code can significantly impact the performance, and the best thing you can do is not to add them to your page at all. However, if you have to, there are some tricks to reduce the performance impact on your application.

* Load scripts with the `async` or `defer` attribute to avoid blocking document parsing.

```javascript
// nuxt.config.js

export default {
  head: {
    script: [
      {
        src: `<SCRIPT_URL>`,
        defer: true
      },
      { 
        src: '<SCRIPT_URL>',
        async: true
      },
    ]
  }
};
```

* Self-host the script if the third-party server is slow.
* Remove the script if it doesn't add clear value to your site.
* Use the `rel=preconnect` or `rel=dns-prefetch` attributes in `<link>` to do a DNS lookup for domains hosting third-party scripts.

```javascript
// nuxt.config.js

export default {
  head: {
    link: [
      { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
    ],
};
```

* Lazy load third-party resources [with facades](https://web.dev/third-party-facades/?utm_source=lighthouse&utm_medium=devtools).
* Move third-party scripts to Web worker using, for example, the [@nuxtjs/partytown](https://github.com/nuxt-community/partytown-module) module.

### Educate people using Google Tag Manager about web perf

Non-technical users often use Google Tag Manager to add scripts, styling, and other elements or toggle content visibility on the page. This can lead to Cumulate Layout Shifts, extra Total Blocking Time, an increased number of requests and their weight, or even rerendering the whole page.

Developers should educate them that adding scripts via Google Tag Manager can significantly impact performance.
