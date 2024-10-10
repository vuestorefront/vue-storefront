import { logger } from "../../../__mocks__/logger";
import { registerIntegrations } from "../../../src/integrations";
import { LoggerManager } from "../../../src/logger";
import { Integrations } from "../../../src/types";

const mockWrappedLogger = {
  ...logger,
  _isWrapped: true,
};
jest.mock("../../../src/logger", () => ({
  injectMetadata: jest.fn(() => mockWrappedLogger),
  getLogger: jest.requireActual("../../../src/logger").getLogger,
}));

const mockIntegrations: Integrations = {
  ct: {
    configuration: { prop: "value" },
    location: "./__tests__/integration/integrations/integration-module.js",
  },
};

const loggerManager = {
  get: () => logger,
} as unknown as LoggerManager;

describe("[registerIntegrations]", () => {
  it("should build integration result", async () => {
    const mockApp = {} as any;

    const result = await registerIntegrations(
      mockApp,
      mockIntegrations,
      loggerManager
    );

    expect(result).toEqual({
      ct: {
        apiClient: {
          createApiClient: { key: "value" },
        },
        configuration: { prop: "value", integrationName: "ct" },
        customQueries: undefined,
        extensions: [],
        initConfig: {},
        errorHandler: expect.any(Function),
      },
    });
  });

  it("should extend app when extension provided", async () => {
    const mockExtendApp = jest.fn();
    const mockApp = {} as any;

    const mockIntegrations2: Integrations = {
      ct: {
        configuration: { prop: "value" },
        location: "./__tests__/integration/integrations/integration-module.js",
        extensions() {
          return [{ name: "test-extension", extendApp: mockExtendApp }];
        },
      },
    };
    const result = await registerIntegrations(
      mockApp,
      mockIntegrations2,
      loggerManager
    );

    expect(mockExtendApp).toHaveBeenCalledWith({
      app: mockApp,
      configuration: {
        ...mockIntegrations.ct.configuration,
        integrationName: "ct",
      },
      logger: mockWrappedLogger,
    });
    expect(result).toEqual({
      ct: {
        apiClient: {
          createApiClient: { key: "value" },
        },
        configuration: { prop: "value", integrationName: "ct" },
        customQueries: undefined,
        extensions: [
          { name: "test-extension", extendApp: expect.any(Function) },
        ],
        initConfig: {},
        errorHandler: expect.any(Function),
      },
    });
  });
});
