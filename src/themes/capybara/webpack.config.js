// You can extend default webpack build here. Read more on docs: https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Working%20with%20webpack.md
const path = require('path')
// TODO: adjust and move this to sfui
const sfuiOverride = require('../../../core/scripts/sfui-override')

sfuiOverride.generateNewRoot()

module.exports = function (config, { isClient, isDev }) {
  // TODO in next iteration, fix this issue
  const wpConfig = isDev ? config.default : config
  wpConfig.resolve.alias['@storefrontui/vue$'] = path.join(__dirname, '../../../core/build/tmp/sfui-override.js')
  return config
}
