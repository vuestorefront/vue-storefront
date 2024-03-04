import { baseConfig } from "@vue-storefront/jest-config";

export default {
  ...baseConfig,
  globalSetup: "./src/__tests__/integration/__config__/jest.setup.global.ts",
  globalTeardown:
    "./src/__tests__/integration/__config__/jest.teardown.global.ts",
  // setupFilesAfterEnv: ["./__tests__/integration/__config__/jest.setup.ts"],
};
