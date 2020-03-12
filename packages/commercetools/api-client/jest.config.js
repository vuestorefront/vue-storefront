const baseConfig = require('./../../jest.base.config');

module.exports = {
  ...baseConfig,
  transform: {
    ...baseConfig.transform,
    '\\.(gql|graphql)$': 'jest-transform-graphql'
  },
  setupFilesAfterEnv: ['./tests/setup.ts'],
  moduleNameMapper: {
    'api-client(.*)$': '<rootDir>$1'
  }
};
