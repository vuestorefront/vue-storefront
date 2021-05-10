import { useMakeOrderFactory } from '../../src';

const factoryParams = {
  make: jest.fn()
};

const useMakeOrderMock = useMakeOrderFactory(factoryParams);

describe('[CORE - factories] useMakeOrderFactory', () => {
  it('creates properties', () => {
    const factoryMakeOrder = () => jest.fn();

    const useMakeOrder = useMakeOrderFactory({ make: factoryMakeOrder } as any);
    const { order, loading } = useMakeOrder();

    expect(order.value).toEqual(null);
    expect(loading.value).toEqual(false);
  });

  it('triggers make', () => {
    const factoryMakeOrder = () => jest.fn();
    const useMakeOrder = useMakeOrderFactory({ make: factoryMakeOrder } as any);
    const { order, loading, make } = useMakeOrder();

    make({ customQuery: null });
    expect(order.value).toEqual(null);
    expect(loading.value).toEqual(true);
  });

  it('should set error if factory method throwed', async () => {
    const err = new Error('zxczxcx');
    factoryParams.make.mockImplementationOnce(() => {
      throw err;
    });
    const { make, error } = useMakeOrderMock();

    await make({ customQuery: null });

    expect(error.value.make).toBe(err);
  });
});
