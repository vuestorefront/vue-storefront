const baseConfig = require('./../../jest.base.config');

module.exports = {
  ...baseConfig,
  moduleNameMapper: {
    'api-client(.*)$': '<rootDir>$1'
  }
};
