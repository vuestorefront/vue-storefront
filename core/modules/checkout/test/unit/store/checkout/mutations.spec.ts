import * as types from '@vue-storefront/core/modules/checkout/store/checkout/mutation-types';
import checkoutMutations from '@vue-storefront/core/modules/checkout/store/checkout/mutations'

describe('Checkout mutations', () => {
  it('CHECKOUT_PLACE_ORDER should set order', () => {
    const order = { id: 1234567890 };
    const mockState = {
      order: null
    };
    const expectedState = {
      order: { ...order }
    };

    (checkoutMutations as any)[types.CHECKOUT_PLACE_ORDER](mockState, order);

    expect(mockState).toEqual(expectedState);
  });

  it('CHECKOUT_SET_MODIFIED_AT should set modified at time', () => {
    const mockState = {
      modifiedAt: 1
    };
    const expectedState = {
      modifiedAt: 1234567890
    };

    (checkoutMutations as any)[types.CHECKOUT_SET_MODIFIED_AT](mockState, 1234567890);

    expect(mockState).toEqual(expectedState);
  });

  it('CHECKOUT_SAVE_PERSONAL_DETAILS should set personal details', () => {
    const personalDetails = { id: 1234567890 };
    const mockState = {
      personalDetails: null
    };
    const expectedState = {
      personalDetails: { ...personalDetails }
    };

    (checkoutMutations as any)[types.CHECKOUT_SAVE_PERSONAL_DETAILS](mockState, personalDetails);

    expect(mockState).toEqual(expectedState);
  });

  it('CHECKOUT_SAVE_SHIPPING_DETAILS should set shipping details', () => {
    const shippingDetails = { id: 1234567890 };
    const mockState = {
      shippingDetails: null
    };
    const expectedState = {
      shippingDetails: { ...shippingDetails }
    };

    (checkoutMutations as any)[types.CHECKOUT_SAVE_SHIPPING_DETAILS](mockState, shippingDetails);

    expect(mockState).toEqual(expectedState);
  });

  it('CHECKOUT_SAVE_PAYMENT_DETAILS should set payment details', () => {
    const paymentDetails = { id: 1234567890 };
    const mockState = {
      paymentDetails: null
    };
    const expectedState = {
      paymentDetails: { ...paymentDetails }
    };

    (checkoutMutations as any)[types.CHECKOUT_SAVE_PAYMENT_DETAILS](mockState, paymentDetails);

    expect(mockState).toEqual(expectedState);
  });

  it('CHECKOUT_LOAD_PERSONAL_DETAILS should load personal details', () => {
    const personalDetails = { id: 1234567890 };
    const mockState = {
      personalDetails: null
    };
    const expectedState = {
      personalDetails: { ...personalDetails }
    };

    (checkoutMutations as any)[types.CHECKOUT_LOAD_PERSONAL_DETAILS](mockState, personalDetails);

    expect(mockState).toEqual(expectedState);
  });

  it('CHECKOUT_LOAD_SHIPPING_DETAILS should load personal details', () => {
    const shippingDetails = { id: 1234567890 };
    const mockState = {
      shippingDetails: null
    };
    const expectedState = {
      shippingDetails: { ...shippingDetails }
    };

    (checkoutMutations as any)[types.CHECKOUT_LOAD_SHIPPING_DETAILS](mockState, shippingDetails);

    expect(mockState).toEqual(expectedState);
  });

  it('CHECKOUT_LOAD_PAYMENT_DETAILS should load payment details', () => {
    const paymentDetails = { id: 1234567890 };
    const mockState = {
      paymentDetails: null
    };
    const expectedState = {
      paymentDetails: { ...paymentDetails }
    };

    (checkoutMutations as any)[types.CHECKOUT_LOAD_PAYMENT_DETAILS](mockState, paymentDetails);

    expect(mockState).toEqual(expectedState);
  });

  it('CHECKOUT_UPDATE_PROP_VALUE should update shipping property', () => {
    const payload = ['prop', 'value'];
    const mockState = {
      shippingDetails: {
        prop: null
      }
    };
    const expectedState = {
      shippingDetails: {
        prop: 'value'
      }
    };

    (checkoutMutations as any)[types.CHECKOUT_UPDATE_PROP_VALUE](mockState, payload);

    expect(mockState).toEqual(expectedState);
  });

  it('CHECKOUT_DROP_PASSWORD should init password and create account flag', () => {
    const mockState = {
      personalDetails: {
        password: 'example password',
        createAccount: true
      }
    };
    const expectedState = {
      personalDetails: {
        password: '',
        createAccount: false
      }
    };

    (checkoutMutations as any)[types.CHECKOUT_DROP_PASSWORD](mockState);

    expect(mockState).toEqual(expectedState);
  });

  it('CHECKOUT_SET_THANKYOU should init thank you page', () => {
    const mockState = {
      isThankYouPage: false
    };
    const expectedState = {
      isThankYouPage: true
    };

    (checkoutMutations as any)[types.CHECKOUT_SET_THANKYOU](mockState, true);

    expect(mockState).toEqual(expectedState);
  });

  it('CHECKOUT_ADD_PAYMENT_METHOD should add payment method', () => {
    const mockState = {
      paymentMethods: []
    };
    const expectedState = {
      paymentMethods: [{ code: 'example payment method' }]
    };

    (checkoutMutations as any)[types.CHECKOUT_ADD_PAYMENT_METHOD](mockState, { code: 'example payment method' });

    expect(mockState).toEqual(expectedState);
  });

  it('CHECKOUT_SET_PAYMENT_METHODS should set payment methods', () => {
    const mockState = {
      paymentMethods: [{ code: 'previous example payment method' }]
    };
    const expectedState = {
      paymentMethods: [{ code: 'example payment method' }]
    };

    (checkoutMutations as any)[types.CHECKOUT_SET_PAYMENT_METHODS](mockState, [{ code: 'example payment method' }]);

    expect(mockState).toEqual(expectedState);
  });

  it('CHECKOUT_ADD_SHIPPING_METHOD should add shipping method', () => {
    const mockState = {
      shippingMethods: []
    };
    const expectedState = {
      shippingMethods: [{ code: 'example shipping method' }]
    };

    (checkoutMutations as any)[types.CHECKOUT_ADD_SHIPPING_METHOD](mockState, { code: 'example shipping method' });

    expect(mockState).toEqual(expectedState);
  });

  it('CHECKOUT_SET_SHIPPING_METHODS should set shipping methods', () => {
    const mockState = {
      shippingMethods: [{ code: 'previous example shipping method' }]
    };
    const expectedState = {
      shippingMethods: [{ code: 'example shipping method' }]
    };

    (checkoutMutations as any)[types.CHECKOUT_SET_SHIPPING_METHODS](mockState, [{ code: 'example shipping method' }]);

    expect(mockState).toEqual(expectedState);
  });
});
