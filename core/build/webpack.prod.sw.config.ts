import webpack from 'webpack'
import merge from 'webpack-merge'
import base from './webpack.prod.client.config'

import { GenerateSW } from 'workbox-webpack-plugin'

module.exports = merge(base, {
  entry: {
    'app': [],
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
      mode: 'develop',
      cacheId: 'vsf-precache',
      swDest: 'service-worker.js',
      importScriptsViaChunks: ['core-service-worker'],
      inlineWorkboxRuntime: true,
      skipWaiting: true,
      cleanupOutdatedCaches: true,
      include: [
        /\/(dist|assets)\/.+\.(woff|woff2|eot|ttf|json|svg|png|jpg|jpeg|js)$/
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
