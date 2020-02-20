export default {
  mode: 'spa',

  /*
  ** Headers of the page
  */
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

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js dev-modules
  */
  modules: [
    ['@vue-storefront/nuxt', {
      coreDevelopment: true,
      useRawSource: {
        dev: ['@vue-storefront/about-you-composables'],
        prod: ['@vue-storefront/about-you-composables']
      }
    }]
  ],
  buildModules: [
  ],

  /*
  ** Nuxt.js modules
  */
  /*
  ** Build configuration
  */
  build: {

    /*
    ** You can extend webpack config here
    */
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    extend(config, ctx) {
    }
  }
};
