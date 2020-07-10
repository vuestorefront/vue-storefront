import webpack from 'webpack';

const integrationConfig = {
  api: {
    uri: 'https://api.commercetools.com/vsf-ct-dev/graphql',
    authHost: 'https://auth.sphere.io',
    projectKey: 'vsf-ct-dev',
    clientId: 'xlea3xo3vcavMN5kmDlFP4nu',
    clientSecret: 'JejrKtQgU_KkNxPn_96UEAaEoPocNFqy',
    scopes: [
      'create_anonymous_token:vsf-ct-dev',
      'manage_my_orders:vsf-ct-dev',
      'manage_my_profile:vsf-ct-dev',
      'manage_my_shopping_lists:vsf-ct-dev',
      'manage_my_payments:vsf-ct-dev',
      'view_products:vsf-ct-dev',
      'view_published_products:vsf-ct-dev'
    ]
  },
  locale: 'en',
  acceptLanguage: ['en', 'de'],
  currency: 'USD',
  country: 'US',
  countries: [
    { name: 'US',
      label: 'United States' },
    { name: 'AT',
      label: 'Austria' },
    { name: 'DE',
      label: 'Germany' },
    { name: 'NL',
      label: 'Netherlands' }
  ],
  currencies: [
    { name: 'EUR',
      label: 'Euro' },
    { name: 'USD',
      label: 'Dollar' }
  ],
  locales: [
    { name: 'en',
      label: 'English' },
    { name: 'de',
      label: 'German' }
  ],
  cookies: {
    currencyCookieName: 'vsf-currency',
    countryCookieName: 'vsf-country',
    localeCookieName: 'vsf-locale'
  }
};

const localeNames = integrationConfig.locales.map(l => ({ code: l.name, file: `${l.name}.js`, iso: l.name }));

export default {
  mode: 'universal',
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport',
        content: 'width=device-width, initial-scale=1' },
      { hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico' }
    ]
  },
  loading: { color: '#fff' },
  router: {
    middleware: ['checkout']
  },
  buildModules: [
    // to core
    '@nuxt/typescript-build',
    ['@vue-storefront/nuxt', {
      // @core-development-only-start
      coreDevelopment: true,
      // @core-development-only-end
      useRawSource: {
        dev: [
          '@vue-storefront/commercetools',
          '@vue-storefront/core'
        ],
        prod: [
          '@vue-storefront/commercetools',
          '@vue-storefront/core'
        ]
      }
    }],
    // @core-development-only-start
    ['@vue-storefront/nuxt-theme', {
      apiClient: '@vue-storefront/commercetools-api',
      composables: '@vue-storefront/commercetools'
    }],
    // @core-development-only-end
    ['@vue-storefront/commercetools-nuxt', integrationConfig]
  ],
  modules: [
    'nuxt-i18n',
    'cookie-universal-nuxt',
    'vue-scrollto/nuxt'
  ],
  build: {
    transpile: [
      'vee-validate/dist/rules'
    ],
    plugins: [
      new webpack.DefinePlugin({
        'process.VERSION': JSON.stringify({
          // eslint-disable-next-line global-require
          version: require('./package.json').version,
          lastCommit: process.env.LAST_COMMIT || ''
        })
      })
    ]
  },
  i18n: {
    locales: localeNames,
    defaultLocale: localeNames[0].code,
    lazy: true,
    seo: true,
    langDir: 'lang/',
    vueI18n: {
      fallbackLocale: localeNames[0].code
    },
    detectBrowserLanguage: {
      cookieKey: integrationConfig.cookies.localeCookieName,
      alwaysRedirect: true
    }
  }
};
