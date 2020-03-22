const baseConfig = require('./../../jest.base.config');

module.exports = {
  ...baseConfig,
  coverageReporters: ['html', 'lcov', 'text'],
  rootDir: __dirname,
  setupFilesAfterEnv: ['./__tests__/setup.ts'],
  testMatch: ['<rootDir>/**/__tests__/**/*spec.[jt]s?(x)'],
  watchPathIgnorePatterns: ['/node_modules/']
};
