const baseConfig = require('./../jest.base.config');

module.exports = {
  ...baseConfig,
  setupFilesAfterEnv: ['./__tests__/setup.ts'],
  testMatch: ['<rootDir>/**/__tests__/**/*spec.[jt]s?(x)']
};
