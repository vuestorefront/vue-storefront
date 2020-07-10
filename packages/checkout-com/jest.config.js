const baseConfig = require('./../jest.base.config');

module.exports = {
  ...baseConfig,
  coverageReporters: ['html', 'lcov', 'text'],
  rootDir: __dirname,
  // setupFilesAfterEnv: ['./__tests__/setup.ts'],
  watchPathIgnorePatterns: ['/node_modules/']
};
