const omit = require('lodash/omit')

/**
 * clear config properties that shouldn't be visible on frontend
 */
module.exports = function loader(source) {
  let config = JSON.parse(source);

  const purgeConfig = (config.purgeConfig || []).slice()

  config = omit(config, purgeConfig)

  delete config['purgeConfig']

  return JSON.stringify(config);
}
