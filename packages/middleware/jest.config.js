const baseConfig = require('../jest.base.config');

module.exports = {
  ...baseConfig,
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!lodash-es)'
  ]
};
