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
    addedCustomEndpoint() {
      throw new Error("some error");
    },
    setCookieHeader(context) {
      const logger = getLogger(context);
      logger.info("some log");
      return {};
    },
    async reuseOtherMethod(context) {
      return await context.api.throwError();
    },
    async resueOtherIntegrationMethod(context) {
      const int = await context.getApiClient("replicated_integration");
      return await int.api.throwError();
    },
    async resueOtherIntegrationsExtensionMethod(context) {
      const int = await context.getApiClient("replicated_integration");
      return await int.api["replicated-integration-extension"].methodFromExt();
    },
    async resueOtherIntegrationsExtensionMethodCallingThrow(context) {
      const int = await context.getApiClient("replicated_integration");
      return await int.api[
        "replicated-integration-extension"
      ].methodFromExtCallingThrow();
    },
    async paralellOrchestrationTestFromExtensionFails(context) {
      // paralell_replicated_integration
      const int = await context.getApiClient("replicated_integration");
      const int2 = await context.getApiClient(
        "paralell_replicated_integration"
      );
      return await Promise.all([
        int.api["replicated-integration-extension"].methodFromExt(),
        int2.api.successParalell(),
      ]);
    },
    async paralellOrchestrationTest(context) {
      const int = await context.getApiClient("replicated_integration");
      const int2 = await context.getApiClient(
        "paralell_replicated_integration"
      );
      return await Promise.all([
        int.api["replicated-integration-extension"].ok(),
        int2.api.throwError(),
      ]);
    },
  },
  hooks(req, res, alokai) {
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
    setCookieHeader() {
      throw new Error("some error");
    },
  },
};

const replicatedIntegrationExtension = {
  name: "replicated-integration-extension",
  isNamespaced: true,
  extendApiMethods: {
    async ok() {
      return {};
    },
    async methodFromExt() {
      throw new Error("smth went wrong");
    },
    async methodFromExtCallingThrow(context) {
      return await context.api.throwError();
    },
  },
};

describe("[Integration] Logger error boundaries", () => {
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
        hooks_error_integration: {
          configuration: {},
          location: "./__tests__/integration/bootstrap/server",
          extensions() {
            return [
              {
                name: "throwing-hooks",
                hooks() {
                  throw new Error("something went wrong");
                  // return {};
                },
              },
            ];
          },
        },

        before_create_error_integration: {
          configuration: {},
          location: "./__tests__/integration/bootstrap/server",
          extensions() {
            return [
              {
                name: "throwing-hooks",
                hooks() {
                  return {
                    beforeCreate() {
                      throw new Error("something went wrong");
                    },
                  };
                },
              },
            ];
          },
        },

        after_create_error_integration: {
          configuration: {},
          location: "./__tests__/integration/bootstrap/server",
          extensions() {
            return [
              {
                name: "throwing-hooks",
                hooks() {
                  return {
                    afterCreate() {
                      throw new Error("something went wrong");
                    },
                  };
                },
              },
            ];
          },
        },

        before_call_error_integration: {
          configuration: {},
          location: "./__tests__/integration/bootstrap/server",
          extensions() {
            return [
              {
                name: "throwing-hooks",
                hooks() {
                  return {
                    beforeCall() {
                      throw new Error("something went wrong");
                    },
                  };
                },
              },
            ];
          },
        },

        after_call_error_integration: {
          configuration: {},
          location: "./__tests__/integration/bootstrap/server",
          extensions() {
            return [
              {
                name: "throwing-hooks",
                hooks() {
                  return {
                    afterCall() {
                      throw new Error("something went wrong");
                    },
                  };
                },
              },
            ];
          },
        },
      },
    });
  });

  describe("error boundary thrown at", () => {
    test("API method of the integration", async () => {
      await request(app).post("/test_integration/throwError");

      expect(Logger.error).toBeCalledWith(expect.any(Error), {
        alokai: {
          context: "middleware",
          scope: {
            functionName: "throwError",
            integrationName: "test_integration",
            type: "endpoint",
          },
          errorBoundary: {
            functionName: "throwError",
            integrationName: "test_integration",
            type: "endpoint",
          },
        },
      });
    });

    test("hooks factory", async () => {
      await request(app).post("/hooks_error_integration/success");

      expect(Logger.error).toBeCalledWith(expect.any(Error), {
        alokai: {
          context: "middleware",
          scope: {
            functionName: "success",
            integrationName: "hooks_error_integration",
            type: "endpoint",
          },
          errorBoundary: {
            integrationName: "hooks_error_integration",
            extensionName: "throwing-hooks",
            hookName: "hooks",
            type: "requestHook",
          },
        },
      });
    });

    test("beforeCreate hook", async () => {
      await request(app).post("/before_create_error_integration/success");

      expect(Logger.error).toBeCalledWith(expect.any(Error), {
        alokai: {
          context: "middleware",
          scope: {
            functionName: "success",
            integrationName: "before_create_error_integration",
            type: "endpoint",
          },
          errorBoundary: {
            integrationName: "before_create_error_integration",
            extensionName: "throwing-hooks",
            hookName: "beforeCreate",
            type: "requestHook",
          },
        },
      });
    });

    test("afterCreate hook", async () => {
      await request(app).post("/after_create_error_integration/success");

      expect(Logger.error).toBeCalledWith(expect.any(Error), {
        alokai: {
          context: "middleware",
          scope: {
            functionName: "success",
            integrationName: "after_create_error_integration",
            type: "endpoint",
          },
          errorBoundary: {
            integrationName: "after_create_error_integration",
            extensionName: "throwing-hooks",
            hookName: "afterCreate",
            type: "requestHook",
          },
        },
      });
    });

    test("beforeCall hook", async () => {
      await request(app).post("/before_call_error_integration/success");

      expect(Logger.error).toBeCalledWith(expect.any(Error), {
        alokai: {
          context: "middleware",
          scope: {
            functionName: "success",
            integrationName: "before_call_error_integration",
            type: "endpoint",
          },
          errorBoundary: {
            functionName: "success",
            integrationName: "before_call_error_integration",
            extensionName: "throwing-hooks",
            hookName: "beforeCall",
            type: "requestHook",
          },
        },
      });
    });

    test("afterCall hook", async () => {
      await request(app).post("/after_call_error_integration/success");

      expect(Logger.error).toBeCalledWith(expect.any(Error), {
        alokai: {
          context: "middleware",
          scope: {
            functionName: "success",
            integrationName: "after_call_error_integration",
            type: "endpoint",
          },
          errorBoundary: {
            functionName: "success",
            integrationName: "after_call_error_integration",
            extensionName: "throwing-hooks",
            hookName: "afterCall",
            type: "requestHook",
          },
        },
      });
    });

    test("extendApp hook", async () => {
      await expect(
        createServer({
          logger: {
            handler: Logger,
          },
          integrations: {
            test_integration: {
              configuration: {},
              location: "./__tests__/integration/bootstrap/server",
              extensions() {
                return [
                  testingExtension as any,
                  namespacedTestingExtension as any,
                ];
              },
            },

            extend_app_error_integration: {
              configuration: {},
              location: "./__tests__/integration/bootstrap/server",
              extensions() {
                return [
                  {
                    name: "throwing-extendapp",
                    extendApp() {
                      throw new Error("something went wrong");
                    },
                  },
                ];
              },
            },
          },
        })
      ).rejects.toThrow(expect.any(Error));

      expect(Logger.error).toBeCalledWith(expect.any(Error), {
        alokai: {
          context: "middleware",
          scope: {
            extensionName: "throwing-extendapp",
            integrationName: "extend_app_error_integration",
            type: "bootstrapHook",
            hookName: "extendApp",
          },
          errorBoundary: {
            extensionName: "throwing-extendapp",
            integrationName: "extend_app_error_integration",
            type: "bootstrapHook",
            hookName: "extendApp",
          },
        },
      });
    });

    test("custom endpoint", async () => {
      await request(app).post("/test_integration/addedCustomEndpoint");

      expect(Logger.error).toBeCalledWith(expect.any(Error), {
        alokai: {
          context: "middleware",
          scope: {
            functionName: "addedCustomEndpoint",
            integrationName: "test_integration",
            extensionName: "testing-extension",
            type: "endpoint",
          },
          errorBoundary: {
            functionName: "addedCustomEndpoint",
            integrationName: "test_integration",
            extensionName: "testing-extension",
            type: "endpoint",
          },
        },
      });
    });

    test("namespaced custom endpoint", async () => {
      await request(app).post(
        "/test_integration/namespaced-testing-extension/setCookieHeader"
      );

      expect(Logger.error).toBeCalledWith(expect.any(Error), {
        alokai: {
          context: "middleware",
          scope: {
            functionName: "setCookieHeader",
            integrationName: "test_integration",
            extensionName: "namespaced-testing-extension",
            type: "endpoint",
          },
          errorBoundary: {
            functionName: "setCookieHeader",
            integrationName: "test_integration",
            extensionName: "namespaced-testing-extension",
            type: "endpoint",
          },
        },
      });
    });

    test("endpoint reused in custom endpoint", async () => {
      await request(app).post("/test_integration/reuseOtherMethod");

      expect(Logger.error).toBeCalledWith(expect.any(Error), {
        alokai: {
          context: "middleware",
          scope: {
            extensionName: "testing-extension",
            functionName: "reuseOtherMethod",
            integrationName: "test_integration",
            type: "endpoint",
          },
          errorBoundary: {
            functionName: "throwError",
            integrationName: "test_integration",
            type: "endpoint",
          },
        },
      });
    });

    test("different integration called from extension", async () => {
      await request(app).post("/test_integration/resueOtherIntegrationMethod");

      expect(Logger.error).toBeCalledWith(expect.any(Error), {
        alokai: {
          context: "middleware",
          scope: {
            extensionName: "testing-extension",
            functionName: "resueOtherIntegrationMethod",
            integrationName: "test_integration",
            type: "endpoint",
          },
          errorBoundary: {
            functionName: "throwError",
            integrationName: "replicated_integration",
            type: "endpoint",
          },
        },
      });
    });

    test("different integration's extension called from extension", async () => {
      await request(app).post(
        "/test_integration/resueOtherIntegrationsExtensionMethod"
      );

      expect(Logger.error).toBeCalledWith(expect.any(Error), {
        alokai: {
          context: "middleware",
          scope: {
            extensionName: "testing-extension",
            functionName: "resueOtherIntegrationsExtensionMethod",
            integrationName: "test_integration",
            type: "endpoint",
          },
          errorBoundary: {
            functionName: "methodFromExt",
            integrationName: "replicated_integration",
            extensionName: "replicated-integration-extension",
            type: "endpoint",
          },
        },
      });
    });

    test("different integration's method called from integration's extension called from extension", async () => {
      await request(app).post(
        "/test_integration/resueOtherIntegrationsExtensionMethodCallingThrow"
      );

      expect(Logger.error).toBeCalledWith(expect.any(Error), {
        alokai: {
          context: "middleware",
          scope: {
            extensionName: "testing-extension",
            functionName: "resueOtherIntegrationsExtensionMethodCallingThrow",
            integrationName: "test_integration",
            type: "endpoint",
          },
          errorBoundary: {
            functionName: "throwError",
            integrationName: "replicated_integration",
            type: "endpoint",
          },
        },
      });
    });

    test("paralell call to 2 orchiestrated methods where one from extension fails", async () => {
      await request(app).post(
        "/test_integration/paralellOrchestrationTestFromExtensionFails"
      );

      expect(Logger.error).toBeCalledWith(expect.any(Error), {
        alokai: {
          context: "middleware",
          scope: {
            extensionName: "testing-extension",
            functionName: "paralellOrchestrationTestFromExtensionFails",
            integrationName: "test_integration",
            type: "endpoint",
          },
          errorBoundary: {
            functionName: "methodFromExt",
            extensionName: "replicated-integration-extension",
            integrationName: "replicated_integration",
            type: "endpoint",
          },
        },
      });
    });

    test("paralell call to 2 orchiestrated methods where one from integration fails", async () => {
      await request(app).post("/test_integration/paralellOrchestrationTest");

      expect(Logger.error).toBeCalledWith(expect.any(Error), {
        alokai: {
          context: "middleware",
          scope: {
            extensionName: "testing-extension",
            functionName: "paralellOrchestrationTest",
            integrationName: "test_integration",
            type: "endpoint",
          },
          errorBoundary: {
            functionName: "throwError",
            integrationName: "paralell_replicated_integration",
            type: "endpoint",
          },
        },
      });
    });

    test("init function", async () => {
      await expect(
        createServer({
          logger: {
            handler: Logger,
          },
          integrations: {
            test_integration: {
              configuration: {},
              location: "./__tests__/integration/bootstrap/serverWithInitErr",
            },
          },
        })
      ).rejects.toThrow(expect.any(Error));

      expect(Logger.error).toBeCalledWith(expect.any(Error), {
        alokai: {
          context: "middleware",
          scope: {
            integrationName: "test_integration",
            type: "bootstrapHook",
            hookName: "init",
          },
          errorBoundary: {
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
            location: "./__tests__/integration/bootstrap/serverWithOnCreateErr",
          },
        },
      });

      await request(app).post("/test_integration/success");

      expect(Logger.error).toBeCalledWith(expect.any(Error), {
        alokai: {
          context: "middleware",
          scope: {
            functionName: "success",
            integrationName: "test_integration",
            type: "endpoint",
          },
          errorBoundary: {
            integrationName: "test_integration",
            type: "endpoint",
            hookName: "onCreate",
          },
        },
      });
    });

    test("onCreate in orchestrated handler", async () => {
      const app = await createServer({
        logger: {
          handler: Logger,
        },
        integrations: {
          test_integration: {
            configuration: {},
            location: "./__tests__/integration/bootstrap/server",
            extensions() {
              return [
                {
                  name: "my-ext",
                  extendApiMethods: {
                    async callOther(context) {
                      const int = await context.getApiClient(
                        "fail_integration"
                      );
                      return await int.api.success();
                    },
                  },
                },
              ];
            },
          },
          fail_integration: {
            configuration: {},
            location: "./__tests__/integration/bootstrap/serverWithOnCreateErr",
          },
        },
      });

      await request(app).post("/test_integration/callOther");

      expect(Logger.error).toBeCalledWith(expect.any(Error), {
        alokai: {
          context: "middleware",
          scope: {
            functionName: "callOther",
            extensionName: "my-ext",
            integrationName: "test_integration",
            type: "endpoint",
          },
          errorBoundary: {
            integrationName: "fail_integration",
            type: "endpoint",
            hookName: "onCreate",
          },
        },
      });
    });
  });
});
