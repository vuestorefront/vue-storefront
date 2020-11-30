module.exports = {
  transform: {
    '^.+\\.(ts)$': 'ts-jest'
  },
  coverageDirectory: './coverage/',
  collectCoverageFrom: [
    'src/**/*.ts'
  ],
  collectCoverage: true,
  coverageReporters: ['html', 'lcov', 'text'],
  rootDir: __dirname,
  watchPathIgnorePatterns: ['/node_modules/'],
  setupFilesAfterEnv: [
    './__tests__/setup.ts'
  ]
};
