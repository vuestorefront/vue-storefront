// TODO proper bundling, for now it;'s just to experiment with nuxt modules api
const consola = require('consola')
const path = require('path')



module.exports = async function VueStorefrontNuxtModule (moduleOptions) {
  const defaultOptions = {
    coreDevelopment: false,
    useRawSource: true
  }

  const options = { ...defaultOptions, ...moduleOptions }

  consola.info('`VSF:` Starting Vue Storefront Nuxt Module')

  this.addPlugin(path.resolve(__dirname, 'plugins/composition-api.js'))

  // Using symlinks in lerna somehow breaks composition API behavior as a singleton
  if (options.coreDevelopment) {
    consola.info('`VSF:` Vue Storefront core development mode is on [coreDevelopment]')
    this.extendBuild(config => {
      config.resolve.alias['@vue/composition-api'] = path.resolve('node_modules/@vue/composition-api')
    })
  }

  if (options.useRawSource) {
    const rawSourcePackages = {
      '@vue-storefront/composables': '@vue-storefront/composables/raw.ts',
      '@vue-storefront/api-client': '@vue-storefront/api-client/src/index.ts'
    }
    
    for (const package in rawSourcePackages) {
      consola.info(`\`VSF:\` Using raw source for ${package} [useRawSource]`)
      this.extendBuild(config => {
        config.resolve.alias[package] = rawSourcePackages[package]
      })
      this.options.build.transpile.push(package)
    }
  }
}

module.exports.meta = require('../package.json')
