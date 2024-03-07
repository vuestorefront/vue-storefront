const { baseConfig } = require("@vue-storefront/jest-config");

module.exports = {
  ...baseConfig,
  coveragePathIgnorePatterns: ["<rootDir>/src/api-extractor-data.ts"],
};
