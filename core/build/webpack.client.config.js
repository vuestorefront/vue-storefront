const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const HTMLPlugin = require('html-webpack-plugin')
const path = require('path')
const fs = require('fs')
const themeRoot = require('./theme-path')
const themedIndex = path.join(themeRoot, 'index.template.html')

const config = merge(base, {
  entry: {
    'core-service-worker': path.resolve(__dirname, '../service-worker/index.js')
  },
  output: {
    path: path.resolve(__dirname, '../../dist'),
    publicPath: '/dist/',
    filename: '[name].js'
  },
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

module.exports = config;

