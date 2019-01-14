const path = require('path')
const merge = require('webpack-merge')
const baseClientConfig = require('./webpack.client.config')
const themeRoot = require('./theme-path')
const extendedConfig = require(path.join(themeRoot, '/webpack.config.js'))
const CompressionPlugin = require('compression-webpack-plugin')

const prodClientConfig = merge(baseClientConfig, {
  mode: 'production',
  plugins: [
    new CompressionPlugin() 
  ]
})

module.exports = extendedConfig(prodClientConfig, {
  isClient: true,
  isDev: false
})
