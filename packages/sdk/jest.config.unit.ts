import { baseConfig } from "@vue-storefront/jest-config";

export default {
  ...baseConfig,
  coveragePathIgnorePatterns: ["<rootDir>/src/api-extractor-data.ts"],
};
