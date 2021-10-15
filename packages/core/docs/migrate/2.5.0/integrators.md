# Migrating eCommerce integrations to 2.5.0

## Introduction

This migration guide helps Integrators make their integrations and plugins compatible with version 2.5.0.

It only contains code examples. For more information about this version, refer to the [Overview](./overview.md) page.

## Changes

- Removed cookies fpr currency, locale and country generated on server side. Now they are generated client side.

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
