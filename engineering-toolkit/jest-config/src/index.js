// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  baseConfig: {
    preset: "ts-jest",
    transform: {
      "^.+\\.(j|t)s$": "ts-jest",
    },
    coverageDirectory: "./coverage/",
    collectCoverageFrom: ["src/**/*.ts"],
    testMatch: ["<rootDir>/**/__tests__/**/*spec.[jt]s?(x)"],
  },
};
