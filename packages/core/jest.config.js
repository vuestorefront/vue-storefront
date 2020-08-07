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
    'nuxt-composition-api': 'nuxt-composition-api/lib/cjs/entrypoint.js',
    '^@vue-storefront/cli/(.*?)$': '<rootDir>/cli/$1',
    '^@vue-storefront/nuxt-theme/(.*?)$': '<rootDir>/nuxt-theme-module/$1',
    '^@vue-storefront/(.*?)$': '<rootDir>/$1'
  },
  rootDir: __dirname,
  setupFilesAfterEnv: [
    './core/__tests__/setup.ts'
  ],
  testMatch: ['<rootDir>/**/__tests__/**/*spec.[jt]s?(x)']
};
