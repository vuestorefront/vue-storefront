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
      logger.info("some log");
      const int = await context.getApiClient("replicated_integration");
      return await int.api[
        "replicated-integration-extension"
      ].orchestrationTest();
    },
  },
  hooks(req, res, alokai) {
    const logger = getLogger(alokai);
    logger.info("hooks");
    return {
      beforeCall({ args }) {
        logger.info("bc1");
        return args;
      },
      beforeCreate(a) {
        logger.info("bc2");
        return a;
      },
      afterCall({ response }) {
        logger.info("after1");
        return response;
      },
      afterCreate(a) {
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
      },
    });
  });

  test("scope of log from API methods from the integration", async () => {
    await request(app).post("/test_integration/success");

    expect(Logger.info).toBeCalledWith(expect.any(String), {
      context: "middleware",
      scope: {
        extensionName: undefined,
        functionName: "success",
        integrationName: "test_integration",
        type: "endpoint",
      },
    });
  });

  test("scope of log from API methods added in the extension", async () => {
    await request(app).post("/test_integration/addedCustomEndpoint");

    expect(Logger.info).toBeCalledWith(expect.any(String), {
      context: "middleware",
      scope: {
        extensionName: "testing-extension",
        functionName: "addedCustomEndpoint",
        integrationName: "test_integration",
        type: "endpoint",
      },
    });
  });

  test("scope of log from API methods overwritten in the extension (without namespace)", async () => {
    await request(app).post("/test_integration/setCookieHeader");

    expect(Logger.info).toBeCalledWith(expect.any(String), {
      context: "middleware",
      scope: {
        extensionName: "testing-extension",
        functionName: "setCookieHeader",
        integrationName: "test_integration",
        type: "endpoint",
      },
    });
  });

  test("scope of log from API methods overwritten in the extension (with namespace)", async () => {
    await request(app).post(
      "/test_integration/namespaced-testing-extension/setCookieHeader"
    );

    expect(Logger.info).toBeCalledWith(expect.any(String), {
      context: "middleware",
      scope: {
        extensionName: "namespaced-testing-extension",
        functionName: "setCookieHeader",
        integrationName: "test_integration",
        type: "endpoint",
      },
    });
  });

  test("scope of log from hooks method in the extension", async () => {
    await request(app).post("/test_integration/setCookieHeader");

    expect(Logger.info).toBeCalledWith("hooks", {
      context: "middleware",
      scope: {
        extensionName: "testing-extension",
        functionName: "setCookieHeader",
        integrationName: "test_integration",
        hookName: "hooks",
        type: "requestHook",
      },
    });
  });

  test("scope of log from hooks method in the extension triggered when calling other method from other extension", async () => {
    await request(app).post(
      "/test_integration/namespaced-testing-extension/setCookieHeader"
    );

    expect(Logger.info).toBeCalledWith(expect.any(String), {
      context: "middleware",
      scope: {
        extensionName: "testing-extension",
        functionName: "setCookieHeader",
        integrationName: "test_integration",
        hookName: "hooks",
        type: "requestHook",
      },
    });
  });

  test("scope of log from beforeCreate method in the extension", async () => {
    await request(app).post("/test_integration/setCookieHeader");

    expect(Logger.info).toBeCalledWith(expect.any(String), {
      context: "middleware",
      scope: {
        extensionName: "testing-extension",
        functionName: "setCookieHeader",
        integrationName: "test_integration",
        hookName: "beforeCreate",
        type: "requestHook",
      },
    });
  });

  test("scope of log from beforeCall method in the extension", async () => {
    await request(app).post("/test_integration/setCookieHeader");

    expect(Logger.info).toBeCalledWith(expect.any(String), {
      context: "middleware",
      scope: {
        extensionName: "testing-extension",
        functionName: "setCookieHeader",
        integrationName: "test_integration",
        hookName: "beforeCall",
        type: "requestHook",
      },
    });
  });

  test("scope of log from afterCreate method in the extension", async () => {
    await request(app).post("/test_integration/setCookieHeader");

    expect(Logger.info).toBeCalledWith(expect.any(String), {
      context: "middleware",
      scope: {
        extensionName: "testing-extension",
        functionName: "setCookieHeader",
        integrationName: "test_integration",
        hookName: "afterCreate",
        type: "requestHook",
      },
    });
  });

  test("scope of log from afterCall method in the extension", async () => {
    await request(app).post("/test_integration/setCookieHeader");

    expect(Logger.info).toBeCalledWith(expect.any(String), {
      context: "middleware",
      scope: {
        extensionName: "testing-extension",
        functionName: "setCookieHeader",
        integrationName: "test_integration",
        hookName: "afterCall",
        type: "requestHook",
      },
    });
  });

  test("scope of log from endpoint resued in custom endpoint", async () => {
    await request(app).post("/test_integration/reuseOtherMethod");

    expect(Logger.info).toBeCalledWith(expect.any(String), {
      context: "middleware",
      scope: {
        extensionName: "testing-extension",
        functionName: "reuseOtherMethod",
        integrationName: "test_integration",
        type: "endpoint",
      },
    });
    expect(Logger.info).toBeCalledWith(expect.any(String), {
      context: "middleware",
      scope: {
        functionName: "success",
        integrationName: "test_integration",
        type: "endpoint",
      },
    });
  });

  test("scope of log from: different integration called from extension", async () => {
    await request(app).post("/test_integration/resueOtherIntegrationMethod");

    expect(Logger.info).toBeCalledWith(expect.any(String), {
      context: "middleware",
      scope: {
        extensionName: "testing-extension",
        functionName: "resueOtherIntegrationMethod",
        integrationName: "test_integration",
        type: "endpoint",
      },
    });
    expect(Logger.info).toBeCalledWith(expect.any(String), {
      context: "middleware",
      scope: {
        extensionName: "replicated-integration-extension",
        functionName: "orchestrationTest",
        integrationName: "replicated_integration",
        type: "endpoint",
      },
    });
    expect(Logger.info).toBeCalledWith(expect.any(String), {
      context: "middleware",
      scope: {
        functionName: "success",
        integrationName: "replicated_integration",
        type: "endpoint",
      },
    });
  });

  test("scope of log extendApp", async () => {
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
      },
    });

    expect(Logger.info).toBeCalledWith(expect.any(String), {
      context: "middleware",
      scope: {
        integrationName: "test_integration",
        extensionName: "testing-extension",
        type: "bootstrapHook",
        hookName: "extendApp",
      },
    });
  });

  test("scope of log init function", async () => {
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
            return [testingExtension as any, namespacedTestingExtension as any];
          },
        },
      },
    });

    expect(Logger.info).toBeCalledWith(expect.any(String), {
      context: "middleware",
      scope: {
        integrationName: "test_integration",
        type: "bootstrapHook",
        hookName: "init",
      },
    });
  });

  test("scope of log onCreate function", async () => {
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
      context: "middleware",
      scope: {
        integrationName: "test_integration",
        functionName: "success",
        type: "requestHook",
        hookName: "onCreate",
      },
    });
  });
});
