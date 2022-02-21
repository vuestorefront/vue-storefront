// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
const { resolve } = require('path');

module.exports = {
  transform: {
    '\\.[jt]s?$': 'ts-jest'
  },
  coverageDirectory: './coverage/',
  coverageReporters: ['html', 'lcov', 'text'],
  collectCoverageFrom: [
    'src/**/*.ts'
  ],
  moduleFileExtensions: ['ts', 'js', 'json'],
  watchPathIgnorePatterns: ['**/node_modules'],
  testMatch: ['<rootDir>/**/__tests__/**/*spec.[jt]s?(x)'],
  globals: {
    'ts-jest': {
      useESM: true,
      tsconfig: resolve(__dirname, './tsconfig.test.json')
    }
  }
};
