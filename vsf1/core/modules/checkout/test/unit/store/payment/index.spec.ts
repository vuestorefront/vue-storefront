import { paymentModule } from '@vue-storefront/core/modules/checkout/store/payment';

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

  it('addMethod should configure new payment method', async () => {
    await (paymentModule.actions as any).addMethod(mockContext, 'example payment method');

    expect(mockContext.dispatch).toHaveBeenCalledWith('checkout/addPaymentMethod', 'example payment method', { root: true });
  });

  it('replaceMethods should replace payment method', async () => {
    await (paymentModule.actions as any).replaceMethods(mockContext, 'example payment method');

    expect(mockContext.dispatch).toHaveBeenCalledWith('checkout/replacePaymentMethods', 'example payment method', { root: true });
  });
});

describe('Payment getters', () => {
  it('paymentMethods should return payment methods from rootStore', () => {
    const rootGetters = {
      'checkout/getPaymentMethods': [
        { code: 'example payment method' }
      ]
    };

    const personalDetails = (paymentModule.getters as any).paymentMethods(null, null, null, rootGetters);

    expect(personalDetails).toEqual([{ code: 'example payment method' }]);
  });

  it('getDefaultPaymentMethod should return default payment method from rootStore', () => {
    const rootGetters = {
      'checkout/getDefaultPaymentMethod': { code: 'example payment method' }
    };

    const personalDetails = (paymentModule.getters as any).getDefaultPaymentMethod(null, null, null, rootGetters);

    expect(personalDetails).toEqual({ code: 'example payment method' });
  });

  it('getNotServerPaymentMethods should return not server methods from rootStore', () => {
    const rootGetters = {
      'checkout/getNotServerPaymentMethods': { code: 'example payment method' }
    };

    const personalDetails = (paymentModule.getters as any).getNotServerPaymentMethods(null, null, null, rootGetters);

    expect(personalDetails).toEqual({ code: 'example payment method' });
  });
});
