// TODO: make this file work with ts after https://github.com/vuestorefront/engineering-toolkit/pull/40/files
const { baseConfig } = require("@vue-storefront/jest-config");

module.exports = {
  ...baseConfig,
  // globalSetup: "./__tests__/integration/__config__/jest.setup.global.ts",
  // globalTeardown: "./__tests__/integration/__config__/jest.teardown.global.ts",
  // setupFilesAfterEnv: ["./__tests__/integration/__config__/jest.setup.ts"],
};
