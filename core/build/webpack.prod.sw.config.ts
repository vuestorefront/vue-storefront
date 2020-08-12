import webpack from 'webpack'
import merge from 'webpack-merge'
import base from './webpack.base.config'

import { GenerateSW } from 'workbox-webpack-plugin'

module.exports = merge(base, {
  mode: 'production',
  target: 'web',
  entry: ['@babel/polyfill', './core/service-worker/index.js'],
  output: {
    filename: 'core-service-worker.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"client"'
    }),
    new GenerateSW({
      cacheId: 'vue-sfr',
      swDest: 'service-worker.js',
      inlineWorkboxRuntime: true,
      include: [
        // /\/dist\/.*\.js$/,
        // /\/dist\/.*\.json$/,
        // /\/dist\/.*\.css$/,
        // /\/assets\/.*/,
        // /\/pwa.html/,
        // /\//,
      ],
      exclude: [
        /\.map$/
      ],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
          handler: 'CacheFirst'
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
          handler: 'CacheFirst'
        },
        {
          urlPattern: /^https:\/\/unpkg\.com\//,
          handler: 'CacheFirst'
        },
        {
          urlPattern: '/',
          handler: 'NetworkFirst'
        },
        {
          urlPattern: /^\/c\/.*/,
          handler: 'NetworkFirst'
        },
        {
          urlPattern: /^\/p\/.*/,
          handler: 'NetworkFirst'
        },
        {
          urlPattern: /\.html$/,
          handler: 'NetworkFirst'
        },
        {
          urlPattern: /^\/img\//,
          handler: 'CacheFirst'
        },
        {
          urlPattern: /^\/assets\//,
          handler: 'CacheFirst'
        },
        {
          urlPattern: /^\/dist\//,
          handler: 'CacheFirst'
        },
        {
          urlPattern: /^\/api\//,
          handler: 'CacheFirst'
        }
      ],
      importScripts: ['/dist/core-service-worker.js']
    })
  ]
})
