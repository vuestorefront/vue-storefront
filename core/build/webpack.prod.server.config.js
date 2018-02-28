const path = require('path')

let baseServerConfig = require('./webpack.server.config')

const theme = require('../build/config.json').theme
const themeRoot = '../../src/themes/' + theme + '/'

let extendedConfig = require(path.join(themeRoot, 'webpack.config.js'))

module.exports = extendedConfig(baseServerConfig, {
  isClient: false,
  isDev: false
})
