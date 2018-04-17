const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const vueConfig = require('./vue-loader.config')
const HTMLPlugin = require('html-webpack-plugin')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')

const config = merge(base, {
  resolve: {
    alias: {
      'create-api': './create-api-client.js'
    }
  },
  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    // generate output HTML
    new HTMLPlugin({
      template: 'src/index.template.html'
    })
  ]
})

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    // minify JS
    new UglifyJSPlugin(),
    // auto generate service worker
    new SWPrecachePlugin({
      cacheId: 'vue-sfr',
      filename: 'service-worker.js',
      staticFileGlobsIgnorePatterns: [/\.map$/],
      staticFileGlobs: [
        'dist/**.*',
        'assets/**.*',
        'assets/ig/**.*',
        'index.html'
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
        urlPattern: "/api/*",
        handler: "networkFirst"
      },{
        urlPattern: "/api/catalog/*",
        handler: "fastest"
      },{
        urlPattern: "/assets/logo.svg",
        handler: "networkFirst"
      },{
        urlPattern: "/index.html",
        handler: "fastest"
      },{
        urlPattern: "/assets/*",
        handler: "networkFirst"
      },{
        urlPattern: "/assets/ig/(.*)",
        handler: "networkFirst"
      },{
        urlPattern: "/dist/(.*)",
        handler: "fastest"
      },
      "importScripts": ['/service-worker-ext.js'] /* custom logic */
    })
  )
}

const configSW = merge({}, base); // this is basicaly a work-around to compile the service workers extensions as they are not included nowhere but in service worker only
const themeRoot = require('./theme-path')

configSW.entry =  {
  'service-worker-ext': themeRoot + '/service-worker-ext.js',
}
configSW.output =  {
  path: path.resolve(__dirname, '../../dist'),
  publicPath: '/dist/',
  filename: '[name].js'
},

module.exports = [config, configSW];
