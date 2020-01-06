import { StorageManager } from '@vue-storefront/core/lib/storage-manager';
import { CheckoutModule } from '@vue-storefront/core/modules/checkout';
import { checkoutModule } from '@vue-storefront/core/modules/checkout/store/checkout';
import { paymentModule } from '@vue-storefront/core/modules/checkout/store/payment';
import { shippingModule } from '@vue-storefront/core/modules/checkout/store/shipping';
import * as types from '@vue-storefront/core/modules/checkout/store/checkout/mutation-types';

jest.mock('@vue-storefront/core/helpers', () => ({
  once: () => jest.fn()
}));

jest.mock('@vue-storefront/core/lib/storage-manager', () => ({
  StorageManager: {
    init: jest.fn(),
    get: jest.fn()
  }
}));

describe('CheckoutModule', () => {
  let store;
  let subscription;
  let mockSetItem;

  beforeEach(() => {
    jest.clearAllMocks();

    store = {
      registerModule: jest.fn(),
      subscribe: jest.fn(fn => {
        subscription = fn;
      })
    };

    mockSetItem = jest.fn().mockResolvedValue({});

    (StorageManager.get as jest.Mock).mockImplementation(() => ({
      setItem: mockSetItem
    }));
  });

  it('should init and register modules', () => {
    CheckoutModule({ store } as any);

    expect(StorageManager.init).toHaveBeenCalledWith('checkout');
    expect(store.registerModule).toHaveBeenCalledWith('shipping', shippingModule);
    expect(store.registerModule).toHaveBeenCalledWith('payment', paymentModule);
    expect(store.registerModule).toHaveBeenCalledWith('checkout', checkoutModule);
    expect(store.subscribe).toHaveBeenCalled();
  });

  it('should subscribe and set personal details on updates', () => {
    const mockState = {
      checkout: {
        personalDetails: {
          firstName: 'example first name',
          lastName: 'example last name'
        }
      }
    };

    CheckoutModule({ store } as any);
    subscription({ type: types.CHECKOUT_SAVE_PERSONAL_DETAILS }, mockState);

    expect(StorageManager.get).toHaveBeenCalledWith('checkout');
    expect(mockSetItem).toHaveBeenCalledWith('personal-details', mockState.checkout.personalDetails);
  });

  it('should subscribe and set shipping details on updates', () => {
    const mockState = {
      checkout: {
        shippingDetails: {
          firstName: 'example first name',
          lastName: 'example last name'
        }
      }
    };

    CheckoutModule({ store } as any);
    subscription({ type: types.CHECKOUT_SAVE_SHIPPING_DETAILS }, mockState);

    expect(StorageManager.get).toHaveBeenCalledWith('checkout');
    expect(mockSetItem).toHaveBeenCalledWith('shipping-details', mockState.checkout.shippingDetails);
  });

  it('should subscribe and set payment details on updates', () => {
    const mockState = {
      checkout: {
        paymentDetails: {
          firstName: 'example first name',
          lastName: 'example last name'
        }
      }
    };

    CheckoutModule({ store } as any);
    subscription({ type: types.CHECKOUT_SAVE_PAYMENT_DETAILS }, mockState);

    expect(StorageManager.get).toHaveBeenCalledWith('checkout');
    expect(mockSetItem).toHaveBeenCalledWith('payment-details', mockState.checkout.paymentDetails);
  });
});
