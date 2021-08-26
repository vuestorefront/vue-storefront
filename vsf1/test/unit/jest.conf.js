const config = require('config')

module.exports = {
  rootDir: '../../',
  moduleFileExtensions: [
    'js',
    'ts',
    'json',
    'vue'
  ],
  testMatch: [
    '<rootDir>/src/modules/**/test/unit/**/*.spec.(js|ts)',
    `<rootDir>/src/themes/**/*.spec.(js|ts)`,
    '<rootDir>/core/**/test/unit/**/*.spec.(js|ts)'
  ],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.ts$': '<rootDir>/node_modules/ts-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
  },
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  coverageDirectory: '<rootDir>/test/unit/coverage',
  collectCoverageFrom: [
    'src/**/*.{js,ts,vue}',
    'core/**/*.{js,ts,vue}',
    '!src/**/types/*.{js,ts}',
    '!core/**/types/*.{js,ts}'
  ],
  moduleNameMapper: {
    '^src(.*)$': '<rootDir>/src$1',
    '^theme(.*)$': `<rootDir>/node_modules/${config.theme}$1`,
    '^.+\\.(css|less)$': '<rootDir>/test/unit/cssStub.js'
  },
  transformIgnorePatterns: [
    '(.*)storefront-query-builder/node_modules/(.*)',
    '<rootDir>/node_modules/(?!lodash)',
    '<rootDir>/node_modules/(?!lodash-es/.*)'
  ],
  setupFiles: [
    '<rootDir>/test/unit/setupTestEnvironment.ts'
  ]
}
