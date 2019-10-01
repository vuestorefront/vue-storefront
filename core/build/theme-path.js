const path = require('path')
const detectInstalled = require('detect-installed')
const config = require('./config.json')
const fs = require('fs')

// const projectRoot = '../../src'
const projectRoot = path.resolve(process.env.BASE_PATH || process.cwd());
const srcRoot = path.resolve(projectRoot + '/src');

// TODO: Refactor and simplify themePath resoultion
let themePath = ''
let themeName = config.theme

if (detectInstalled.sync(config.theme, { local: true })) {
  themePath = path.resolve(__dirname, projectRoot + '/node_modules/' + themeName)
}
else {
  themeName = themeName.replace('@vue-storefront/theme-', '')
  themePath = path.resolve(__dirname, projectRoot + '/themes/' + themeName)
  if (!fs.existsSync(themePath)) themePath = path.resolve('./src/themes/' + themeName)
}

module.exports = themePath
