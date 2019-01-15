const path = require('path')
const merge = require('webpack-merge')
const baseClientConfig = require('./webpack.client.config')
const themeRoot = require('./theme-path')
const extendedConfig = require(path.join(themeRoot, '/webpack.config.js'))

const prodClientConfig = merge(baseClientConfig, {
  mode: 'production'
})

module.exports = extendedConfig(prodClientConfig, {
  isClient: true,
  isDev: false
})
