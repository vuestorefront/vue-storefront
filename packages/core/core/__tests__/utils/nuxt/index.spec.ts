import { integrationPluginFactory } from '../../../src/utils/nuxt/index';
import { nuxtContextFactory } from '../../../src/utils/nuxt/nuxtContentFactory';

jest.mock('../../../src/utils/nuxt/nuxtContentFactory', () => ({
  nuxtContextFactory: jest.fn(() => ({}))
}));

describe('integrationPluginFactory', () => {
  it('calls nuxtContextFactory with proper arguments', () => {
    const pluginFn = jest.fn();
    const createApiClientFn = jest.fn();
    (createApiClientFn as any).tag = 'myIntegration';
    const nuxtCtx = 'nuxtCtx';
    const inject = 'inject';

    integrationPluginFactory(createApiClientFn)(pluginFn)(nuxtCtx, inject);

    expect(nuxtContextFactory).toHaveBeenCalledWith(expect.objectContaining({
      tag: 'myIntegration',
      nuxtCtx,
      inject
    }));
  });

  it('calls pluginFn with proper arguments', () => {
    const pluginFn = jest.fn();
    const createApiClientFn = jest.fn();
    (createApiClientFn as any).tag = 'myIntegration';
    const nuxtCtx = {
      a: 1
    };
    const inject = 'inject';

    integrationPluginFactory(createApiClientFn)(pluginFn)(nuxtCtx, inject);

    expect(pluginFn).toHaveBeenCalledWith(expect.objectContaining({
      integration: {
        extend: expect.any(Function),
        configure: expect.any(Function)
      },
      ...nuxtCtx
    }), inject);
  });

  it('extends calls extendContext with props as an argument', () => {
    const extendContext = jest.fn();
    (nuxtContextFactory as jest.Mock).mockImplementation(() => ({
      extendContext
    }));

    const pluginFn = jest.fn();
    const createApiClientFn = jest.fn();
    (createApiClientFn as any).tag = 'myIntegration';
    const nuxtCtx = {
      a: 1
    };
    const inject = 'inject';
    const props = 'mockedProps';

    integrationPluginFactory(createApiClientFn)(pluginFn)(nuxtCtx, inject);
    pluginFn.mock.calls[0][0].integration.extend(props);

    expect(extendContext).toHaveBeenCalledWith(props);
  });

  it('configure calls createApiClientFn with proper args', () => {
    const injectInContext = jest.fn();
    (nuxtContextFactory as jest.Mock).mockImplementation(() => ({
      injectInContext
    }));

    const apiClientResponse = {
      api: 1,
      client: 2,
      settings: 3
    };
    const props = {
      api: 1,
      client: 2,
      config: 3
    };
    const pluginFn = jest.fn();
    const createApiClientFn = jest.fn(() => apiClientResponse);
    (createApiClientFn as any).tag = 'myIntegration';
    const nuxtCtx = {
      a: 1
    };
    const inject = 'inject';
    const givenSettings = 'mock-givenSettings';
    const customApi = 'mock-customApi';

    integrationPluginFactory(createApiClientFn)(pluginFn)(nuxtCtx, inject);
    pluginFn.mock.calls[0][0].integration.configure(givenSettings, customApi);

    expect(injectInContext).toHaveBeenCalledWith(props);
  });

  it('configure calls createApiClientFn with proper args when provided 1 arg', () => {
    const injectInContext = jest.fn();
    (nuxtContextFactory as jest.Mock).mockImplementation(() => ({
      injectInContext
    }));

    const apiClientResponse = {
      api: 1,
      client: 2,
      settings: 3
    };
    const props = {
      api: 1,
      client: 2,
      config: 3
    };
    const pluginFn = jest.fn();
    const createApiClientFn = jest.fn(() => apiClientResponse);
    (createApiClientFn as any).tag = 'myIntegration';
    const nuxtCtx = {
      a: 1
    };
    const inject = 'inject';
    const givenSettings = 'mock-givenSettings';

    integrationPluginFactory(createApiClientFn)(pluginFn)(nuxtCtx, inject);
    pluginFn.mock.calls[0][0].integration.configure(givenSettings);

    expect(injectInContext).toHaveBeenCalledWith(props);
  });
});
