const baseConfig = require('./../../jest.base.config');

module.exports = {
  ...baseConfig,
  coverageReporters: ['html', 'lcov', 'text'],
  rootDir: __dirname,
  setupFilesAfterEnv: ['./__tests__/setup.ts'],
  watchPathIgnorePatterns: ['/node_modules/'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/src/context.d.ts',

    // Ignore mocked composables
    'Billing',
    'Shipping',

    // TODO: https://github.com/DivanteLtd/vue-storefront/issues/5136
    '<rootDir>/src/getters/cartGetters.ts',
    '<rootDir>/src/getters/checkoutGetters.ts',
    '<rootDir>/src/getters/userGetters.ts',
    '<rootDir>/src/getters/productGetters.ts'
  ]
};
