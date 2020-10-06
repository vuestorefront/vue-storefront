// TODO proper bundling, for now it's just to experiment with nuxt modules api
const path = require('path')
const fs = require("fs")
const consola = require('consola')
const chalk = require('chalk');
const { mergeWith, isArray } = require('lodash')
const chokidar = require('chokidar')
const registerLogger = require('@vue-storefront/core').registerLogger

const log = {
  info: (message) => consola.info(chalk.bold('VSF'), message),
  success: (message) => consola.success(chalk.bold('VSF'), message),
  warning: (message) => consola.warning(chalk.bold('VSF'), message),
  error: (message) => consola.error(chalk.bold('VSF'), message)
}

module.exports = function VueStorefrontNuxtModule (moduleOptions) {

  const isProd = process.env.NODE_ENV === 'production';
  const isSfuiInstalled = fs.existsSync(require.resolve('@storefront-ui/vue'));
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

  log.info(chalk.green('Starting Vue Storefront Nuxt Module'))
  log.success('Installed Composition API plugin for Vue 2')

  this.addPlugin(path.resolve(__dirname, 'plugins/ssr.js'))
  log.success('Installed VSF SSR plugin');

  this.addPlugin({
    src: path.resolve(__dirname, 'plugins/logger.js'),
    options: moduleOptions.logger || {}
  })
  log.success('Installed VSF Logger plugin');

  this.addModule('@nuxtjs/composition-api')
  log.success('Installed nuxt composition api module');

  //-------------------------------------

  // Using symlinks in lerna somehow breaks composition API behavior as a singleton.
  if (options.coreDevelopment === true) {
    log.info(`Vue Storefront core development mode is on ${chalk.italic('[coreDevelopment]')}`)
    if (moduleOptions.coreDevelopment) global.coreDev = true
    this.extendBuild(config => {
      config.resolve.alias['@vue/composition-api'] = require.resolve('@vue/composition-api');
    });
  }

  //------------------------------------

  const useRawSource = (package) => {
    const pkgPath = require.resolve(`${package}/package.json`);
    const pkg = require(pkgPath);

    if (pkg.module) {
      this.extendBuild(config => {
        config.resolve.alias[pkg.name + '$'] = require.resolve(`${package}/${pkg.module}`);
      });
    }
    this.options.build.transpile.push(package)
    log.info(`Using raw source/ESM for ${chalk.bold(pkg.name)} ${chalk.italic('[useRawSource]')}`)
  }

  // always use raw source on core development mode
  options.useRawSource[isProd || options.coreDevelopment ? 'prod' : 'dev'].map(package => {
    useRawSource(package);
  });
}

module.exports.meta = require('../package.json')
