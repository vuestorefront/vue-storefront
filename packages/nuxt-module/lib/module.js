// TODO proper bundling, for now it;'s just to experiment with nuxt modules api
const consola = require('consola')
const path = require('path')
const fs = require("fs")
const { mergeWith, isArray } = require('lodash')

module.exports = function VueStorefrontNuxtModule (moduleOptions) {

  const isProd = process.env.NODE_ENV === 'production'
  const isSfuiInstalled = fs.existsSync(path.resolve('node_modules'))
  const defaultOptions = {
    coreDevelopment: false,
    useRawSource: {
      prod: isSfuiInstalled ? [
        '@storefront-ui/vue',
        '@storefront-ui/shared'
      ] : [],
      dev: isSfuiInstalled ? [
        '@storefront-ui/vue',
        '@storefront-ui/shared'
      ] : []
    }
  }

  const options = mergeWith(defaultOptions, moduleOptions, (objValue, srcValue) => {
    if (isArray(objValue)) {
      return objValue.concat(srcValue);
    }
  })

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
