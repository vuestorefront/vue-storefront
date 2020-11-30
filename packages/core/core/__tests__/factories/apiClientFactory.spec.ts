import { apiClientFactory } from '../../src/factories/apiClientFactory';

describe('[CORE - factories] apiClientFactory', () => {
  it('Should return passed config with overrides property', () => {
    const params = {
      onSetup: jest.fn((config) => ({ config })),
      defaultSettings: { option: 'option' }
    };

    const { createApiClient } = apiClientFactory<any, any>(params as any) as any;

    expect(createApiClient({}).settings).toEqual({});
  });

  it('Should merge with default settings when setup is called', () => {
    const params = {
      onSetup: jest.fn((config) => ({ config })),
      defaultSettings: { option: 'option' }
    };

    const { createApiClient} = apiClientFactory<any, any>(params as any) as any;

    const { settings } = createApiClient({ newOption: 'newOption'});

    expect(settings).toEqual({
      newOption: 'newOption'
    });
  });

  it('Should run onSetup when setup is invoked', () => {
    const params = {
      onSetup: jest.fn((config) => ({ config })),
      defaultSettings: {}
    };

    const { createApiClient } = apiClientFactory<any, any>(params as any);

    createApiClient({});

    expect(params.onSetup).toHaveBeenCalled();
  });
});
