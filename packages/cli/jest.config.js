// @ts-check

/**
 * Jest's configuration object.
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  ...require('../jest.base.config.js'),
  preset: 'ts-jest/presets/js-with-babel-esm', // or other ESM presets
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
    // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
};
