module.exports = {
  description: 'Removed cookies from SSR',
  link: 'https://github.com/vuestorefront/vue-storefront/pull/6442',
  breakingChanges: [
    {
      module: 'core',
      before: 'Cookies for currency, locale and country were included in SSR response',
      after: 'Cookies for currency, locale and country are generated on client side',
      comment: 'To prevent generating cookies during SSR (server-side rendering) and allowing caching, change in the `nuxt.config.js` file is required. Inside the `i18n` configuration, you should set the `detectBrowserLanguage` options to `false`. Then change the order of loaded modules. In the `buildModules` configuration, move the `@vue-storefront/commercetools/nuxt` module before `@vue-storefront/nuxt`. Lastly, update the Vue components used to switch locales to use the `nuxt-link` component instead of the `a` tag. By default it\'s located in the `StoreLocaleSelector.vue` file.'
    }
  ],
  author: 'Dawid Ziobro',
  linkToGitHubAccount: 'https://github.com/dawid-ziobro'
};
