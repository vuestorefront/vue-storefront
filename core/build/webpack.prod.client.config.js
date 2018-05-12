const path = require('path')

const baseClientConfig = require('./webpack.client.config')

const themeRoot = require('./theme-path')
const extendedConfig = require(path.join(themeRoot, '/webpack.config.js'))

module.exports = extendedConfig(baseClientConfig, {
  mode: 'production',
  isClient: true,
  isDev: false
})
