const path = require('path')
const detectInstalled = require('detect-installed')
const config = require('./config.json')
const fs = require("fs")

const projectRoot = '../../src'

// TODO: Refactor and simplify themePath resoultion
let themePath = ''
let themeName = config.theme
if (detectInstalled.sync(config.theme, { local: true })) {
  themePath = path.resolve(__dirname, '../../node_modules/' + themeName)
}
else {
  themeName = themeName.replace('@vue-storefront/theme-', '')
  themePath = path.resolve(__dirname, projectRoot + '/themes/' + themeName)
  if(!fs.existsSync(themePath)) themePath = path.resolve(__dirname, projectRoot + '/themes/theme-' + themeName)
}

module.exports = themePath
