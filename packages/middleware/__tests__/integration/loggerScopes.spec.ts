import request from "supertest";
import { Server } from "http";
import { createServer, getLogger } from "../../src/index";

const Logger = {
  info: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
  warning: jest.fn(),
  notice: jest.fn(),
  emergency: jest.fn(),
  alert: jest.fn(),
  critical: jest.fn(),
};

const testingExtension = {
  name: "testing-extension",
  extendApp({ logger }) {
    logger.info("testing!");
  },
  extendApiMethods: {
    addedCustomEndpoint(context) {
      const logger = getLogger(context);
      logger.info("some log");
      return {};
    },
    overwriteAlokaiMetadata(context) {
      const logger = getLogger(context);
      logger.info("some log", {
        alokai: {
          context: "storefront-hacking!",
        },
        author: "John",
      } as any); // Skipping TypeScript guard
    },
    setCookieHeader(context) {
      const logger = getLogger(context);
      logger.info("some log");
      return {};
    },
    async reuseOtherMethod(context) {
      const logger = getLogger(context);
      logger.info("some log");
      return await context.api.success();
    },
    async resueOtherIntegrationMethod(context) {
      const logger = getLogger(context);
      logger.info("resueOtherIntegrationMethod log");
      const int = await context.getApiClient("replicated_integration");
      return await int.api[
        "replicated-integration-extension"
      ].orchestrationTest();
    },
    async paralellOrchestrationTest(context) {
      const logger = getLogger(context);
      logger.info("resueOtherIntegrationMethod log");
      // paralell_replicated_integration
      const int = await context.getApiClient("replicated_integration");
      const int2 = await context.getApiClient(
        "paralell_replicated_integration"
      );
      // await int.api["replicated-integration-extension"].orchestrationTest();
      // await int2.api.successParalell();
      return await Promise.all([
        int.api["replicated-integration-extension"].orchestrationTest(),
        int2.api.successParalell(),
      ]);
    },
  },
  hooks(_req, _res, alokai) {
    const logger = getLogger(alokai);
    logger.info("hooks");
    return {
      beforeCall({ args, logger }) {
        logger.info("bc1");
        return args;
      },
      beforeCreate(a) {
        const logger = getLogger(a);
        logger.info("bc2");
        return a;
      },
      afterCall({ response, logger }) {
        logger.info("after1");
        return response;
      },
      afterCreate(a) {
        const logger = getLogger(a);
        logger.info("after2");
        return a;
      },
    };
  },
};

const namespacedTestingExtension = {
  name: "namespaced-testing-extension",
  isNamespaced: true,
  extendApiMethods: {
    setCookieHeader(context) {
      const logger = getLogger(context);
      logger.info("some log");
      return {};
    },
  },
};

const replicatedIntegrationExtension = {
  name: "replicated-integration-extension",
  isNamespaced: true,
  extendApiMethods: {
    async orchestrationTest(context) {
      const logger = getLogger(context);
      logger.info("test");
      return await context.api.success();
    },
  },
};

/**
 * The following test suite is responsible for making sure
 * logs have proper scopes attached when printed from different places
 * inside extension and integration.
 */
describe("[Integration] Logger scopes", () => {
  let app: Server;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(async () => {
    app = await createServer({
      logger: {
        handler: Logger,
      },
      integrations: {
        test_integration: {
          configuration: {},
          location: "./__tests__/integration/bootstrap/server",
          logger: {
            handler: Logger,
          },
          extensions() {
            return [testingExtension as any, namespacedTestingExtension as any];
          },
        },
        replicated_integration: {
          configuration: {},
          location: "./__tests__/integration/bootstrap/server",
          logger: {
            handler: Logger,
          },
          extensions() {
            return [
              testingExtension as any,
              replicatedIntegrationExtension as any,
            ];
          },
        },
        paralell_replicated_integration: {
          configuration: {},
          location: "./__tests__/integration/bootstrap/server",
          logger: {
            handler: Logger,
          },
          extensions() {
            return [
              testingExtension as any,
              replicatedIntegrationExtension as any,
            ];
          },
        },
      },
    });
  });

  it("prevents overwriting 'alokai' metadata object", async () => {
    await request(app).post("/test_integration/overwriteAlokaiMetadata");

    expect(Logger.info).toBeCalledWith(expect.any(String), {
      alokai: {
        context: "middleware", // not "storefront-hacking!"
        scope: {
          extensionName: "testing-extension",
          functionName: "overwriteAlokaiMetadata",
          integrationName: "test_integration",
          type: "endpoint",
        },
      },
      author: "John",
    });
  });

  describe("scope of log from", () => {
    test("handler from the integration", async () => {
      await request(app).post("/test_integration/success");

      expect(Logger.info).toBeCalledWith(expect.any(String), {
        alokai: {
          context: "middleware",
          scope: {
            extensionName: undefined,
            functionName: "success",
            integrationName: "test_integration",
            type: "endpoint",
          },
        },
      });
    });

    test("handler added in the extension", async () => {
      await request(app).post("/test_integration/addedCustomEndpoint");

      expect(Logger.info).toBeCalledWith(expect.any(String), {
        alokai: {
          context: "middleware",
          scope: {
            extensionName: "testing-extension",
            functionName: "addedCustomEndpoint",
            integrationName: "test_integration",
            type: "endpoint",
          },
        },
      });
    });

    test("handler overwritten in the extension (without namespace)", async () => {
      await request(app).post("/test_integration/setCookieHeader");

      expect(Logger.info).toBeCalledWith(expect.any(String), {
        alokai: {
          context: "middleware",
          scope: {
            extensionName: "testing-extension",
            functionName: "setCookieHeader",
            integrationName: "test_integration",
            type: "endpoint",
          },
        },
      });
    });

    test("handler overwritten in the extension (with namespace)", async () => {
      await request(app).post(
        "/test_integration/namespaced-testing-extension/setCookieHeader"
      );

      expect(Logger.info).toBeCalledWith(expect.any(String), {
        alokai: {
          context: "middleware",
          scope: {
            extensionName: "namespaced-testing-extension",
            functionName: "setCookieHeader",
            integrationName: "test_integration",
            type: "endpoint",
          },
        },
      });
    });

    test("hooks method in the extension", async () => {
      await request(app).post("/test_integration/setCookieHeader");

      expect(Logger.info).toBeCalledWith("hooks", {
        alokai: {
          context: "middleware",
          scope: {
            extensionName: "testing-extension",
            functionName: "setCookieHeader",
            integrationName: "test_integration",
            hookName: "hooks",
            type: "requestHook",
          },
        },
      });
    });

    test("hooks method in the extension triggered when calling another method from different extension but same integration", async () => {
      await request(app).post(
        "/test_integration/namespaced-testing-extension/setCookieHeader"
      );

      expect(Logger.info).toBeCalledWith(expect.any(String), {
        alokai: {
          context: "middleware",
          scope: {
            extensionName: "testing-extension",
            functionName: "setCookieHeader",
            integrationName: "test_integration",
            hookName: "hooks",
            type: "requestHook",
          },
        },
      });
    });

    test("beforeCreate hook in the extension", async () => {
      await request(app).post("/test_integration/setCookieHeader");

      expect(Logger.info).toBeCalledWith(expect.any(String), {
        alokai: {
          context: "middleware",
          scope: {
            extensionName: "testing-extension",
            functionName: "setCookieHeader",
            integrationName: "test_integration",
            hookName: "beforeCreate",
            type: "requestHook",
          },
        },
      });
    });

    test("beforeCall hook in the extension", async () => {
      await request(app).post("/test_integration/setCookieHeader");

      expect(Logger.info).toBeCalledWith(expect.any(String), {
        alokai: {
          context: "middleware",
          scope: {
            extensionName: "testing-extension",
            functionName: "setCookieHeader",
            integrationName: "test_integration",
            hookName: "beforeCall",
            type: "requestHook",
          },
        },
      });
    });

    test("afterCreate hook in the extension", async () => {
      await request(app).post("/test_integration/setCookieHeader");

      expect(Logger.info).toBeCalledWith(expect.any(String), {
        alokai: {
          context: "middleware",
          scope: {
            extensionName: "testing-extension",
            functionName: "setCookieHeader",
            integrationName: "test_integration",
            hookName: "afterCreate",
            type: "requestHook",
          },
        },
      });
    });

    test("afterCall hook in the extension", async () => {
      await request(app).post("/test_integration/setCookieHeader");

      expect(Logger.info).toBeCalledWith(expect.any(String), {
        alokai: {
          context: "middleware",
          scope: {
            extensionName: "testing-extension",
            functionName: "setCookieHeader",
            integrationName: "test_integration",
            hookName: "afterCall",
            type: "requestHook",
          },
        },
      });
    });

    test("handler reused in custom handler", async () => {
      await request(app).post("/test_integration/reuseOtherMethod");

      expect(Logger.info).toBeCalledWith(expect.any(String), {
        alokai: {
          context: "middleware",
          scope: {
            extensionName: "testing-extension",
            functionName: "reuseOtherMethod",
            integrationName: "test_integration",
            type: "endpoint",
          },
        },
      });
      expect(Logger.info).toBeCalledWith(expect.any(String), {
        alokai: {
          context: "middleware",
          scope: {
            functionName: "success",
            integrationName: "test_integration",
            type: "endpoint",
          },
        },
      });
    });

    test("different integration called from extension", async () => {
      await request(app).post("/test_integration/resueOtherIntegrationMethod");

      expect(Logger.info).toBeCalledWith(expect.any(String), {
        alokai: {
          context: "middleware",
          scope: {
            extensionName: "testing-extension",
            functionName: "resueOtherIntegrationMethod",
            integrationName: "test_integration",
            type: "endpoint",
          },
        },
      });
      expect(Logger.info).toBeCalledWith(expect.any(String), {
        alokai: {
          context: "middleware",
          scope: {
            extensionName: "replicated-integration-extension",
            functionName: "orchestrationTest",
            integrationName: "replicated_integration",
            type: "endpoint",
          },
        },
      });
      expect(Logger.info).toBeCalledWith(expect.any(String), {
        alokai: {
          context: "middleware",
          scope: {
            functionName: "success",
            integrationName: "replicated_integration",
            type: "endpoint",
          },
        },
      });
    });

    test("multiple different integrations called paralelly from extension", async () => {
      await request(app).post("/test_integration/paralellOrchestrationTest");

      expect(Logger.info).toBeCalledWith(expect.any(String), {
        alokai: {
          context: "middleware",
          scope: {
            extensionName: "testing-extension",
            functionName: "paralellOrchestrationTest",
            integrationName: "test_integration",
            type: "endpoint",
          },
        },
      });
      expect(Logger.info).toBeCalledWith(expect.any(String), {
        alokai: {
          context: "middleware",
          scope: {
            extensionName: "replicated-integration-extension",
            functionName: "orchestrationTest",
            integrationName: "replicated_integration",
            type: "endpoint",
          },
        },
      });
      expect(Logger.info).toBeCalledWith(expect.any(String), {
        alokai: {
          context: "middleware",
          scope: {
            functionName: "success",
            integrationName: "replicated_integration",
            type: "endpoint",
          },
        },
      });
      expect(Logger.info).toBeCalledWith(expect.any(String), {
        alokai: {
          context: "middleware",
          scope: {
            functionName: "successParalell",
            integrationName: "paralell_replicated_integration",
            type: "endpoint",
          },
        },
      });
    });

    test("extendApp", async () => {
      await createServer({
        logger: {
          handler: Logger,
        },
        integrations: {
          test_integration: {
            configuration: {},
            location: "./__tests__/integration/bootstrap/server",
            logger: {
              handler: Logger,
            },
            extensions() {
              return [
                testingExtension as any,
                namespacedTestingExtension as any,
              ];
            },
          },
          replicated_integration: {
            configuration: {},
            location: "./__tests__/integration/bootstrap/server",
            logger: {
              handler: Logger,
            },
            extensions() {
              return [
                testingExtension as any,
                replicatedIntegrationExtension as any,
              ];
            },
          },
        },
      });

      expect(Logger.info).toBeCalledWith(expect.any(String), {
        alokai: {
          context: "middleware",
          scope: {
            integrationName: "test_integration",
            extensionName: "testing-extension",
            type: "bootstrapHook",
            hookName: "extendApp",
          },
        },
      });
    });

    test("init function", async () => {
      await createServer({
        logger: {
          handler: Logger,
        },
        integrations: {
          test_integration: {
            configuration: {},
            location: "./__tests__/integration/bootstrap/serverWithInitFn",
            logger: {
              handler: Logger,
            },
            extensions() {
              return [
                testingExtension as any,
                namespacedTestingExtension as any,
              ];
            },
          },
        },
      });

      expect(Logger.info).toBeCalledWith(expect.any(String), {
        alokai: {
          context: "middleware",
          scope: {
            integrationName: "test_integration",
            type: "bootstrapHook",
            hookName: "init",
          },
        },
      });
    });

    test("onCreate function", async () => {
      const app = await createServer({
        logger: {
          handler: Logger,
        },
        integrations: {
          test_integration: {
            configuration: {},
            location: "./__tests__/integration/bootstrap/server",
            logger: {
              handler: Logger,
            },
          },
        },
      });
      await request(app).post("/test_integration/success");

      expect(Logger.info).toBeCalledWith(expect.any(String), {
        alokai: {
          context: "middleware",
          scope: {
            integrationName: "test_integration",
            functionName: "success",
            type: "requestHook",
            hookName: "onCreate",
          },
        },
      });
    });
  });
});
