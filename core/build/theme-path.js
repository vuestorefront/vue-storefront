const path = require('path')
const detectInstalled = require('detect-installed')
const config = require('./config.json')

let themePath = '';

if (detectInstalled.sync(config.theme, { local: true })) {
  themePath = path.resolve(__dirname, '../../node_modules/' + config.theme)
}
else {
  const themeName = config.theme.replace('@vue-storefront/theme-', '')
  themePath = path.resolve(__dirname, '../../src/themes/' + themeName)
}

module.exports = themePath
