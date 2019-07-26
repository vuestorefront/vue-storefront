// You can extend default webpack build here. Read more on docs: https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Working%20with%20webpack.md
const AliasRegexhOverridePlugin = require('alias-regex-webpack-plugin')
const webpack = require('webpack')

module.exports = function (config, { isClient, isDev }) {
  // eslint-disable-next-line prefer-arrow-callback
  config.default.plugins.push(new webpack.NormalModuleReplacementPlugin(/(.*)Sf(\.*)/, function (resource) {
    const folders = ['atoms', 'molecules', 'organisms']
    // todo scan dir _overrides
    const files = ['SfProductCard']
    folders.forEach(folder => {
      files.forEach(file => {
        if (resource.request.includes('./src/components/' + folder + '/' + file + '/' + file + '.vue')) {
          resource.request = resource.request.replace('./src/components/' + folder + '/' + file + '/' + file + '.vue', '../../../src/themes/capybara/components/_overrides/' + file + '.vue')
        }
      })
    })
  }))
  return config
}
