const path = require('path')

let baseClientConfig = require('./webpack.client.config')

const theme = require('../build/config.json').theme
const themeRoot = '../../src/themes/' + theme + '/'

let extendedConfig = require(path.join(themeRoot, 'webpack.config.js'))

module.exports = extendedConfig(baseClientConfig, {
  isClient: true,
  isDev: false
})
