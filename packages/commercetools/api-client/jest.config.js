const baseConfig = require('./../../jest.base.config');

module.exports = {
  ...baseConfig,
  transform: {
    ...baseConfig.transform,
    '\\.(gql|graphql)$': 'jest-transform-graphql'
  },
  moduleNameMapper: {
    'api-client(.*)$': '<rootDir>$1'
  }
};
