import { shippingModule } from '@vue-storefront/core/modules/checkout/store/shipping';

jest.mock('@vue-storefront/core/lib/logger', () => ({
  Logger: {
    error: jest.fn(() => jest.fn())
  }
}));

describe('Payment actions', () => {
  let mockContext;

  beforeEach(() => {
    jest.clearAllMocks();

    mockContext = {
      dispatch: jest.fn()
    };
  });

  it('addMethod should configure new shipping method', async () => {
    await (shippingModule.actions as any).addMethod(mockContext, 'example shipping method');

    expect(mockContext.dispatch).toHaveBeenCalledWith('checkout/addShippingMethod', 'example shipping method', { root: true });
  });

  it('replaceMethods should replace shipping method', async () => {
    await (shippingModule.actions as any).replaceMethods(mockContext, 'example shipping method');

    expect(mockContext.dispatch).toHaveBeenCalledWith('checkout/replaceShippingMethods', 'example shipping method', { root: true });
  });
});

describe('Shipping getters', () => {
  it('shippingMethods should return shipping methods from rootStore', () => {
    const rootGetters = {
      'checkout/getShippingMethods': [
        { code: 'example shipping method' }
      ]
    };

    const shippingDetails = (shippingModule.getters as any).shippingMethods(null, null, null, rootGetters);

    expect(shippingDetails).toEqual([{ code: 'example shipping method' }]);
  });

  it('getShippingMethods should return shipping methods from rootStore', () => {
    const rootGetters = {
      'checkout/getShippingMethods': [
        { code: 'example shipping method' }
      ]
    };

    const shippingDetails = (shippingModule.getters as any).getShippingMethods(null, null, null, rootGetters);

    expect(shippingDetails).toEqual([{ code: 'example shipping method' }]);
  });

  it('getDefaultShippingMethod should return default shipping method from rootStore', () => {
    const rootGetters = {
      'checkout/getDefaultShippingMethod': { code: 'example shipping method' }
    };

    const personalDetails = (shippingModule.getters as any).getDefaultShippingMethod(null, null, null, rootGetters);

    expect(personalDetails).toEqual({ code: 'example shipping method' });
  });
});
