import webpack from 'webpack'
import { readFileSync } from 'fs'

const readLastCommit = () => {
  try {
    return String(readFileSync('./../../../version'))
  } catch (_) {
    return ''
  }
}

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
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: '#fff' },
  router: {
    extendRoutes (routes, resolve) {
      // TEMPORARY, will be removed
      // @todo move to common middleware in core module and cover use case where we don't have slug at all
      // aka URL dispatcher
      routes.push({
        name: 'category',
        path: '/c/:slug_1/:slug_2?/:slug_3?/:slug_4?/:slug_5?',
        component: resolve(__dirname, 'pages/Category.vue')
      })
      routes.push({
        name: 'product',
        path: '/p/:slug/',
        component: resolve(__dirname, 'pages/Product.vue')
      })
      routes.push({ // TEMPORARY: just to show example prismic page
        name: 'prismic',
        path: '/prismic',
        component: resolve(__dirname, 'pages/Prismic.vue')
      })
      routes.push({
        name: 'checkout',
        path: '/checkout',
        component: resolve(__dirname, 'pages/Checkout.vue'),
        children: [
          {
            path: 'personal-details',
            name: 'personal-details',
            component: resolve(__dirname, 'pages/Checkout/PersonalDetails.vue'),
          },
          {
            path: 'shipping',
            name: 'shipping',
            component: resolve(__dirname, 'pages/Checkout/Shipping.vue'),
          },
          {
            path: 'payment',
            name: 'payment',
            component: resolve(__dirname, 'pages/Checkout/Payment.vue'),
          },
          {
            path: 'order-review',
            name: 'order-review',
            component: resolve(__dirname, 'pages/Checkout/OrderReview.vue'),
          },
          {
            path: 'thank-you',
            name: 'thank-you',
            component: resolve(__dirname, 'pages/Checkout/ThankYou.vue'),
          }
        ]
      })
    }
  },
  buildModules: [
    '@nuxt/typescript-build' // to core
  ],
  modules: [
    '@nuxtjs/prismic',
    ['@vue-storefront/nuxt', {
      coreDevelopment: true,
      useRawSource: {
        dev: ['@vue-storefront/commercetools-composables'],
        prod: ['@vue-storefront/commercetools-composables']
      }
    }]
  ],
  plugins: [
    './plugins/commercetools.js',
    './prismic/plugins/html-serializer.js',
  ],
  prismic: {
    endpoint: 'https://lovecrafts-dev.cdn.prismic.io/api/v2'
  },
  build: {
    transpile: [
      'vee-validate/dist/rules'
    ],
    plugins: [
      new webpack.DefinePlugin({
        'process.VERSION': JSON.stringify({
          version: require('./package.json').version,
          lastCommit: readLastCommit()
        })
      })
    ]
  }
}
