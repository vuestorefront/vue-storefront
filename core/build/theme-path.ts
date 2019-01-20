import path from 'path'
import detectInstalled from 'detect-installed'
const config = require('./config.json')

let themePath = ''
let themeName = config.theme

if (detectInstalled.sync(config.theme, { local: true })) {
  themePath = path.resolve(__dirname, '../../node_modules/' + themeName)
}
else {
  themeName = themeName.replace('@vue-storefront/theme-', '')
  themePath = path.resolve(__dirname, '../../src/themes/' + themeName)
}

export default themePath

module.exports = themePath
