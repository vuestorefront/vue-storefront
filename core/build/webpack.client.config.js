const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const HTMLPlugin = require('html-webpack-plugin')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const path = require('path')
const fs = require('fs')
const themeDirectory = require('./theme-path')
const themedIndex = path.join(themeDirectory, 'index.template.html')

const config = merge(base, {
  mode: 'development',
  resolve: {
    alias: {
      'create-api': './create-api-client.js'
    }
  },
  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"client"'
    }),
    // generate output HTML
    new HTMLPlugin({
      template: fs.existsSync(themedIndex) ? themedIndex : 'src/index.template.html'
    })
  ]
})

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
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
      }],
      "importScripts": ['/dist/core-service-worker.js'] /* custom logic */
    })
  )
}

const configSW = merge({}, base); // this is basicaly a work-around to compile the service workers extensions as they are not included nowhere but in service worker only

configSW.entry = {
  'core-service-worker': path.resolve(__dirname, '../service-worker/index.js')
}
configSW.output =  {
  path: path.resolve(__dirname, '../../dist'),
  publicPath: '/dist/',
  filename: '[name].js'
},

module.exports = [config, configSW];
