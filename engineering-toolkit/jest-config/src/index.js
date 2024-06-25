// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  baseConfig: {
    preset: "ts-jest",
    transform: {
      "^.+\\.(j|t)s$": ["ts-jest", { isolatedModules: true }],
    },
    coverageDirectory: "./coverage/",
    collectCoverageFrom: ["src/**/*.ts"],
    coverageReporters: ["clover", "json", "lcov" /* "text" */],
    testMatch: ["<rootDir>/**/__tests__/**/*spec.[jt]s?(x)"],
  },
};
