# Upgrading to 2.5.0

## Introduction

In the 2.5.0 release, we changed the way of handling cookies on server side. Instead of generating them server side, now cookies are generated client side.

## Changes

In the 2.5.0 release, we've removed generating cookies for currency, locale and country on server side. Now those cookies are generated client side.

To make this work some changes in configuration are needed.
1. Disable i18n's detecting browser language.

```javascript{5}
// nuxt.config.js
i18n: {
  // other coniiguration options
  ...
  detectBrowserLanguage: false
}
```
2. Change order of build modules. Put integration specific nuxt module before core nuxt module:
```javascript
buildModules: [
  ...
  ['@vue-storefront/__INTEGRATION__/nuxt', {
    // OPTIONS
  }],
  ['@vue-storefront/nuxt', {
    // OPTIONS
  }],
  ...
]
```

3. Change in layouts way of changing locales. As default it is an anchor (`<a>`), it needs to be changed to `<nuxt-link>`. As default it\'s located in `StoreLocaleSelector.vue` file.
For example:
```vue
<nuxt-link :to="switchLocalePath(lang.code)">
```
