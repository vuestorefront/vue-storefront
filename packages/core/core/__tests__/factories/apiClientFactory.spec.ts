import { apiClientFactory } from '../../src/factories/apiClientFactory';

describe('[CORE - factories] apiClientFactory', () => {
  it('Should return passed config with overrides property', () => {
    const params = {
      onSetup: jest.fn(),
      defaultSettings: { option: 'option' }
    };

    const { getSettings } = apiClientFactory<any, any>(params);

    expect(getSettings()).toEqual({
      option: 'option'
    });
  });

  it('Should merge with default settings when setup is called', () => {
    const params = {
      onSetup: jest.fn(),
      defaultSettings: { option: 'option' }
    };

    const { setup, getSettings } = apiClientFactory<any, any>(params);

    setup({ newOption: 'newOption'});

    expect(getSettings()).toEqual({
      option: 'option',
      newOption: 'newOption'
    });
  });

  it('Should reset the settings to default after invoking setup again', () => {
    const params = {
      onSetup: jest.fn(),
      defaultSettings: { option: 'option' }
    };

    const { setup, getSettings } = apiClientFactory<any, any>(params);

    setup({ someProp: 'someval'});

    setup({});

    expect(getSettings()).toEqual({
      option: 'option'
    });
  });

  it('Should update current config with new properties', () => {
    const params = {
      onSetup: jest.fn(),
      defaultSettings: { option: 'option'}
    };

    const { setup, update, getSettings } = apiClientFactory<any, any>(params);

    setup({ newOption: 'newOption'});
    update({ option: 'overwritten'});

    expect(getSettings()).toEqual({
      option: 'overwritten',
      newOption: 'newOption'
    });
  });

  it('Should run onSetup when setup is invoked', () => {
    const params = {
      onSetup: jest.fn(),
      defaultSettings: {}
    };

    const { setup } = apiClientFactory<any, any>(params);

    setup({});

    expect(params.onSetup).toHaveBeenCalled();
  });

  it('Should run onSetup when update is invoked', () => {
    const params = {
      onSetup: jest.fn(),
      defaultSettings: {}
    };

    const { update } = apiClientFactory<any, any>(params);

    update({});

    expect(params.onSetup).toHaveBeenCalled();
  });
});
