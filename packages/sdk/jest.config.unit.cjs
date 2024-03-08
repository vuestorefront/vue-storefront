// TODO: make this file work with ts after https://github.com/vuestorefront/engineering-toolkit/pull/40/files
const { baseConfig } = require("@vue-storefront/jest-config");

module.exports = {
  ...baseConfig,
  coveragePathIgnorePatterns: ["<rootDir>/src/api-extractor-data.ts"],
};
