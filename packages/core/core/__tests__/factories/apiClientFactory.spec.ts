import { apiClientFactory } from '../../src/factories/apiClientFactory';
import { applyContextToApi } from '../../src/factories/apiClientFactory/context';

vi.mock('../../src/utils', () => ({
  integrationPluginFactory: vi.fn(),
  Logger: {
    debug: vi.fn()
  }
}));

describe('[CORE - factories] apiClientFactory', () => {
  it('Should return passed config with overrides property', () => {
    const params = {
      onCreate: vi.fn((config) => ({ config })),
      defaultSettings: { option: 'option' }
    };

    const { createApiClient } = apiClientFactory<any, any>(params as any) as any;

    expect(createApiClient({}).settings).toEqual({});
  });

  it('Should merge with default settings when setup is called', () => {
    const params = {
      onCreate: vi.fn((config) => ({ config })),
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
      onCreate: vi.fn((config) => ({ config })),
      defaultSettings: {}
    };

    const { createApiClient } = apiClientFactory<any, any>(params as any);

    createApiClient({});

    expect(params.onCreate).toHaveBeenCalled();
  });

  it('Should run given extensions', () => {
    const beforeCreate = vi.fn(a => a);
    const afterCreate = vi.fn(a => a);
    const extension = {
      name: 'extTest',
      hooks: () => ({ beforeCreate, afterCreate })
    };

    const params = {
      onCreate: vi.fn((config) => ({ config })),
      defaultSettings: {},
      extensions: [extension]
    };

    const { createApiClient } = apiClientFactory<any, any>(params as any);
    const extensions = (createApiClient as any)._predefinedExtensions;

    createApiClient.bind({ middleware: { req: null, res: null, extensions } })({});

    expect(beforeCreate).toHaveBeenCalled();
    expect(afterCreate).toHaveBeenCalled();
  });

  it('applyContextToApi adds context as first argument to api functions', () => {
    const api = {
      firstFunc: vi.fn(),
      secondFunc: vi.fn(),
      thirdFunc: vi.fn()
    };
    const context = {
      extendQuery: vi.fn()
    };

    const apiWithContext: any = applyContextToApi(api, context);

    apiWithContext.firstFunc();
    apiWithContext.secondFunc('TEST');
    apiWithContext.thirdFunc('A', 'FEW', 'ARGS');

    expect(api.firstFunc).toHaveBeenCalledWith(
      expect.objectContaining({ extendQuery: expect.any(Function) })
    );
    expect(api.secondFunc).toHaveBeenCalledWith(
      expect.objectContaining({ extendQuery: expect.any(Function) }),
      'TEST'
    );
    expect(api.thirdFunc).toHaveBeenCalledWith(
      expect.objectContaining({ extendQuery: expect.any(Function) }),
      'A', 'FEW', 'ARGS'
    );
  });
});
