const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const HTMLPlugin = require('html-webpack-plugin')
const path = require('path')
const fs = require('fs')
const themeRoot = require('./theme-path')
const themedIndex = path.join(themeRoot, 'index.template.html')
const themedIndexAmphtml = path.join(themeRoot, 'index.template.html')

const config = merge(base, {
  output: {
    path: path.resolve(__dirname, '../../dist'),
    publicPath: '/dist/',
    filename: '[name].js'
  },
  optimization: {
    splitChunks:  {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
    runtimeChunk: 'single',
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
    }),
    // generate output HTML for AMPHTML
    new HTMLPlugin({
      template: fs.existsSync(themedIndexAmphtml) ? themedIndexAmphtml : 'src/index.template.amphtml.html'
    })
  ]
})

module.exports = config;
