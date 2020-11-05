const baseConfig = require('./../../jest.base.config');

module.exports = {
  ...baseConfig,
  coverageReporters: ['html', 'lcov', 'text'],
  rootDir: __dirname,
  setupFilesAfterEnv: ['./__tests__/setup.ts'],
  watchPathIgnorePatterns: ['/node_modules/'],
  coveragePathIgnorePatterns: [
    '/node_modules/',

    // Ignore mocked composables
    'Billing',
    'Shipping',

    // Need updating
    '<rootDir>/src/getters/cartGetters.ts',
    '<rootDir>/src/getters/checkoutGetters.ts',
    '<rootDir>/src/getters/userGetters.ts',
    '<rootDir>/src/getters/productGetters.ts'
  ]
};
