const merge = require('../helpers/merge');

// TODO: Create a separate nuxt module for storefront ui
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

module.exports = function VueStorefrontPerformanceModule (options) {
  loadStorefrontRawSources.call(this, options);
};
