# Internationalization

If you're building a shop for an international brand, you likely want it translated to different languages and using different currencies. In this document, you will learn how we're approaching internationalization in Vue Storefront and how to configure your application to use it.

::: warning i18n is not multi-tenancy!
This document only explains how to make a single shop instance available for multiple countries. If you need to build a system for multiple tenants, we suggest creating an instance of Vue Storefront for each tenant and sharing common resources through an NPM package.
:::

## How it works by default?

By default, we are using the [`nuxt-i18n`](https://i18n.nuxtjs.org/) module for handling both translations and currencies. It's preinstalled in the [default theme](/getting-started/theme.html#what-s-makes-a-default-theme) and is configured for English and German translations out of the box.

In the theme, `nuxt-i18n` is using `$t('key')` to translate strings and `$n(number)` to add the currency sign.

You can find the translation keys in the `lang` directory of your project and configuration for currencies in `nuxt.config.js`.

::: tip
Even though the module is included in the default theme, it's not required. You can [disable it](#configuring-modules-separately) and handle internationalization yourself.
:::

To provide a unified way to configure i18n across the application for different modules and integrations, we have introduced the `i18n` field in each module's configuration. It has the same format as the `nuxt-i18n` options. You can add any configuration there, and it will be propagated to all other Vue Storefront modules.

All Vue Storefront integrations have the `useNuxtI18nConfig` property set to `true`. It means that they will use the same configuration as you provided for `nuxt-i18n` in the `i18n` field of your `nuxt.config.js`.

```js
// nuxt.config.js

export default {
  buildModules: [
    [
      '@vue-storefront/{INTEGRATION}/nuxt',
      {
        // other comfiguration options
        i18n: {
          useNuxtI18nConfig: true,
        },
      },
    ],
  ],
  i18n: {
    locales: [
      {
        code: 'en',
        label: 'English',
        file: 'en.js',
        iso: 'en',
      },
      {
        code: 'de',
        label: 'German',
        file: 'de.js',
        iso: 'de',
      },
    ],
    defaultLocale: 'en',
  },
};
```

## Configuring modules separately

You can provide your own i18n configuration for a specific module by setting `useNuxtI18nConfig` to `false`.

```js
// nuxt.config.js

export default {
  [
    '@vue-storefront/{INTEGRATION}/nuxt',
    {
      i18n: {
        useNuxtI18nConfig: false,
        locales: [
          {
            code: 'en',
            label: 'English',
            file: 'en.js',
            iso: 'en',
          },
          {
            code: 'de',
            label: 'German',
            file: 'de.js',
            iso: 'de',
          },
        ],
        defaultLocale: 'en'
      }
    }
  ];
}
```

## CDN and cookies

To make CDN to work correctly, it cannot return `Set-Cookie` header in response.

To achieve that, we've made our own mechanism for handling cookies responsible for
storing `locale`, `currency` and `country`.

This mechanism also handles language detection and redirects for proper locale versions.
This is why `@nuxtjs/i18n` language detection is disabled by default.

```js
// nuxt.config.js
export default {
  i18n: {
    detectBrowserLanguage: false,
  },
};
```

If you don't want to redirect users, you can disable this mechanism, as described in the [section below](#disabling-the-auto-redirect-mechanism).

## Disabling the auto-redirect mechanism

The `@vue-storefront/nuxt` module includes an auto-redirect mechanism that performs a server-side redirect to different URLs based on the target locale.

You can disable this by setting `autoRedirectByLocale` to `false` in the `i18n` configuration object.

```js
// nuxt.config.js

export default {
  i18n: {
    autoRedirectByLocale: false,
  },
};
```

## Currency detection

In addition to language detection, we also set currency based on locale. You can configure it in `nuxt.config.js` with the `vueI18n.numberFormats` property.

For more configuration options of `numberFormats` entries, please check [Intl.NumberFormat()](https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/intl/numberformat) documentation.

```js
// nuxt.config.js

export default {
  i18n: {
    vueI18n: {
      numberFormats: {
        en: {
          currency: {
            style: 'currency',
            currency: 'USD',
            currencyDisplay: 'symbol',
          },
        },
        // ...other locales
      },
    },
  },
};
```

**Please note that only one currency can be set for each locale.**

If this is a limitation for you, or if you don't want to have currencies tied to locales, you can disable this mechanism and provide your own.

To disable it, set `autoChangeCookie.currency` to `false` as described in the [section below](#configuring-the-auto-cookie-change).

## Configuring the Auto Cookie Change

You can configure how `@vue-storefront/nuxt` handles cookie cookie changes when the locale changes with the `autoChangeCookie` object.

The `autoChangeCookie` object holds three properties that are direct linked to `currency`, `locale` and `country`. These properties control how the module will handle cookie changes.

If set to `false`, the module won't change any cookie based on configurations or browser locale, so the `{INTEGRATION}` will handle that.

```js
// nuxt.config.js

export default {
  buildModules: [
    [
      '@vue-storefront/{INTEGRATION}/nuxt',
      {
        i18n: {
          useNuxtI18nConfig: true,
        },
      },
    ],
  ],
  i18n: {
    locales: [
      {
        code: 'en',
        label: 'English',
        file: 'en.js',
        iso: 'en',
      },
      {
        code: 'de',
        label: 'German',
        file: 'de.js',
        iso: 'de',
      },
    ],
    defaultLocale: 'en',
    autoChangeCookie: {
      currency: false,
      locale: false,
      country: false,
    },
  },
};
```

## Configuring cookie attributes

You can overwrite the default `locale`, `currency` and `country` cookie attributes set by `@vue-storefront/nuxt` or add custom attributes.

Just create a `cookieOptions` object for the `i18n` configuration object in the `nuxt.config.js` file and specify the attributes you'd like the cookies to have.

```js
// nuxt.config.js

export default {
  i18n: {
    cookieOptions: {
      // default attributes used by the `@vue-storefront/nuxt` module
      path: '/',
      sameSite: 'lax',
      expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    },
  },
};
```
