const baseConfig = require('./../../jest.base.config');

module.exports = {
  ...baseConfig,
  rootDir: __dirname,
  setupFilesAfterEnv: ['./__tests__/setup.ts'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/src/context.d.ts',

    // Ignore mocked composables
    'UserBilling',
    'UserShipping'
  ]
};
