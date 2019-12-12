export default {
  mode: 'universal',
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
        name: 'custom',
        path: '/l/:slug_1/:slug_2?/:slug_3?/:slug_4?/:slug_5?',
        component: resolve(__dirname, 'pages/Category.vue')
      })
    }
  },
  buildModules: [
    '@nuxt/typescript-build' // to core
  ],
  plugins: [
    '~/plugins/commercetools'
  ],
  modules: [
    ['@vue-storefront/nuxt', {
      coreDevelopment: true,
      useRawSource: {
        dev: ['@vue-storefront/commercetools-composables'],
        prod: ['@vue-storefront/commercetools-composables']
      }
    }]
  ],
  plugins: ['./plugins/commercetools.js']
}
