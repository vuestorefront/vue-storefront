module.exports = {
  rootDir: '../../',
  moduleFileExtensions: [
    'js',
    'ts',
    'json',
    'vue'
  ],
  testMatch: [
    '<rootDir>/src/**/test/unit/**/*.spec.(js|ts)',
    '<rootDir>/core/**/test/unit/**/*.spec.(js|ts)',
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
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!lodash)'
  ],
  setupFiles: [
    '<rootDir>/test/unit/setupTestEnvironment.js'
  ]
}
