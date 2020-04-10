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
    ]
  },
  loading: { color: '#fff' },
  plugins: [
    './plugins/about-you.js'
  ],
  buildModules: [
    // to core
    '@nuxt/typescript-build',
    ['@vue-storefront/nuxt', {
      coreDevelopment: true,
      useRawSource: {
        dev: [
          '@vue-storefront/about-you',
          '@vue-storefront/utils',
          '@vue-storefront/factories'
        ],
        prod: [
          '@vue-storefront/about-you',
          '@vue-storefront/utils',
          '@vue-storefront/factories'
        ]
      }
    }],
    ['@vue-storefront/nuxt-theme', {
      apiClient: '@vue-storefront/about-you-api',
      composables: '@vue-storefront/about-you'
    }]
  ],
  modules: [
    'nuxt-i18n'
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
  }
};
