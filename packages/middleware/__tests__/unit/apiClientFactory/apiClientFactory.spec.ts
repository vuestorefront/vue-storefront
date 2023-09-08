import { apiClientFactory } from "../../../src/apiClientFactory";
import { applyContextToApi } from "../../../src/apiClientFactory/applyContextToApi";
import { MiddlewareContext } from "../../../src/types";

describe("apiClientFactory", () => {
  it("Should return passed config with overrides property", () => {
    const params = {
      onCreate: jest.fn((config) => ({ config })),
      defaultSettings: { option: "option" },
    };

    const { createApiClient } = apiClientFactory<any, any>(
      params as any
    ) as any;

    expect(createApiClient({}).settings).toEqual({});
  });

  it("Should merge with default settings when setup is called", () => {
    const params = {
      onCreate: jest.fn((config) => ({ config })),
      defaultSettings: { option: "option" },
    };

    const { createApiClient } = apiClientFactory<any, any>(
      params as any
    ) as any;

    const { settings } = createApiClient({ newOption: "newOption" });

    expect(settings).toEqual({
      newOption: "newOption",
    });
  });

  it("Should run onCreate when setup is invoked", () => {
    const params = {
      onCreate: jest.fn((config) => ({ config })),
      defaultSettings: {},
    };

    const { createApiClient } = apiClientFactory<any, any>(params as any);

    createApiClient({});

    expect(params.onCreate).toHaveBeenCalled();
  });

  it("Should run initial config when onCreate is not provided", () => {
    const params = {
      defaultSettings: {},
    };
    const defaultConfig = { value: 123 };
    const defaultClient = { key: "value" };
    const clientConfig = { config: defaultConfig, client: defaultClient };
    const { createApiClient } = apiClientFactory<any, any>(params as any);

    const { settings } = createApiClient(clientConfig);

    expect(settings.client).toBe(defaultClient);
    expect(settings.config).toBe(defaultConfig);
  });

  it("Should run given extensions", () => {
    const beforeCreate = jest.fn((a) => a);
    const afterCreate = jest.fn((a) => a);
    const extension = {
      name: "extTest",
      hooks: () => ({ beforeCreate, afterCreate }),
    };

    const params = {
      onCreate: jest.fn((config) => ({ config })),
      defaultSettings: {},
      extensions: [extension],
    };

    const { createApiClient } = apiClientFactory<any, any>(params as any);
    const extensions = (createApiClient as any)._predefinedExtensions;

    createApiClient.bind({ middleware: { req: null, res: null, extensions } })(
      {}
    );

    expect(beforeCreate).toHaveBeenCalled();
    expect(afterCreate).toHaveBeenCalled();
  });

  it("Should run beforeCall / afterCall extension methods", async () => {
    const beforeCall = jest.fn(({ args }) => args);
    const afterCall = jest.fn(({ response }) => response);
    const extension = {
      name: "extTest",
      hooks: () => ({ beforeCall, afterCall }),
    };

    const params = {
      onCreate: jest.fn((config) => ({ config })),
      defaultSettings: {},
      extensions: [extension],
      api: {
        firstFunc: jest.fn(),
      },
    };

    const { createApiClient } = apiClientFactory<any, any>(params as any);
    const extensions = (createApiClient as any)._predefinedExtensions;

    const apiWithContext: any = createApiClient.bind({
      middleware: { req: null, res: null, extensions },
    })({});

    await apiWithContext.api.firstFunc();

    expect(beforeCall).toHaveBeenCalled();
    expect(afterCall).toHaveBeenCalled();
  });

  it("should accept methods passed as object", () => {
    const params = {
      onCreate: jest.fn((config, client) => ({ config, client })),
      api: { testMethod: jest.fn() },
    };

    const { createApiClient } = apiClientFactory(params);
    const apiClient = createApiClient({});

    expect(apiClient.api.testMethod).toBeDefined();
  });

  it("should accept methods passed as object factory", () => {
    const params = {
      onCreate: jest.fn((config, client) => ({ config, client })),
      api: jest.fn(() => ({ testMethod: jest.fn() })),
    };

    const { createApiClient } = apiClientFactory(params);
    const apiClient = createApiClient({});

    expect(params.api).toBeCalledTimes(1);
    expect(apiClient.api.testMethod).toBeDefined();
  });

  describe("[applyContextToApi]", () => {
    it("should add context as first argument to api functions", () => {
      const api = {
        firstFunc: jest.fn(),
        secondFunc: jest.fn(),
        thirdFunc: jest.fn(),
      };
      const context = {
        extendQuery: jest.fn(),
      } as unknown as MiddlewareContext;

      const apiWithContext: any = applyContextToApi(api, context);

      apiWithContext.firstFunc();
      apiWithContext.secondFunc("TEST");
      apiWithContext.thirdFunc("A", "FEW", "ARGS");

      expect(api.firstFunc).toHaveBeenCalledWith(
        expect.objectContaining({ extendQuery: expect.any(Function) })
      );
      expect(api.secondFunc).toHaveBeenCalledWith(
        expect.objectContaining({ extendQuery: expect.any(Function) }),
        "TEST"
      );
      expect(api.thirdFunc).toHaveBeenCalledWith(
        expect.objectContaining({ extendQuery: expect.any(Function) }),
        "A",
        "FEW",
        "ARGS"
      );
    });
  });
});
