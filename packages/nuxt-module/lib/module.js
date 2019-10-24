// TODO proper bundling, for now it;'s just to experiment with nuxt modules api
const consola = require('consola')
const path = require('path')



module.exports = async function VueStorefrontNuxtModule (moduleOptions) {
  // TODO: Use compiled source for project development and raw for project build - faster dev mode compilation with treeshaking in output bundle
  // TODO: ALWAYS use raw source for core development
 
  const defaultOptions = {
    coreDevelopment: false,
    useRawSource: true
  }

  const options = { ...defaultOptions, ...moduleOptions }

  consola.info('`VSF:` Starting Vue Storefront Nuxt Module')

  this.addPlugin(path.resolve(__dirname, 'plugins/composition-api.js'))

  // Using symlinks in lerna somehow breaks composition API behavior as a singleton.
  if (options.coreDevelopment) {
    consola.info('`VSF:` Vue Storefront core development mode is on [coreDevelopment]')
    this.extendBuild(config => {
      config.resolve.alias['@vue/composition-api'] = path.resolve('node_modules/@vue/composition-api')
    })
  }

  if (options.useRawSource) {
    // Set value to 'null' for transpilation without aliasing.
    const rawSourcePackages = {
      '@vue-storefront/composables': '@vue-storefront/composables/raw.ts',
      '@vue-storefront/api-client': '@vue-storefront/api-client/src/index.ts',
      '@storefront-ui/vue': null,
      '@storefront-ui/shared': null
    }
    
    for (const package in rawSourcePackages) {
      consola.info(`\`VSF:\` Using raw source for ${package} [useRawSource]`)

      if (rawSourcePackages[package]) {
        this.extendBuild(config => {
          config.resolve.alias[package] = rawSourcePackages[package]
        })
      }

      this.options.build.transpile.push(package)
    }
  }
}

module.exports.meta = require('../package.json')
