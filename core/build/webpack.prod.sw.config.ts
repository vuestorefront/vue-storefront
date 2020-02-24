import webpack from 'webpack';
import merge from 'webpack-merge';
import base from './webpack.base.config';
import SWPrecachePlugin from 'sw-precache-webpack-plugin';

const isSpa = process.argv.includes('--spa')

const staticFileGlobs = isSpa
  ? [
    '**.*.js',
    '**.*.json',
    '**.*.css',
    'assets/**.*',
    'assets/ig/**.*',
    'index.html',
    '/'
  ]
  : [
    'dist/**.*.js',
    'dist/**.*.json',
    'dist/**.*.css',
    'assets/**.*',
    'assets/ig/**.*',
    'index.html',
    '/'
  ]

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
    // auto generate service worker
    new SWPrecachePlugin({
      cacheId: 'vue-sfr',
      filename: 'service-worker.js',
      staticFileGlobsIgnorePatterns: [/\.map$/],
      staticFileGlobs,
      runtimeCaching: [
        {
          // eslint-disable-next-line no-useless-escape
          urlPattern: '^https://fonts\.googleapis\.com/', /** cache the html stub  */
          handler: 'cacheFirst'
        },
        {
          // eslint-disable-next-line no-useless-escape
          urlPattern: '^https://fonts\.gstatic\.com/', /** cache the html stub  */
          handler: 'cacheFirst'
        },
        {
          // eslint-disable-next-line no-useless-escape
          urlPattern: '^https://unpkg\.com/', /** cache the html stub  */
          handler: 'cacheFirst'
        },
        {
          urlPattern: '/pwa.html', /** cache the html stub  */
          handler: 'networkFirst'
        }, {
          urlPattern: '/', /** cache the html stub for homepage  */
          handler: 'networkFirst'
        },
        {
          urlPattern: '/p/*', /** cache the html stub  */
          handler: 'networkFirst'
        },
        {
          urlPattern: '/c/*', /** cache the html stub  */
          handler: 'networkFirst'
        },
        {
          urlPattern: '/img/(.*)',
          handler: 'fastest'
        },
        {
          urlPattern: /(http[s]?:\/\/)?(\/)?([^\/\s]+\/)?(api\/catalog\/)(.*)/g, // eslint-disable-line no-useless-escape
          handler: 'networkFirst'
        },
        {
          urlPattern: '/api/*',
          handler: 'networkFirst'
        }, {
          urlPattern: '/assets/logo.svg',
          handler: 'networkFirst'
        }, {
          urlPattern: '/index.html',
          handler: 'networkFirst'
        }, {
          urlPattern: '/assets/*',
          handler: 'fastest'
        }, {
          urlPattern: '/assets/ig/(.*)',
          handler: 'fastest'
        }, {
          urlPattern: isSpa ? '/(.*)' : '/dist/(.*)',
          handler: 'fastest'
        }, {
          urlPattern: '/*/*', /** this is new product URL format  */
          handler: 'networkFirst'
        },
        {
          urlPattern: '/*/*/*', /** this is new product URL format  */
          handler: 'networkFirst'
        },
        {
          urlPattern: '/*', /** this is new category URL format  */
          handler: 'networkFirst'
        }],
      'importScripts': [isSpa ? '/core-service-worker.js' : '/dist/core-service-worker.js'] /* custom logic */
    })
  ]
})
