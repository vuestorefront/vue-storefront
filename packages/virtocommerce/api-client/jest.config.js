const baseConfig = require('./../../jest.base.config');

module.exports = {
  ...baseConfig,
  transform: {
    ...baseConfig.transform,
    '\\.(gql|graphql)$': 'jest-transform-graphql'
  },
  setupFilesAfterEnv: ['./__tests__/setup.ts'],
  moduleNameMapper: {
    'api-client(.*)$': '<rootDir>$1'
  }
};
