// You can extend default webpack build here. Read more on docs: https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Working%20with%20webpack.md
const path = require('path')
const sfuiOverride = require('../../../core/scripts/sfui-override')

sfuiOverride.override()

module.exports = function (config, { isClient, isDev }) {
  config.default.resolve.alias['@storefrontui/vue$'] = path.join(__dirname, '../../../core/build/tmp/sfui-override.js')
  return config
}
