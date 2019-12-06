// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  transform: {
    "\\.(gql|graphql)$": "jest-transform-graphql",
    "^.+\\.(ts)$": "ts-jest"
  },
  setupFilesAfterEnv: ['./tests/setup.ts']
};
