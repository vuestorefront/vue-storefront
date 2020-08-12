import webpack from 'webpack';
import localeConfig from './lang/config';

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
  buildModules: [
    // to core
    '@nuxt/typescript-build',
    'nuxt-composition-api',
    ['@vue-storefront/nuxt', {
      // @core-development-only-start
      coreDevelopment: true,
      // @core-development-only-end
      useRawSource: {
        dev: [
          '@vue-storefront/about-you',
          '@vue-storefront/core'
        ],
        prod: [
          '@vue-storefront/about-you',
          '@vue-storefront/core'
        ]
      }
    }],
    // @core-development-only-start
    ['@vue-storefront/nuxt-theme', {
      generate: {
        replace: {
          apiClient: '@vue-storefront/about-you-api',
          composables: '@vue-storefront/about-you'
        }
      }
    }],
    // @core-development-only-end
    /* project-only-start
    ['@vue-storefront/nuxt-theme'],
    project-only-end */
    ['@vue-storefront/about-you/nuxt', {
      api: {
        host: 'https://boston.backbone-api.demo.aboutyou.cloud/v1/',
        auth: {
          username: 'aboutyou',
          password: 'OmNErAb96Y5Qn75SFhXr'
        }
      },
      imgUrl: 'https://mt1.dam.demo.aboutyou.cloud/boston'
    }]
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
  i18n: localeConfig
};
