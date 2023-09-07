import { registerIntegrations } from "../../../src/integrations";
import { Integrations } from "../../../src/types";

const mockIntegrations: Integrations = {
  ct: {
    configuration: { prop: "value" },
    location: "./__tests__/integration/integrations/integration-module.js",
  },
};

describe("[registerIntegrations]", () => {
  it("should build integration result", async () => {
    const mockApp = {} as any;

    const result = await registerIntegrations(mockApp, mockIntegrations);

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
    const result = await registerIntegrations(mockApp, mockIntegrations2);

    expect(mockExtendApp).toHaveBeenCalledWith({
      app: mockApp,
      configuration: {
        ...mockIntegrations.ct.configuration,
        integrationName: "ct",
      },
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
