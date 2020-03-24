const baseConfig = require('./../../jest.base.config');

module.exports = {
  ...baseConfig,
  rootDir: __dirname,
  setupFilesAfterEnv: ['./__tests__/setup.ts']
};
