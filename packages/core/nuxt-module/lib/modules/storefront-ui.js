const merge = require('../helpers/merge');
const resolveDependency = require('../helpers/resolveDependency');

function loadStorefrontRawSources (options) {
  const rawSources = [
    '@storefront-ui/vue',
    '@storefront-ui/shared'
  ];

  options.useRawSource = merge(options.useRawSource, {
    dev: rawSources,
    prod: rawSources
  });
}

function loadStorefrontStylesAndVariables () {
  this.options.styleResources = {
    scss: [
      resolveDependency('@storefront-ui/shared/styles/_helpers.scss')
    ]
  };

  this.options.css.push(resolveDependency('@storefront-ui/vue/styles.scss'));

  this.addModule('@nuxtjs/style-resources');
}

module.exports = function VueStorefrontPerformanceModule (options) {
  loadStorefrontRawSources.call(this, options);
  loadStorefrontStylesAndVariables.call(this);
};
