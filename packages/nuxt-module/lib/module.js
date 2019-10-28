// TODO proper bundling, for now it;'s just to experiment with nuxt modules api
const consola = require('consola')
const path = require('path')



module.exports = async function VueStorefrontNuxtModule (moduleOptions) {
  // TODO make arrays available as functions to extend
  const isProd = process.env.NODE_ENV === 'production'
  const defaultOptions = {
    coreDevelopment: false,
    useRawSource: {
      prod: [
        '@vue-storefront/composables',
        '@vue-storefront/api-client',
        '@storefront-ui/vue',
        '@storefront-ui/shared'
      ],
      dev: [
        '@storefront-ui/vue',
        '@storefront-ui/shared'
      ]
    }
  }
  // TODO: Use lodash/merge
  const options = { ...defaultOptions, ...moduleOptions }

  consola.info('`VSF:` Starting Vue Storefront Nuxt Module')
  this.addPlugin(path.resolve(__dirname, 'plugins/composition-api.js'))

  //------------------------------------

  // Using symlinks in lerna somehow breaks composition API behavior as a singleton.
  if (options.coreDevelopment) {
    consola.info('`VSF:` Vue Storefront core development mode is on [coreDevelopment]')
    this.extendBuild(config => {
      config.resolve.alias['@vue/composition-api'] = path.resolve('node_modules/@vue/composition-api')
    })
  }

  //------------------------------------

  const useRawSource = (package) => {
    const pkgPath = path.resolve('node_modules/'+ package)
    const pkg = require(pkgPath + '/package.json')

    if (pkg.module) {
      this.extendBuild(config => {
        config.resolve.alias[pkg.name + '$'] = path.resolve(pkgPath, pkg.module)
      })
    }
    this.options.build.transpile.push(package)
    consola.info(`\`VSF:\` Using raw source for ${pkg.name} [useRawSource]`)
  }

  // always use raw source on core development mode
  options.useRawSource[isProd || options.coreDevelopment ? 'prod' : 'dev'].map(package => {
    useRawSource(package)
  })
}

module.exports.meta = require('../package.json')
