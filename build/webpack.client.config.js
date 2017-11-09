const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const vueConfig = require('./vue-loader.config')
const HTMLPlugin = require('html-webpack-plugin')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
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
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // auto generate service worker
    new SWPrecachePlugin({
      cacheId: 'vue-sfr',
      filename: 'service-worker.js',
      staticFileGlobsIgnorePatterns: [/\.map$/],
      staticFileGlobs: [
        'dist/**.*',
        'assets/**.*',
        'index.html'
      ],      
      runtimeCaching: [
       {
        urlPattern: "/pwa.html", /** cache the html stub  */
        handler: "networkFirst"
      },
      {
        urlPattern: "/p/*", /** cache the html stub  */
        handler: "networkFirst"
      },
      {
        urlPattern: "/c/*", /** cache the html stub  */
        handler: "networkFirst"
      },
      {
        urlPattern: "/img/(.*)", 
        handler: "fastest"
      },{
        urlPattern: "/api/*", 
        handler: "cacheFirst"
      },{
        urlPattern: "/dist/logo.png",
        handler: "cacheFirst"
      },{
        urlPattern: "/index.html",
        handler: "cacheFirst"
      },{
        urlPattern: "/assets/*",
        handler: "cacheFirst"
      },{
        urlPattern: "/dist/(.*)",
        handler: "cacheFirst"
      },{
        urlPattern:'/api/catalog/*', /** cache products catalog */
        method: "post",
        options: {
          origin: 'http://localhost:8080',
          debug: true
        },
        handler: "cacheFirst"        
      },{
        urlPattern:'/api/*', /** cache products catalog */
        method: "post",
        options: {
          origin: 'https://demo.vuestorefront.io/',
          debug: true
        },
        handler: "cacheFirst"        
      }],
      "importScripts": ['/service-worker-ext.js'] /* custom logic */
    })
  )
}

const configSW = merge({}, base); // this is basicaly a work-around to compile the service workers extensions as they are not included nowhere but in service worker only

configSW.entry =  {
  'service-worker-ext': './src/service-worker-ext.js',
}
configSW.output =  {
  path: path.resolve(__dirname, '../dist'),
  publicPath: '/dist/',
  filename: '[name].js'
},

module.exports = [config, configSW];
