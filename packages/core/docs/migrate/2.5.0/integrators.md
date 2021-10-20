# Migrating eCommerce integrations to 2.5.0

## Introduction

This migration guide helps Integrators make their integrations and plugins compatible with version 2.5.0.

It only contains code examples. For more information about this version, refer to the [Overview](./overview.md) page.

## Changes

- Prevented generating cookies for currency, locale, and country during SSR (server-side rendering) to enable caching. Now the cookies are generated only client-side (in the browser).

Configuration changes are required in the existing projects:

1. Disable automatic detection of the browser language in the `i18n` configuration.

    ```javascript
    // nuxt.config.js
    i18n: {
      detectBrowserLanguage: false
    }
    ```
2. Change the order of `buildModules`. Make sure that the integration-specific module is before the core nuxt module:

    ```javascript
    buildModules: [
      ['@vue-storefront/__INTEGRATION__/nuxt', {
        // OPTIONS
      }],
      ['@vue-storefront/nuxt', {
        // OPTIONS
      }],
    ]
    ```

3. Update the Vue components used to switch locales to use the `nuxt-link` component instead of the `a` tag. By default it\'s located in the `StoreLocaleSelector.vue` file.
    ```vue
    <nuxt-link :to="switchLocalePath(lang.code)">
    ```
