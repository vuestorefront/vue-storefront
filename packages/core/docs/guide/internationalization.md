# Internationalization

By default we are using `nuxt-i18n` module for handling internationalization, but it's not mandatory to use it even if you are using Nuxt.

In order to provide a unified way of configuring i18n across the application for different modules and integrations, we have introduced the field `i18n` in each module's configuration that has the same format as `nuxt-i18n` options. Clearly, it's possible to add there any configuration if there is a necessity and it will be propagated to all other Vue Storefront modules.

By default all Vue Storefront modules have `useNuxtI18nModule` property set to `true`. It means that they will use the same configuration as you provided for `nuxt-i18n` in `i18n` field of your `nuxt.config.js`

```js
// nuxt.config.js
['@vue-storefront/{INTEGRATION}/nuxt', {
  api: {
    // api client configuration
  },
  i18n: {
    useNuxtI18nModule: true
  }
}]
```

## Custom configuration

You are always able to provide your own i18n configuration just for a specific module by setting `useNuxtI18nModule` to false.

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
