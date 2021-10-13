module.exports = {
  description: 'Removed cookies from SSR',
  link: 'https://github.com/vuestorefront/vue-storefront/pull/6442',
  breakingChanges: [
    {
      module: 'core',
      before: 'Cookies for currency, locale and country were included in SSR response',
      after: 'Cookies for currency, locale and country are generated on client side',
      comment: 'To make possible to remove cookies generation server side, change in `nuxt.config.js` is required. 1. Inside section `i18n` option `detectBrowserLanguage` should be set to `false`. 2. Next step is to change order of loaded modules in `nuxt.config.js`. In `buildModules` section, `@vue-storefront/commercetools/nuxt` should be moved before `@vue-storefront/nuxt`. 3. Last step is to change in layouts way of changing locales. As default it is an anchor (`a`), it needs to be changed to `nuxt-link`. As default it\'s located in `StoreLocaleSelector.vue` file.'
    }
  ],
  author: 'Dawid Ziobro',
  linkToGitHubAccount: 'https://github.com/dawid-ziobro'
};
