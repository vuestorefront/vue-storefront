const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')

module.exports = merge(base, {
  mode: 'production',
  target: 'web',
  entry: './core/service-worker/index.js',
  output: {
    filename: 'core-service-worker.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"client"'
    }),
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
