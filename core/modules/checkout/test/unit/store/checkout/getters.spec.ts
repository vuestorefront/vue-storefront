import checkoutGetters from '@vue-storefront/core/modules/checkout/store/checkout/getters';

describe('Checkout getters', () => {
  it('getShippingDetails should return shipping details with default country from rootState if country is missing in shipping details', () => {
    const mockState = {
      shippingDetails: {
        firstName: 'example first name',
        lastName: 'example last name',
        country: ''
      }
    };

    const mockRootState = {
      storeView: {
        tax: {
          defaultCountry: 'Poland'
        }
      }
    };

    const shippingDetails = (checkoutGetters as any).getShippingDetails(mockState, null, mockRootState);

    expect(shippingDetails).toEqual({ ...mockState.shippingDetails, country: mockRootState.storeView.tax.defaultCountry });
  });

  it('getShippingDetails should return shipping details with shipping country if it exists', () => {
    const mockState = {
      shippingDetails: {
        firstName: 'example first name',
        lastName: 'example last name',
        country: 'USA'
      }
    };

    const mockRootState = {
      storeView: {
        tax: {
          defaultCountry: 'Poland'
        }
      }
    };

    const shippingDetails = (checkoutGetters as any).getShippingDetails(mockState, null, mockRootState);

    expect(shippingDetails).toEqual({ ...mockState.shippingDetails });
  });

  it('getPersonalDetails should return personal details', () => {
    const mockState = {
      personalDetails: {
        firstName: 'example first name',
        lastName: 'example last name'
      }
    };

    const personalDetails = (checkoutGetters as any).getPersonalDetails(mockState);

    expect(personalDetails).toEqual({ ...mockState.personalDetails });
  });

  it('getPaymentDetails should return personal details', () => {
    const mockState = {
      paymentDetails: {
        paymentMethod: 'example payment method'
      }
    };

    const paymentDetails = (checkoutGetters as any).getPaymentDetails(mockState);

    expect(paymentDetails).toEqual({ ...mockState.paymentDetails });
  });

  it('isThankYouPage should inform if thank you page must be shown', () => {
    const isThankYouPage = (checkoutGetters as any).isThankYouPage({ isThankYouPage: true });
    const isNotThankYouPage = (checkoutGetters as any).isThankYouPage({ isThankYouPage: false });

    expect(isThankYouPage).toBe(true);
    expect(isNotThankYouPage).toBe(false);
  });

  it('getModifiedAt should return modified at time', () => {
    const modifiedAt = (checkoutGetters as any).getModifiedAt({ modifiedAt: 1234567890 });

    expect(modifiedAt).toBe(1234567890);
  });

  it('isUserInCheckout should inform if user is in checkout if it has been modified less than 30 minutes ago', () => {
    const isUserInCheckout = (checkoutGetters as any).isUserInCheckout({ modifiedAt: Date.now() - (1000 * 60 * 29) });
    const isUserNotInCheckout = (checkoutGetters as any).isUserInCheckout({ modifiedAt: Date.now() - (1000 * 60 * 31) });

    expect(isUserInCheckout).toBe(true);
    expect(isUserNotInCheckout).toBe(false);
  });

  it('getPaymentMethods should return all configured payment methods if virtual cart is not set', () => {
    const mockState = {
      paymentMethods: [
        { code: 'example method 1' }, { code: 'example method 2' }, { code: 'cashondelivery' }
      ]
    };
    const rootGetters = {
      'cart/isVirtualCart': false
    };

    const paymentMethods = (checkoutGetters as any).getPaymentMethods(mockState, null, null, rootGetters);

    expect(paymentMethods).toEqual([{ code: 'example method 1' }, { code: 'example method 2' }, { code: 'cashondelivery' }]);
  });

  it('getPaymentMethods should return all configured payment methods except cashondelivery if virtual cart is set', () => {
    const mockState = {
      paymentMethods: [
        { code: 'example method 1' }, { code: 'example method 2' }, { code: 'cashondelivery' }
      ]
    };
    const rootGetters = {
      'cart/isVirtualCart': true
    };

    const paymentMethods = (checkoutGetters as any).getPaymentMethods(mockState, null, null, rootGetters);

    expect(paymentMethods).toEqual([{ code: 'example method 1' }, { code: 'example method 2' }]);
  });

  it('getDefaultPaymentMethod should return default payment method', () => {
    const mockGetters = {
      getPaymentMethods: [
        { code: 'example method 1' }, { code: 'example method 2', default: true }, { code: 'cashondelivery' }
      ]
    };

    const paymentMethod = (checkoutGetters as any).getDefaultPaymentMethod(null, mockGetters);

    expect(paymentMethod).toEqual({ code: 'example method 2', default: true });
  });

  it('getNotServerPaymentMethods should return methods not for server', () => {
    const mockGetters = {
      getPaymentMethods: [
        { code: 'example method 1' }, { code: 'example method 2', is_server_method: true }
      ]
    };

    const paymentMethods = (checkoutGetters as any).getNotServerPaymentMethods(null, mockGetters);

    expect(paymentMethods).toEqual([{ code: 'example method 1' }]);
  });

  it('getShippingMethods should return shipping methods', () => {
    const mockState = {
      shippingMethods: [
        { code: 'example method 1' }, { code: 'example method 2' }
      ]
    };

    const shippingMethods = (checkoutGetters as any).getShippingMethods(mockState);

    expect(shippingMethods).toEqual([{ code: 'example method 1' }, { code: 'example method 2' }]);
  });

  it('getDefaultShippingMethod should return default shipping method', () => {
    const mockState = {
      shippingMethods: [
        { code: 'example method 1' }, { code: 'example method 2', default: true }
      ]
    };

    const shippingMethod = (checkoutGetters as any).getDefaultShippingMethod(mockState);

    expect(shippingMethod).toEqual({ code: 'example method 2', default: true });
  });
});
