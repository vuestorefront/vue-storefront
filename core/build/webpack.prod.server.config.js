const path = require('path')

const baseServerConfig = require('./webpack.server.config')

const themeRoot = require('./theme-path')
const extendedConfig = require(path.join(themeRoot, '/webpack.config.js'))

module.exports = extendedConfig(baseServerConfig, {
  mode: 'production',
  isClient: false,
  isDev: false
})
