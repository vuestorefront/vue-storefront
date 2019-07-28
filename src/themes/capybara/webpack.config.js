// You can extend default webpack build here. Read more on docs: https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Working%20with%20webpack.md
const webpack = require('webpack')
const fs = require('fs');

let componentsToOverride;

fs.readdir('./src/themes/capybara/components/_overrides', (_err, files) => {
  componentsToOverride = files
});

module.exports = function (config, { isClient, isDev }) {
  // Sufficient for prod, not for dev due to requirement of development server restart after adding new file
  // eslint-disable-next-line prefer-arrow-callback
  config.default.plugins.push(new webpack.NormalModuleReplacementPlugin(/(.*)Sf(\.*)/, function (resource) {
    // Can be added as a part of regexp
    const folders = ['atoms', 'molecules', 'organisms']
    const files = componentsToOverride
    folders.forEach(folder => {
      files.forEach(file => {
        file = file.split('.')[0]
        if (resource.request.includes('./src/components/' + folder + '/' + file + '/' + file + '.vue')) {
          resource.request = resource.request.replace('./src/components/' + folder + '/' + file + '/' + file + '.vue', '../../../src/themes/capybara/components/_overrides/' + file + '.vue')
        }
      })
    })
  }))
  return config
}
