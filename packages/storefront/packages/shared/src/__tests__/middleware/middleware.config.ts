import { MiddlewareConfig } from "@vue-storefront/middleware";

export default {
  integrations: {
    test_integration: {
      location: "./testIntegration",
      configuration: {},
    },
  },
} satisfies MiddlewareConfig;
