# Internationalization

If you're building a shop for an international brand you want it being translated to different languages and using different currencies. In this document you will learn how we're approaching internationalization in Vue Storefront and how to configure your application to use

::: tip i18n is not multi-tenancy!
This document explains only how to make a single shop instance available for multiple countries. If you need to build a system for multiple tenants we suggest creating an instance of Vue Storefront for each tenant and sharing common resources through an NPM package.
:::

## How it works by default?
By default we are using [`nuxt-i18n`](https://i18n.nuxtjs.org/) module for handling both translations and currencies. It is preinstalled in the default theme and configured for English and German translations out of the box. 

In the theme `nuxt-i18n` is using `$t('key')` to translate strings and `$n(number)` to add the currency sign. You can find the translation keys in `lang` directory of your project and configuration for currencies in `nuxt.config.js`.

::: tip
Even though the module is included into the default theme it's not mandatory for your app to work and [you can always get rid of it.](#configuring-modules-separately) and handle i18n differently.
:::

In order to provide a unified way of configuring i18n across the application for different modules and integrations, we have introduced the field `i18n` in each module's configuration that has the same format as `nuxt-i18n` options. Add there any configuration if there is a necessity and it will be propagated to all other Vue Storefront modules.

All Vue Storefront integrations have `useNuxtI18nModule` property set to `true`. It means that they will use the same configuration as you provided for `nuxt-i18n` in `i18n` field of your `nuxt.config.js`

```js
// nuxt.config.js
modules: [
  ['@vue-storefront/{INTEGRATION}/nuxt', {
    api: {
      // api client configuration
    },
    i18n: {
      useNuxtI18nModule: true
    }
  }]
],
i18n: {
  locales: [
    {
      code: 'en',
      label: 'English',
      file: 'en.js',
      iso: 'en'
    },
    {
      code: 'de',
      label: 'German',
      file: 'de.js',
      iso: 'de'
    }
  ],
  defaultLocale: 'en'
}

```

## Configuring modules separately

You always can provide your own i18n configuration just for a specific module by setting `useNuxtI18nModule` to false.

```js
['@vue-storefront/{INTEGRATION}/nuxt', {
  api: {
    // api client configuration
  },
  i18n: {
    useNuxtI18nModule: false,
    locales: [
      {
        code: 'en',
        label: 'English',
        file: 'en.js',
        iso: 'en'
      },
      {
        code: 'de',
        label: 'German',
        file: 'de.js',
        iso: 'de'
      }
    ],
    defaultLocale: 'en'
  }
}]
```
