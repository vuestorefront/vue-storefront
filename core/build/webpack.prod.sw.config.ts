import webpack from 'webpack'
import merge from 'webpack-merge'
import base from './webpack.prod.client.config'
import glob from 'glob'

import { GenerateSW } from 'workbox-webpack-plugin'

var additionalManifestEntries = glob.sync('{dist,assets}/**/*.{woff,woff2,eot,ttf,svg,png,jpg,jpeg,json}')

module.exports = merge(base, {
  entry: {
    'core-service-worker': ['@babel/polyfill', './core/service-worker/index.js']
  },
  output: {
    globalObject: 'this'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"client"'
    }),
    new GenerateSW({
      mode: 'debug',
      cacheId: 'vsf-precache',
      swDest: 'service-worker.js',
      importScriptsViaChunks: ['core-service-worker'],
      additionalManifestEntries,
      inlineWorkboxRuntime: true,
      skipWaiting: true,
      cleanupOutdatedCaches: true,
      navigationPreload: true,
      include: [
        /\/(dist|assets)\/.+\.(woff|woff2|eot|ttf|json|svg|png|jpg|jpeg)$/
      ],
      runtimeCaching: [
        {
          urlPattern: '/',
          handler: 'NetworkFirst'
        }
      ]
    })
  ]
})
