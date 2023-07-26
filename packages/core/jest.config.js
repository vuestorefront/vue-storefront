const baseConfig = require('../jest.base.config');

module.exports = {
  ...baseConfig,
  collectCoverage: true,
  setupFilesAfterEnv: [
    './__tests__/setup.ts'
  ]
};
