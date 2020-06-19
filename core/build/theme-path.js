const path = require('path')
const detectInstalled = require('detect-installed')
const config = require('./config.json')
const fs = require("fs")

// TODO: Refactor and simplify themePath resoultion
let themePath = ''
let themeName = config.theme
if (detectInstalled.sync(config.theme, { local: true })) {
  themePath = path.resolve(__dirname, '../../node_modules/' + themeName)
}
else {
  themeName = themeName.replace('@vue-storefront/theme-', '')
  themePath = path.resolve(__dirname, '../../src/themes/' + themeName)
  if(!fs.existsSync(themePath)) {
    console.error(`
      The theme you want to use does not exist.
      Please use 'vsf init' or install manualy one of our official themes:
      - https://github.com/DivanteLtd/vsf-capybara#--installation
      - https://github.com/DivanteLtd/vsf-default#--installation
    `)
    process.exit(1)
  }
}

module.exports = themePath
