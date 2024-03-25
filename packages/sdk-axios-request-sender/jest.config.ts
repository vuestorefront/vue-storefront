import { baseConfig } from "@vue-storefront/jest-config";

export default {
  ...baseConfig,
  testMatch: ["<rootDir>/**/*spec.[jt]s?(x)"],
};
