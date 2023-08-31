// @ts-check
const baseConfig = require('../jest.base.config.js');

/**
 * Jest's configuration object.
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  ...baseConfig,
  preset: 'ts-jest/presets/js-with-babel-esm',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  transform: {
    '^.+\\.m?[tj]sx?$': [
      'ts-jest',
      {
        useESM: true
      }
    ]
  }
};
