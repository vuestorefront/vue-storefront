const baseConfig = require('./../../jest.base.config');

module.exports = {
  ...baseConfig,
  transform: {
    ...baseConfig.transform,
    '^.+\\.(js)$': 'ts-jest'
  }
};
