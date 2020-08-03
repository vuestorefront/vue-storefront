import webpack from 'webpack';

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
    ],
    script: [
      { src: 'https://cdn.checkout.com/js/framesv2.min.js' }
      // { src: 'https://x.klarnacdn.net/kp/lib/v1/api.js' }
    ]
  },
  loading: { color: '#fff' },
  router: {
    middleware: ['checkout']
  },
  buildModules: [
    // to core
    '@nuxt/typescript-build',
    'nuxt-composition-api',
    ['@vue-storefront/nuxt', {
      coreDevelopment: true,
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
      generate: {
        replace: {
          apiClient: '@vue-storefront/commercetools-api',
          composables: '@vue-storefront/commercetools'
        }
      }
    }],
    // @core-development-only-end
    /* project-only-start
    ['@vue-storefront/nuxt-theme'],
    project-only-end */
    ['@vue-storefront/commercetools/nuxt', {
      disableGenerateTokenMiddleware: false,
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
      }
    }]
  ],
  modules: [
    ['@vue-storefront/checkout-com/nuxt', {
      publicKey: 'pk_test_8638c4e2-e44a-407f-a5f3-594a8503bcd0',
      secretKey: 'sk_test_99323ae8-d688-4005-a98d-1567cca0f9d8',
      ctApiUrl: 'https://play-commercetools.cko-playground.ckotech.co'
    }],
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
    locales: [
      {
        code: 'en',
        file: 'en.js',
        iso: 'en'
      },
      {
        code: 'de',
        file: 'de.js',
        iso: 'de'
      }
    ],
    defaultLocale: 'en',
    lazy: true,
    seo: true,
    langDir: 'lang/',
    vueI18n: {
      fallbackLocale: 'en'
    },
    detectBrowserLanguage: {
      cookieKey: 'vsf-locale',
      alwaysRedirect: true
    }
  }
};
