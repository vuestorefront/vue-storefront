const path = require('path')
const merge = require('webpack-merge')
const baseClientConfig = require('./webpack.client.config')
const themeRoot = require('./theme-path')
const extendedConfig = require(path.join(themeRoot, '/webpack.config.js'))
const SWPrecachePlugin = require('sw-precache-webpack-plugin')

const prodClientConfig = merge(baseClientConfig, {
  entry: {
    'core-service-worker': path.resolve(__dirname, '../src/core/service-worker/index.js')
  },
  mode: 'production',
  plugins: [
    // auto generate service worker
    new SWPrecachePlugin({
      cacheId: 'vue-sfr',
      filename: 'service-worker.js',
      staticFileGlobsIgnorePatterns: [/\.map$/],
      staticFileGlobs: [
        'dist/**.*',
        'assets/**.*',
        'assets/ig/**.*',
        'index.html',
        '/'
      ],
      runtimeCaching: [
        {
          urlPattern: "^https://fonts\.googleapis\.com/", /** cache the html stub  */
          handler: "cacheFirst"
        },
        {
          urlPattern: "^https://fonts\.gstatic\.com/", /** cache the html stub  */
          handler: "cacheFirst"
        },
        {
          urlPattern: "^https://unpkg\.com/", /** cache the html stub  */
          handler: "cacheFirst"
        },
        {
        urlPattern: "/pwa.html", /** cache the html stub  */
        handler: "fastest"
      },{
        urlPattern: "/", /** cache the html stub for homepage  */
        handler: "fastest"
      },
      {
        urlPattern: "/p/*", /** cache the html stub  */
        handler: "fastest"
      },
      {
        urlPattern: "/c/*", /** cache the html stub  */
        handler: "fastest"
      },
      {
        urlPattern: "/img/(.*)",
        handler: "fastest"
      },{
        urlPattern: "/api/catalog/*",
        handler: "fastest"
      },{
        urlPattern: "/api/*",
        handler: "networkFirst"
      },{
        urlPattern: "/assets/logo.svg",
        handler: "networkFirst"
      },{
        urlPattern: "/index.html",
        handler: "fastest"
      },{
        urlPattern: "/assets/*",
        handler: "fastest"
      },{
        urlPattern: "/assets/ig/(.*)",
        handler: "fastest"
      },{
        urlPattern: "/dist/(.*)",
        handler: "fastest"
      },{
        urlPattern: "/*/*", /** this is new product url format  */
        handler: "networkFirst"
      },
      {
        urlPattern: "/*/*/*", /** this is new product url format  */
        handler: "networkFirst"
      },
      {
        urlPattern: "/*", /** this is new category url format  */
        handler: "networkFirst"
      }],
      "importScripts": ['/dist/core-service-worker.js'] /* custom logic */
    })
  ]
})

module.exports = extendedConfig(prodClientConfig, {
  isClient: true,
  isDev: false
})
