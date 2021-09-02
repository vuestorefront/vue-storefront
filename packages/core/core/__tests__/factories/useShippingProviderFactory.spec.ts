import { useShippingProviderFactory } from '../../src';

const factoryParams = {
  load: jest.fn(() => null),
  save: jest.fn()
};

describe('[CORE - factories] useShippingProviderFactory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should have proper initial properties', () => {
    const useShippingProvider = useShippingProviderFactory(factoryParams);
    const { loading, state, error, setState } = useShippingProvider();

    expect(state.value).toEqual(null);
    expect(loading.value).toEqual(false);
    expect(error.value).toMatchObject({});
    expect(setState).toBeDefined();
  });

  it('loading works during save execution', async () => {
    let resolver = null;
    factoryParams.save.mockReturnValueOnce(
      new Promise((resolve) => {
        resolver = resolve;
      })
    );
    const useShippingProvider = useShippingProviderFactory(factoryParams);
    const { loading, save } = useShippingProvider();

    save({ shippingMethod: 'test', customQuery: null });
    expect(loading.value).toBe(true);
    resolver();
    setTimeout(() => {
      expect(loading.value).toBe(false);
    }, 0);
  });

  it('loading works during save execution', async () => {
    let resolver = null;
    factoryParams.load.mockReturnValueOnce(
      new Promise((resolve) => {
        resolver = resolve;
      })
    );
    const useShippingProvider = useShippingProviderFactory(factoryParams);
    const { loading, load } = useShippingProvider();

    load({ customQuery: null });
    expect(loading.value).toBe(true);
    resolver();
    setTimeout(() => {
      expect(loading.value).toBe(false);
    }, 0);
  });

  it('save method execution clears error', async () => {
    const useShippingProvider = useShippingProviderFactory(factoryParams);
    const { error, save } = useShippingProvider();
    const errorMsg = 'errorMsg';
    factoryParams.save.mockReturnValueOnce(
      new Promise((_, reject) => {
        reject(errorMsg);
      })
    );

    await save({ shippingMethod: 'test', customQuery: null });
    expect(error.value.save).toBe(errorMsg);
    await save({ shippingMethod: 'test', customQuery: null });
    expect(error.value.save).toBe(null);
  });

  it('load method execution clears error', async () => {
    const useShippingProvider = useShippingProviderFactory(factoryParams);
    const { error, load } = useShippingProvider();
    const errorMsg = 'errorMsg';
    factoryParams.load.mockReturnValueOnce(
      new Promise((_, reject) => {
        reject(errorMsg);
      })
    );

    await load();
    expect(error.value.load).toBe(errorMsg);
    await load();
    expect(error.value.load).toBe(null);
  });

  it('load method sets state value', async () => {
    const shippingProviderMock = { test: 'Test provider' };
    factoryParams.load.mockReturnValueOnce(shippingProviderMock);
    const useShippingProvider = useShippingProviderFactory(factoryParams);
    const { state, load } = useShippingProvider();

    await load();

    expect(state.value).toEqual(shippingProviderMock);
  });

  it('save method sets state', async () => {
    const shippingProviderMock = { test: 'Test provider' };
    factoryParams.save.mockReturnValueOnce(shippingProviderMock);
    const useShippingProvider = useShippingProviderFactory(factoryParams);
    const { state, save } = useShippingProvider();

    await save({ shippingMethod: 'test', customQuery: null });

    expect(state.value).toEqual(shippingProviderMock);
  });

  it('sets state manually', () => {
    const shippingProviderMock = { test: 'Test provider' };
    const useShippingProvider = useShippingProviderFactory(factoryParams);
    const { setState, state } = useShippingProvider();

    setState(shippingProviderMock);

    expect(state.value).toEqual(shippingProviderMock);
  });
});
