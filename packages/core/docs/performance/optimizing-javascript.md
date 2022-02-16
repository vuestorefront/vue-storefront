# Optimizing JavaScript

Loading too much JavaScript increases the time the browser parses, compiles, and executes it. It's even worse if a given page doesn't use most of it.

On this page, we will share some tips on how you can prevent that and serve only the scripts needed.

## Remove unused scripts

Removing unused scripts reduces the amount of data sent through the network and time required to make the page interactive because the browser has fewer scripts to process.

### Tree-shaking

TODO: Explain what is the tree-shaking

```diff
- import * as arrayUtils from 'array-utils';
+ import { unique, reverse, sortBy } from 'array-utils';
```

### Code splitting

TODO: Explain code-splitting and mention that pages are automatically code split in Nuxt.js

TODO: Show how to do code splitting in Nuxt.js / Vue.js

## Avoid serving polyfills to modern browsers

Polyfills and transforms enable you to use new JavaScript features in a legacy browser. However, they are unnecessary in modern browsers, making the bundle bigger and impacting the performance.

### Modern mode

The Nuxt.js has a [--modern](https://nuxtjs.org/docs/configuration-glossary/configuration-modern/) parameter that you can use with the `nuxt build` command to create two bundles:

- "legacy" bundle for older browsers,
- "modern" bundle for evergreen browsers.

Browsers will load only one of them, depending on whether it supports ES modules or not.

### Configure Babel

TODO: Describe what is Babel

TODO: Show how to configure it

## Avoid adding third-party scripts

Third-party code can significantly impact the performance, and the best thing you can do is not to add them to your page at all. However, if you have to, there are some tricks to reduce the performance impact on your application.

- Load scripts with the `async` or `defer` attribute to avoid blocking document parsing.
- Self-host the script if the third-party server is slow.
- Remove the script if it doesn't add clear value to your site.
- Use the `rel=preconnect` or `rel=dns-prefetch` attributes in `<link>` to do a DNS lookup for domains hosting third-party scripts.
- Lazy load third-party resources [with facades](https://web.dev/third-party-facades/?utm_source=lighthouse&utm_medium=devtools).
- Move third-party scripts to Web worker using, for example, the [@nuxtjs/partytown](https://github.com/nuxt-community/partytown-module) module.

### Avoid Google Tag Manager

Google Tag Manager allows non-tech users to add scripts to your page that might downgrade performance.

TODO: Add some more information
