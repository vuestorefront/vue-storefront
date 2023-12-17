import { MiddlewareConfig } from "@vue-storefront/middleware";

export default {
  integrations: {
    test_integration: {
      location: "../../../middleware/__tests__/integration/bootstrap/server",
      configuration: {},
    },
  },
} satisfies MiddlewareConfig;
