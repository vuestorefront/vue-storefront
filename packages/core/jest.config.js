module.exports = {
  preset: 'ts-jest',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'lcov', 'text'],
  collectCoverageFrom: [
    './**/*.ts',
    '!./**/*.d.ts',
    '!**/__tests__/**/*.ts',
    // TODO add tests after factories
    '!theme-module/**/*'
  ],
  watchPathIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  moduleNameMapper: {
    '^@vue-storefront/(.*?)$': '<rootDir>/$1/src'
  },
  rootDir: __dirname,
  setupFilesAfterEnv: [
    './core/__tests__/setup.ts',
  ],
  testMatch: ['<rootDir>/**/__tests__/**/*spec.[jt]s?(x)']
};
