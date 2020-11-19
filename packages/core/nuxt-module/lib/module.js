// TODO proper bundling, for now it's just to experiment with nuxt modules api
const path = require('path')
const fs = require("fs")
const consola = require('consola')
const chalk = require('chalk');
const { merge, mergeWith, isArray } = require('lodash')

const log = {
  info: (message) => consola.info(chalk.bold('VSF'), message),
  success: (message) => consola.success(chalk.bold('VSF'), message),
  warning: (message) => consola.warning(chalk.bold('VSF'), message),
  error: (message) => consola.error(chalk.bold('VSF'), message)
}

const resolveDependencyFromWorkingDir = name => {
  try {
    return require.resolve(name, { paths: [ process.cwd() ] })
  } catch (error) {
    return false;
  }
};

module.exports = function VueStorefrontNuxtModule (moduleOptions) {
  const isProd = process.env.NODE_ENV === 'production';
  const defaultRawSources = fs.existsSync(resolveDependencyFromWorkingDir('@storefront-ui/vue'))
    ? ['@storefront-ui/vue', '@storefront-ui/shared']
    : [];

  const defaultOptions = {
    coreDevelopment: false,
    performance : {
      httpPush: true
    },
    useRawSource: {
      prod: defaultRawSources,
      dev: defaultRawSources
    }
  }

  const options = mergeWith(defaultOptions, moduleOptions, (objValue, srcValue) => {
    if (isArray(objValue)) {
      return objValue.concat(srcValue);
    }
  })

  log.info(chalk.green('Starting Vue Storefront Nuxt Module'))

  // Add meta data
  this.options.head.meta.push({
    name: 'generator',
    content: 'Vue Storefront 2'
  });

  // Enable HTTP/2 push for JS files
  if (options.performance.httpPush) {
    this.options.render = merge(this.options.render, {
      http2: {
        push: true,
        pushAssets: (request, response, publicPath, preloadFiles) => {
          return preloadFiles
            .filter(({ asType }) => asType === 'script')
            .map(({ file, asType }) => `<${publicPath}${file}>; rel=preload; as=${asType}`);
        }
      }
    });
  }

  // Context plugin
  this.addPlugin(path.resolve(__dirname, 'plugins/context.js'))
  log.success('Installed Vue Storefront Context plugin');

  // SSR plugin
  this.addPlugin(path.resolve(__dirname, 'plugins/ssr.js'))
  log.success('Installed Vue Storefront SSR plugin');

  // Logger plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugins/logger.js'),
    options: moduleOptions.logger || {}
  })
  log.success('Installed VSF Logger plugin');

  // Composition API plugin
  this.addModule('@nuxtjs/composition-api')
  log.success('Installed nuxt Composition API Module');

  // Use raw sources in development mode
  const useRawSource = (package) => {
    const pkgPath = resolveDependencyFromWorkingDir(`${package}/package.json`);
    const pkg = require(pkgPath);

    if (pkg.module) {
      this.extendBuild(config => {
        config.resolve.alias[pkg.name + '$'] = resolveDependencyFromWorkingDir(`${package}/${pkg.module}`);
      });
    }
    this.options.build.transpile.push(package)
    log.info(`Using raw source/ESM for ${chalk.bold(pkg.name)} ${chalk.italic('[useRawSource]')}`)
  };

  options.useRawSource[isProd || options.coreDevelopment ? 'prod' : 'dev'].map(package => useRawSource(package));
}

module.exports.meta = require('../package.json')
