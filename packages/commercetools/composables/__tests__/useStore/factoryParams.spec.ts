import { useStoreFactoryParams } from '../../src/useStore/';
import { Context, UseStoreFactoryChangeParamArguments } from '@vue-storefront/core';

describe('[commercetools-composables] useStore factoryParams', () => {
  it('loads stores data', async () => {

    const storesData = {
      stores: 'stores data'
    };

    const api = {
      getStores: jest.fn().mockResolvedValue(storesData)
    };

    const config = {
      store: 'default store'
    };

    const $ct = {
      api,
      config
    };

    const context = {
      $ct
    };

    const expected = {
      ...storesData,
      _selected: config.store
    };

    expect(useStoreFactoryParams.load((context as unknown) as Context, {} as any)).resolves.toStrictEqual(expected);
    expect(api.getStores).toHaveBeenCalledWith({ customQuery: undefined });
  });

  it('changes selected store and reloads page', async () => {
    const STORES_ID = 'stores id';

    const location = {
      reload: jest.fn()
    };

    const _window = jest.spyOn(
      global, 'window', 'get'
    );

    _window.mockImplementation(function () {
      return ({ location } as unknown) as Window & typeof globalThis;
    });

    const storeService = {
      changeCurrentStore: jest.fn(),
      changeCurrentChannel: jest.fn()
    };

    const config = {
      storeService
    };

    const $ct = {
      config
    };

    const context = {
      $ct
    };

    const params = {
      store: { key: STORES_ID }
    };

    expect(await useStoreFactoryParams.change((context as unknown) as Context, (params as unknown) as UseStoreFactoryChangeParamArguments)).toBe(null);
    expect(storeService.changeCurrentStore).toHaveBeenCalledWith(STORES_ID);
    expect(location.reload).toHaveBeenCalled();
  });
});
