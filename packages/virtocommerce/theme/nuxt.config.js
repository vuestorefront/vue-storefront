import webpack from 'webpack';

export default {
  ssr: true,
  server: {
    port: 3000,
    host: '127.0.0.1'
  },
  head: {
    title: 'VirtoCommerce integration with Vue Storefront',
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

  buildModules: [
    // to core
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources',
    ['@vue-storefront/nuxt', {
      logger: { // new section here
        verbosity: 'debug' // verbosity
      },
      // @core-development-only-start
      coreDevelopment: true,
      // @core-development-only-end
      useRawSource: {
        dev: [
          '@vue-storefront/virtocommerce',
          '@vue-storefront/core'
        ],
        prod: [
          '@vue-storefront/virtocommerce',
          '@vue-storefront/core'
        ]
      }
    }],
    // @core-development-only-start
    ['@vue-storefront/nuxt-theme', {
      generate: {
        replace: {
          apiClient: '@vue-storefront/virtocommerce-api',
          composables: '@vue-storefront/virtocommerce'
        }
      }
    }],
    // @core-development-only-end
    /* project-only-start
    ['@vue-storefront/nuxt-theme'],
    project-only-end */
    ['@vue-storefront/virtocommerce/nuxt', {
      api: {
        uri: 'http://127.0.0.1:3000'
      },
      store: "Electronics",
      currency: "USD",
      locale: "en-US",
      catalogId: "4974648a41df4e6ea67ef2ad76d7bbd4",
      countries: [
        { name: 'US',
          label: 'United States' },
        { name: 'AT',
          label: 'Austria' },
        { name: 'DE',
          label: 'Germany' },
        { name: 'NL',
          label: 'Netherlands' }
      ]
    }]
  ],
  modules: [
    'nuxt-i18n',
    'cookie-universal-nuxt',
    'vue-scrollto/nuxt',
    '@nuxtjs/proxy'  
  ],
  proxy: {
    '/graphql': {
      target: 'http://localhost:10645/graphql',
      pathRewrite: {
        '^/graphql' : '/'
        }
      },
      '/connect/token': {
        target: 'http://localhost:10645/connect/token',
        pathRewrite: {
          '^/connect/token' : '/'
          }      
      },
    },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: {
          welcome: 'Welcome 1'
        },
        de: {
          welcome: 'Welcome 2'
        }
      }
    }
  },
  styleResources: {
    scss: [require.resolve('@storefront-ui/shared/styles/_helpers.scss', { paths: [process.cwd()] })]
  },
  build: {
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    },
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
  }
};
