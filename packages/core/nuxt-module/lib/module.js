// TODO proper bundling, for now it's just to experiment with nuxt modules api
const fs = require('fs');
const path = require('path');
const log = require('./helpers/log');
const merge = require('./helpers/merge');
const resolveDependency = require('./helpers/resolveDependency');
const performanceModule = require('./modules/performance');
const storefrontUiModule = require('./modules/storefront-ui');
const rawSourcesModule = require('./modules/raw-sources-loader');

module.exports = function VueStorefrontNuxtModule (moduleOptions) {
  const defaultOptions = {
    coreDevelopment: false,
    performance: {
      httpPush: true,
      purgeCSS: {
        enabled: false,
        paths: [
          '**/*.vue'
        ]
      }
    },
    useRawSource: {
      dev: [],
      prod: []
    }
  };

  const options = merge(defaultOptions, moduleOptions);

  // Add meta data
  this.options.head.meta.push({
    name: 'generator',
    content: 'Vue Storefront 2'
  });

  log.info('Starting Vue Storefront Nuxt Module');

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
  this.addPlugin(path.resolve(__dirname, 'plugins/ssr.js'));
  log.success('Installed Vue Storefront SSR plugin');

  // Logger plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugins/logger.js'),
    options: moduleOptions.logger || {}
  });
  log.success('Installed VSF Logger plugin');

  // Context plugin
  this.addPlugin(path.resolve(__dirname, 'plugins/e2e-testing.js'))
  log.success('Installed Vue Storefront E2E testing plugin');

  // i18n-cookies plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugins/i18n-cookies.js'),
    options: this.options.i18n
  });
  log.success('Installed Internationalization Cookies plugin');

  // StorefrontUI module
  if (fs.existsSync(resolveDependency('@storefront-ui/vue'))) {
    storefrontUiModule.call(this, options);
    log.success('Installed StorefrontUI Module');
  }

  // Performance module
  performanceModule.call(this, options);
  log.success('Installed Performance Module');

  // Raw sources loader
  rawSourcesModule.call(this, options);
};

module.exports.meta = require('../package.json');
