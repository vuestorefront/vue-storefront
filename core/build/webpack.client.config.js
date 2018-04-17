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
        'index.html',
        'https://fonts.googleapis.com/icon?family=Material+Icons',
        'https://fonts.googleapis.com/css?family=Montserrat:300,400,400i,500,600,700,800',
        'https://unpkg.com/flexboxgrid2@7.1.0/flexboxgrid2.css',
        'https://fonts.googleapis.com/css?family=Playfair+Display:400,400i,700,700i,900',
        'https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,700',
        'https://fonts.gstatic.com/s/materialicons/v36/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
        'https://fonts.gstatic.com/s/playfairdisplay/v13/nuFiD-vYSZviVYUb_rj3ij__anPXDTzYgEM86xQ.woff2',
        'https://fonts.gstatic.com/s/playfairdisplay/v13/nuFlD-vYSZviVYUb_rj3ij__anPXBYf9lW4e5j5hNKc.woff2',
        'https://fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmSU5fBBc4AMP6lQ.woff2',
        'https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
        'https://fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmWUlfBBc4AMP6lQ.woff2'
      ],
      runtimeCaching: [
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
      },{
        urlPattern:'/api/catalog/*', /** cache products catalog */
        method: "post",
        options: {
          origin: 'http://localhost:8080',
          debug: true
        },
        handler: "networkFirst"
      },{
        urlPattern:'/api/*', /** cache products catalog */
        method: "post",
        options: {
          origin: 'https://demo.vuestorefront.io/',
          debug: true
        },
        handler: "networkFirst"
      }],
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
