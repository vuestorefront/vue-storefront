import { apiClientFactory } from '../../src/factories/apiClientFactory';

jest.mock('../../src/utils', () => ({
  integrationPluginFactory: jest.fn(),
  Logger: {
    debug: jest.fn()
  }
}));

describe('[CORE - factories] apiClientFactory', () => {
  it('Should return passed config with overrides property', () => {
    const params = {
      onCreate: jest.fn((config) => ({ config })),
      defaultSettings: { option: 'option' }
    };

    const { createApiClient } = apiClientFactory<any, any>(params as any) as any;

    expect(createApiClient({}).settings).toEqual({});
  });

  it('Should merge with default settings when setup is called', () => {
    const params = {
      onCreate: jest.fn((config) => ({ config })),
      defaultSettings: { option: 'option' }
    };

    const { createApiClient} = apiClientFactory<any, any>(params as any) as any;

    const { settings } = createApiClient({ newOption: 'newOption'});

    expect(settings).toEqual({
      newOption: 'newOption'
    });
  });

  it('Should run onCreate when setup is invoked', () => {
    const params = {
      onCreate: jest.fn((config) => ({ config })),
      defaultSettings: {}
    };

    const { createApiClient } = apiClientFactory<any, any>(params as any);

    createApiClient({});

    expect(params.onCreate).toHaveBeenCalled();
  });

  it('Should run given extensions', () => {
    const extensionFns = {
      beforeCreate: jest.fn(a => a),
      afterCreate: jest.fn(a => a)
    };
    const extension = () => extensionFns;

    const params = {
      onCreate: jest.fn((config) => ({ config })),
      defaultSettings: {},
      extensions: [extension]
    };

    const { createApiClient } = apiClientFactory<any, any>(params as any);

    createApiClient.bind({ middleware: { req: null, res: null } })({});

    expect(extensionFns.beforeCreate).toHaveBeenCalled();
    expect(extensionFns.afterCreate).toHaveBeenCalled();
  });
});
