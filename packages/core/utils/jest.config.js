module.exports = {
  transform: {
    '^.+\\.(ts)$': 'ts-jest'
  },
  coverageDirectory: './coverage/',
  collectCoverageFrom: [
    'src/**/*.ts'
  ],
  collectCoverage: true
};
