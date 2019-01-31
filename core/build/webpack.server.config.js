const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const VueSSRPlugin = require('vue-ssr-webpack-plugin')

// when output cache is enabled generate cache version key
const config = require('config')
const fs = require('fs')
const path = require('path')
const uuid = require('uuid/v4')
if (config.server.useOutputCache) {
  fs.writeFileSync(
    path.join(__dirname, 'cache-version.json'),
    JSON.stringify(uuid())
  )
}

module.exports = merge(base, {
  mode: 'development',
  target: 'node',
  entry: ['babel-polyfill', './core/server-entry.ts'],
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    alias: {
      'create-api': './create-api-server.js'
    }
  },
  externals: Object.keys(require('../../package.json').dependencies),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"server"'
    }),
    new VueSSRPlugin()
  ]
})
