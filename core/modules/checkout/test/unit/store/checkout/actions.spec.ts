import * as types from '@vue-storefront/core/modules/checkout/store/checkout/mutation-types';
import checkoutActions from '@vue-storefront/core/modules/checkout/store/checkout/actions';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager';
import { Logger } from '@vue-storefront/core/lib/logger';

jest.mock('@vue-storefront/core/lib/storage-manager', () => ({
  StorageManager: {
    get: jest.fn()
  }
}));

jest.mock('@vue-storefront/core/lib/logger', () => ({
  Logger: {
    error: jest.fn(() => jest.fn())
  }
}));

describe('Checkout actions', () => {
  let mockContext;

  beforeEach(() => {
    jest.clearAllMocks();

    mockContext = {
      commit: jest.fn(),
      dispatch: jest.fn()
    };
  });

  describe('placeOrder', () => {
    let order;

    beforeEach(() => {
      order = {
        sku: 123456789
      };
    });

    it('should place order if return code is successful', async () => {
      mockContext.dispatch.mockResolvedValue({ resultCode: 200 });
      await (checkoutActions as any).placeOrder(mockContext, { order });

      expect(mockContext.dispatch).toHaveBeenCalledTimes(4);
      expect(mockContext.dispatch).toHaveBeenNthCalledWith(1, 'order/placeOrder', order, { root: true });
      expect(mockContext.dispatch).toHaveBeenNthCalledWith(2, 'updateOrderTimestamp');
      expect(mockContext.dispatch).toHaveBeenNthCalledWith(3, 'cart/clear', { sync: false }, { root: true });
      expect(mockContext.dispatch).toHaveBeenNthCalledWith(4, 'dropPassword');
    });

    it('should place order if return code is missing', async () => {
      mockContext.dispatch.mockResolvedValue({ resultCode: undefined });
      await (checkoutActions as any).placeOrder(mockContext, { order });

      expect(mockContext.dispatch).toHaveBeenCalledTimes(4);
      expect(mockContext.dispatch).toHaveBeenNthCalledWith(1, 'order/placeOrder', order, { root: true });
      expect(mockContext.dispatch).toHaveBeenNthCalledWith(2, 'updateOrderTimestamp');
      expect(mockContext.dispatch).toHaveBeenNthCalledWith(3, 'cart/clear', { sync: false }, { root: true });
      expect(mockContext.dispatch).toHaveBeenNthCalledWith(4, 'dropPassword');
    });

    it('should not place order if return code is not successful', async () => {
      mockContext.dispatch.mockResolvedValue({ resultCode: 500 });
      await (checkoutActions as any).placeOrder(mockContext, { order });

      expect(mockContext.dispatch).toHaveBeenCalledTimes(1);
      expect(mockContext.dispatch).toHaveBeenNthCalledWith(1, 'order/placeOrder', order, { root: true });
      expect(mockContext.dispatch).not.toHaveBeenNthCalledWith(2, 'updateOrderTimestamp');
      expect(mockContext.dispatch).not.toHaveBeenNthCalledWith(3, 'cart/clear', { sync: false }, { root: true });
      expect(mockContext.dispatch).not.toHaveBeenNthCalledWith(4, 'dropPassword');
    });

    it('should log thrown error', async () => {
      mockContext.dispatch.mockImplementation(() => { throw new Error(); });
      await (checkoutActions as any).placeOrder(mockContext, { order });

      expect(mockContext.dispatch).toHaveBeenCalledTimes(1);
      expect(mockContext.dispatch).toHaveBeenNthCalledWith(1, 'order/placeOrder', order, { root: true });
      expect(mockContext.dispatch).not.toHaveBeenNthCalledWith(2, 'updateOrderTimestamp');
      expect(mockContext.dispatch).not.toHaveBeenNthCalledWith(3, 'cart/clear', { sync: false }, { root: true });
      expect(mockContext.dispatch).not.toHaveBeenNthCalledWith(4, 'dropPassword');
      expect(Logger.error).toHaveBeenCalled();
    });
  });

  it('updateOrderTimestamp should update timestamp of order in cache', async () => {
    const mockSetItem = jest.fn(() => ({}));

    (StorageManager.get as jest.Mock).mockImplementation(() => ({
      setItem: mockSetItem
    }));

    await (checkoutActions as any).updateOrderTimestamp();

    expect(StorageManager.get).toHaveBeenCalledWith('user');
    expect(mockSetItem).toHaveBeenCalledWith('last-cart-bypass-ts', expect.any(Number));
  });

  describe('dropPassword', () => {
    it('should drop password for account creation', async () => {
      mockContext.state = {
        personalDetails: {
          createAccount: true
        }
      };
      await (checkoutActions as any).dropPassword(mockContext);

      expect(mockContext.commit).toHaveBeenCalledWith(types.CHECKOUT_DROP_PASSWORD);
    });

    it('should not drop password if account is not created', async () => {
      mockContext.state = {
        personalDetails: {
          createAccount: false
        }
      };
      await (checkoutActions as any).dropPassword(mockContext);

      expect(mockContext.commit).not.toHaveBeenCalled();
    });
  });

  it('setModifiedAt should configure modified at date', async () => {
    const timestamp = 1234567890;
    await (checkoutActions as any).setModifiedAt(mockContext, timestamp);

    expect(mockContext.commit).toHaveBeenCalledWith(types.CHECKOUT_SET_MODIFIED_AT, timestamp);
  });

  it('savePersonalDetails should configure personal details', async () => {
    const personalDetails = {
      firstName: 'example first name',
      lastName: 'example last name'
    };
    await (checkoutActions as any).savePersonalDetails(mockContext, personalDetails);

    expect(mockContext.commit).toHaveBeenCalledWith(types.CHECKOUT_SAVE_PERSONAL_DETAILS, personalDetails);
  });

  it('saveShippingDetails should configure shipping details', async () => {
    const shippingDetails = {
      firstName: 'example first name',
      lastName: 'example last name'
    };
    await (checkoutActions as any).saveShippingDetails(mockContext, shippingDetails);

    expect(mockContext.commit).toHaveBeenCalledWith(types.CHECKOUT_SAVE_SHIPPING_DETAILS, shippingDetails);
  });

  it('savePaymentDetails should configure payment details', async () => {
    const paymentDetails = {
      paymentMethod: 'example payment method'
    };
    await (checkoutActions as any).savePaymentDetails(mockContext, paymentDetails);

    expect(mockContext.commit).toHaveBeenCalledWith(types.CHECKOUT_SAVE_PAYMENT_DETAILS, paymentDetails);
  });

  it('load personal, shipping and payment details from cache', async () => {
    const personalDetails = {
      firstName: 'example personal first name',
      lastName: 'example personal last name'
    };
    const shippingDetails = {
      firstName: 'example shipping first name',
      lastName: 'example shipping last name'
    };
    const paymentDetails = {
      paymentMethod: 'example payment method'
    };
    const mockGetItem = jest.fn()
      .mockResolvedValueOnce(personalDetails)
      .mockResolvedValueOnce(shippingDetails)
      .mockResolvedValueOnce(paymentDetails);

    (StorageManager.get as jest.Mock).mockImplementation(() => ({
      getItem: mockGetItem
    }));

    await (checkoutActions as any).load(mockContext);

    expect(StorageManager.get).toHaveBeenCalledWith('checkout');
    expect(mockGetItem).toHaveBeenCalledWith('personal-details');
    expect(mockGetItem).toHaveBeenCalledWith('shipping-details');
    expect(mockGetItem).toHaveBeenCalledWith('payment-details');
    expect(mockContext.commit).toHaveBeenCalledWith(types.CHECKOUT_LOAD_PERSONAL_DETAILS, personalDetails);
    expect(mockContext.commit).toHaveBeenCalledWith(types.CHECKOUT_LOAD_SHIPPING_DETAILS, shippingDetails);
    expect(mockContext.commit).toHaveBeenCalledWith(types.CHECKOUT_LOAD_PAYMENT_DETAILS, paymentDetails);
  });

  it('updatePropValue should configure prop value', async () => {
    const payload = {
      data: 'example data'
    };
    await (checkoutActions as any).updatePropValue(mockContext, payload);

    expect(mockContext.commit).toHaveBeenCalledWith(types.CHECKOUT_UPDATE_PROP_VALUE, payload);
  });

  it('setThankYouPage should configure thank you page', async () => {
    const payload = {
      data: 'example data'
    };
    await (checkoutActions as any).setThankYouPage(mockContext, payload);

    expect(mockContext.commit).toHaveBeenCalledWith(types.CHECKOUT_SET_THANKYOU, payload);
  });

  it('addPaymentMethod should configure add payment method', async () => {
    const paymentMethod = 'example payment method';
    await (checkoutActions as any).addPaymentMethod(mockContext, paymentMethod);

    expect(mockContext.commit).toHaveBeenCalledWith(types.CHECKOUT_ADD_PAYMENT_METHOD, paymentMethod);
  });

  it('replacePaymentMethods should replace payment method', async () => {
    const paymentMethod = 'example payment method';
    await (checkoutActions as any).replacePaymentMethods(mockContext, paymentMethod);

    expect(mockContext.commit).toHaveBeenCalledWith(types.CHECKOUT_SET_PAYMENT_METHODS, paymentMethod);
  });

  it('addShippingMethod should add shipping method', async () => {
    const shippingMethod = 'example shipping method';
    await (checkoutActions as any).addShippingMethod(mockContext, shippingMethod);

    expect(mockContext.commit).toHaveBeenCalledWith(types.CHECKOUT_ADD_SHIPPING_METHOD, shippingMethod);
  });

  it('replaceShippingMethods should replace shipping method', async () => {
    const shippingMethod = 'example shipping method';
    await (checkoutActions as any).replaceShippingMethods(mockContext, shippingMethod);

    expect(mockContext.commit).toHaveBeenCalledWith(types.CHECKOUT_SET_SHIPPING_METHODS, shippingMethod);
  });
});
