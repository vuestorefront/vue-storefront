import { mountMixinWithStore } from '@vue-storefront/unit-tests/utils';
import { Shipping } from '../../../components/Shipping';

describe('Shipping', () => {
  let mockStore;
  let mockMountingOptions;
  let mockMethods;
  let mockHooks;

  beforeEach(() => {
    jest.clearAllMocks();

    mockStore = {
      modules: {
        checkout: {
          state: {
            shippingDetails: {}
          },
          getters: {
            getShippingMethods: jest.fn(() => ([])),
            getPaymentMethods: jest.fn(() => ([]))
          },
          actions: {
            updatePropValue: jest.fn()
          },
          namespaced: true
        },
        user: {
          state: {
            current: {}
          },
          namespaced: true
        }
      }
    };

    mockMountingOptions = {
      propsData: {
        isActive: true
      },
      mocks: {
        $bus: {
          $emit: jest.fn(),
          $on: jest.fn(),
          $off: jest.fn()
        }
      }
    };

    mockMethods = Object.entries(Shipping.methods)
      .reduce((result, [methodName]) => {
        result[methodName] = jest.spyOn(Shipping.methods, methodName as keyof typeof Shipping.methods)
          .mockImplementation(jest.fn());

        return result;
      }, {});

    mockHooks = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed']
      .reduce((result, hookName) => {
        if (Shipping[hookName]) {
          result[hookName] = jest.spyOn(Shipping, hookName as any)
            .mockImplementation(jest.fn());
        }

        return result;
      }, {});
  });

  it('can be initialized', () => {
    const wrapper = mountMixinWithStore(Shipping, mockStore, mockMountingOptions);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('exposes computed properties', () => {
    const wrapper = mountMixinWithStore(Shipping, mockStore, mockMountingOptions);

    expect((wrapper.vm as any).currentUser).toBeDefined();
    expect((wrapper.vm as any).shippingMethods).toBeDefined();
    expect((wrapper.vm as any).checkoutShippingDetails).toBeDefined();
    expect((wrapper.vm as any).paymentMethod).toBeDefined();
  });

  describe('hooks', () => {
    it('beforeMount hook should start subscription for checkout-after-personalDetails and checkout-after-shippingset events', () => {
      mockHooks['beforeMount'].mockRestore();

      const wrapper = mountMixinWithStore(Shipping, mockStore, mockMountingOptions);

      expect(mockMountingOptions.mocks.$bus.$on)
        .toHaveBeenCalledWith('checkout-after-personalDetails', (wrapper.vm as any).onAfterPersonalDetails);
      expect(mockMountingOptions.mocks.$bus.$on)
        .toHaveBeenCalledWith('checkout-after-shippingset', (wrapper.vm as any).onAfterShippingSet);
    });

    it('beforeDestroy hook should stop subscription for checkout-after-personalDetails and checkout-after-shippingset events', () => {
      mockHooks['beforeDestroy'].mockRestore();

      const wrapper = mountMixinWithStore(Shipping, mockStore, mockMountingOptions);
      wrapper.destroy();

      expect(mockMountingOptions.mocks.$bus.$off)
        .toHaveBeenCalledWith('checkout-after-personalDetails', (wrapper.vm as any).onAfterPersonalDetails);
      expect(mockMountingOptions.mocks.$bus.$off)
        .toHaveBeenCalledWith('checkout-after-shippingset', (wrapper.vm as any).onAfterShippingSet);
    });

    it('mounted hook should call shipping details methods', () => {
      mockHooks['mounted'].mockRestore();

      mountMixinWithStore(Shipping, mockStore, mockMountingOptions);

      expect(mockMethods['checkDefaultShippingAddress']).toHaveBeenCalled();
      expect(mockMethods['checkDefaultShippingMethod']).toHaveBeenCalled();
      expect(mockMethods['changeShippingMethod']).toHaveBeenCalled();
    });
  });

  describe('watchers', () => {
    it('should call checkDefaultShippingMethod method if shipping methods have changed', () => {
      const wrapper = mountMixinWithStore(Shipping, mockStore, mockMountingOptions);

      (wrapper.vm as any).$options.watch.shippingMethods.handler.call(wrapper.vm);

      expect(mockMethods['checkDefaultShippingMethod']).toHaveBeenCalled();
    });

    it('should call useMyAddress method if shipping address has changed', () => {
      const wrapper = mountMixinWithStore(Shipping, mockStore, mockMountingOptions);

      (wrapper.vm as any).$options.watch.shipToMyAddress.handler.call(wrapper.vm);

      expect(mockMethods['useMyAddress']).toHaveBeenCalled();
    });
  });

  describe('methods', () => {
    it('checkDefaultShippingAddress should check if default shipping address is configured', () => {
      mockMethods['checkDefaultShippingAddress'].mockRestore();

      const wrapper = mountMixinWithStore(Shipping, mockStore, mockMountingOptions);

      mockMethods['hasShippingDetails'].mockClear();
      mockMethods['hasShippingDetails'].mockReturnValue(false);
      (wrapper.vm as any).checkDefaultShippingAddress();

      expect(mockMethods['hasShippingDetails']).toHaveBeenCalled();
      expect((wrapper.vm as any).shipToMyAddress).toBe(false);

      mockMethods['hasShippingDetails'].mockClear();
      mockMethods['hasShippingDetails'].mockReturnValue(true);
      (wrapper.vm as any).checkDefaultShippingAddress();

      expect(mockMethods['hasShippingDetails']).toHaveBeenCalled();
      expect((wrapper.vm as any).shipToMyAddress).toBe(true);
    });

    it('checkDefaultShippingMethod should configure default shipping method and carrier if current shipping method is falsy', () => {
      mockMethods['checkDefaultShippingMethod'].mockRestore();
      mockStore.modules.checkout.state.shippingDetails.shippingMethod = '';
      mockStore.modules.checkout.getters.getShippingMethods.mockImplementation(() => ([
        { method_code: 'method code 1', carrier_code: 'carrier code 1' },
        { method_code: 'method code 2', carrier_code: 'carrier code 2' },
        { method_code: 'method code 3', carrier_code: 'carrier code 3', default: true }
      ]));

      const wrapper = mountMixinWithStore(Shipping, mockStore, mockMountingOptions);

      mockMethods['notInMethods'].mockClear();
      mockMethods['notInMethods'].mockReturnValue(true);
      (wrapper.vm as any).checkDefaultShippingMethod();

      expect(mockMethods['notInMethods']).not.toHaveBeenCalled();
      expect((wrapper.vm as any).shipping).toEqual({ shippingMethod: 'method code 3', shippingCarrier: 'carrier code 3' });
    });

    it('checkDefaultShippingMethod should configure default shipping method and carrier if current shipping method is not supported', () => {
      mockMethods['checkDefaultShippingMethod'].mockRestore();
      mockStore.modules.checkout.state.shippingDetails.shippingMethod = 'not supported shipping method';
      mockStore.modules.checkout.getters.getShippingMethods.mockImplementation(() => ([
        { method_code: 'method code 1', carrier_code: 'carrier code 1' },
        { method_code: 'method code 2', carrier_code: 'carrier code 2' },
        { method_code: 'method code 3', carrier_code: 'carrier code 3', default: true }
      ]));

      const wrapper = mountMixinWithStore(Shipping, mockStore, mockMountingOptions);

      mockMethods['notInMethods'].mockClear();
      mockMethods['notInMethods'].mockReturnValue(true);
      (wrapper.vm as any).checkDefaultShippingMethod();

      expect(mockMethods['notInMethods']).toHaveBeenCalledWith('not supported shipping method');
      expect((wrapper.vm as any).shipping).toEqual({ shippingMethod: 'method code 3', shippingCarrier: 'carrier code 3' });
    });

    it('onAfterShippingSet should configure shipping data', () => {
      mockMethods['onAfterShippingSet'].mockRestore();

      const shippingData = { shippingMethod: 'method code 3', shippingCarrier: 'carrier code 3' };
      const wrapper = mountMixinWithStore(Shipping, mockStore, mockMountingOptions);

      (wrapper.vm as any).onAfterShippingSet(shippingData);

      expect((wrapper.vm as any).shipping).toEqual(shippingData);
      expect((wrapper.vm as any).isFilled).toBe(true);
    });

    it('onAfterPersonalDetails should configure personal data by dispatching actions', () => {
      mockMethods['onAfterPersonalDetails'].mockRestore();

      const personalData = { firstName: 'example first name', lastName: 'example last name' };
      const wrapper = mountMixinWithStore(Shipping, mockStore, mockMountingOptions);

      wrapper.setData({ isFilled: false });
      (wrapper.vm as any).onAfterPersonalDetails(personalData);

      expect(mockStore.modules.checkout.actions.updatePropValue)
        .toHaveBeenCalledWith(expect.anything(), ['firstName', 'example first name']);
      expect(mockStore.modules.checkout.actions.updatePropValue)
        .toHaveBeenCalledWith(expect.anything(), ['lastName', 'example last name']);
    });

    it('sendDataToCheckout should emit event', () => {
      mockMethods['sendDataToCheckout'].mockRestore();

      const shippingData = { shippingMethod: 'method code 3', shippingCarrier: 'carrier code 3' };
      const wrapper = mountMixinWithStore(Shipping, mockStore, mockMountingOptions);

      wrapper.setData({ shipping: shippingData });
      (wrapper.vm as any).sendDataToCheckout();

      expect(mockMountingOptions.mocks.$bus.$emit).toHaveBeenCalledWith('checkout-after-shippingDetails', shippingData, undefined);
      expect((wrapper.vm as any).isFilled).toBe(true);
    });

    it('edit should emit event only if form is filled', () => {
      mockMethods['edit'].mockRestore();

      const wrapper = mountMixinWithStore(Shipping, mockStore, mockMountingOptions);

      mockMountingOptions.mocks.$bus.$emit.mockClear();
      wrapper.setData({ isFilled: true });
      (wrapper.vm as any).edit();

      expect(mockMountingOptions.mocks.$bus.$emit).toHaveBeenCalledWith('checkout-before-edit', 'shipping');

      mockMountingOptions.mocks.$bus.$emit.mockClear();
      wrapper.setData({ isFilled: false });
      (wrapper.vm as any).edit();

      expect(mockMountingOptions.mocks.$bus.$emit).not.toHaveBeenCalled();
    });

    it('hasShippingDetails should check if shipping address is configured', () => {
      mockMethods['hasShippingDetails'].mockRestore();
      mockStore.modules.user.state.current = {};

      const wrapper = mountMixinWithStore(Shipping, mockStore, mockMountingOptions);
      const hasShippingDetails = (wrapper.vm as any).hasShippingDetails();

      expect(hasShippingDetails).toBe(false);
    });

    it('hasShippingDetails should init default shipping address only if it is configured', () => {
      mockMethods['hasShippingDetails'].mockRestore();

      const defaultAddress = { id: 123, city: 'example city', street: 'example street' };

      mockStore.modules.user.state.current = {
        default_shipping: 123,
        addresses: [defaultAddress]
      };

      const wrapper = mountMixinWithStore(Shipping, mockStore, mockMountingOptions);
      const hasShippingDetails = (wrapper.vm as any).hasShippingDetails();

      expect(hasShippingDetails).toBe(true);
      expect((wrapper.vm as any).myAddressDetails).toEqual(defaultAddress);
    });

    it('useMyAddress should init shipping address from myAddressDetails if shipToMyAddress is set', () => {
      mockMethods['useMyAddress'].mockRestore();
      mockStore.modules.checkout.state.shippingDetails = {
        shippingMethod: 'example shipping method',
        shippingCarrier: 'example shipping carrier'
      };

      const myAddressDetails = {
        firstname: 'example first name',
        lastname: 'example last name',
        country_id: 'example country',
        region: { region: 'example region' },
        city: 'example city',
        street: ['example street', 'example apartment number'],
        postcode: 'example zip code',
        telephone: 'example phone number'
      };

      const wrapper = mountMixinWithStore(Shipping, mockStore, mockMountingOptions);
      wrapper.setData({ shipToMyAddress: true });
      wrapper.setData({ myAddressDetails });
      (wrapper.vm as any).useMyAddress();

      expect((wrapper.vm as any).shipping).toEqual({
        firstName: 'example first name',
        lastName: 'example last name',
        country: 'example country',
        state: 'example region',
        city: 'example city',
        streetAddress: 'example street',
        apartmentNumber: 'example apartment number',
        zipCode: 'example zip code',
        phoneNumber: 'example phone number',
        shippingMethod: 'example shipping method',
        shippingCarrier: 'example shipping carrier'
      });
    });

    it('useMyAddress should init shipping address from shippingDetails if shipToMyAddress is not set', () => {
      mockMethods['useMyAddress'].mockRestore();
      mockStore.modules.checkout.state.shippingDetails = {
        shippingMethod: 'example shipping method',
        shippingCarrier: 'example shipping carrier'
      };

      const wrapper = mountMixinWithStore(Shipping, mockStore, mockMountingOptions);
      wrapper.setData({ shipToMyAddress: false });
      (wrapper.vm as any).useMyAddress();

      expect((wrapper.vm as any).shipping).toEqual(mockStore.modules.checkout.state.shippingDetails);
    });

    it('useMyAddress should call changeCountry method', () => {
      mockMethods['useMyAddress'].mockRestore();

      const wrapper = mountMixinWithStore(Shipping, mockStore, mockMountingOptions);
      (wrapper.vm as any).useMyAddress();

      expect(mockMethods['changeCountry']).toHaveBeenCalled();
    });

    it('getShippingMethod should return empty method_title and amount if shipping method is different than current one', () => {
      mockMethods['getShippingMethod'].mockRestore();
      mockStore.modules.checkout.state.shippingDetails.shippingMethod = 'not supported shipping method';
      mockStore.modules.checkout.getters.getShippingMethods.mockImplementation(() => ([
        { method_code: 'method code 1', method_title: 'method title 1', amount: 'amount 1' },
        { method_code: 'method code 2', method_title: 'method title 2', amount: 'amount 2' },
        { method_code: 'method code 3', method_title: 'method title 3', amount: 'amount 3' }
      ]));

      const wrapper = mountMixinWithStore(Shipping, mockStore, mockMountingOptions);
      const shippingMethod = (wrapper.vm as any).getShippingMethod();

      expect(shippingMethod).toEqual({ method_title: '', amount: '' });
    });

    it('getShippingMethod should return method_title and amount if it is supported', () => {
      mockMethods['getShippingMethod'].mockRestore();
      mockStore.modules.checkout.state.shippingDetails.shippingMethod = 'method code 2';
      mockStore.modules.checkout.getters.getShippingMethods.mockImplementation(() => ([
        { method_code: 'method code 1', method_title: 'method title 1', amount: 'amount 1' },
        { method_code: 'method code 2', method_title: 'method title 2', amount: 'amount 2' },
        { method_code: 'method code 3', method_title: 'method title 3', amount: 'amount 3' }
      ]));

      const wrapper = mountMixinWithStore(Shipping, mockStore, mockMountingOptions);
      const shippingMethod = (wrapper.vm as any).getShippingMethod();

      expect(shippingMethod).toEqual({ method_title: 'method title 2', amount: 'amount 2' });
    });

    it('getCountryName method should return country name from shipping', () => {
      mockMethods['getCountryName'].mockRestore();
      mockStore.modules.checkout.state.shippingDetails.country = 'PL';

      const wrapper = mountMixinWithStore(Shipping, mockStore, mockMountingOptions);
      const countryName = (wrapper.vm as any).getCountryName();

      expect(countryName).toBe('Poland');
    });

    it('getCountryName method should return empty string if country has not been found', () => {
      mockMethods['getCountryName'].mockRestore();
      mockStore.modules.checkout.state.shippingDetails.country = 'invalid country code';

      const wrapper = mountMixinWithStore(Shipping, mockStore, mockMountingOptions);
      const countryName = (wrapper.vm as any).getCountryName();

      expect(countryName).toBe('');
    });

    it('changeCountry should emit event', () => {
      mockMethods['changeCountry'].mockRestore();
      mockStore.modules.checkout.state.shippingDetails.country = 'PL';

      const wrapper = mountMixinWithStore(Shipping, mockStore, mockMountingOptions);
      (wrapper.vm as any).changeCountry();

      expect(mockMountingOptions.mocks.$bus.$emit).toHaveBeenCalledWith('checkout-before-shippingMethods', 'PL');
    });

    it('getCurrentShippingMethod should return undefined if there are no supported methods', () => {
      mockMethods['getCurrentShippingMethod'].mockRestore();
      mockStore.modules.checkout.state.shippingDetails.shippingMethod = 'not supported shipping method';
      mockStore.modules.checkout.getters.getShippingMethods.mockImplementation(() => ([]));

      const wrapper = mountMixinWithStore(Shipping, mockStore, mockMountingOptions);
      const shippingMethod = (wrapper.vm as any).getCurrentShippingMethod();

      expect(shippingMethod).toBeUndefined();
    });

    it('getCurrentShippingMethod should return shipping method details if it is supported', () => {
      mockMethods['getCurrentShippingMethod'].mockRestore();
      mockStore.modules.checkout.state.shippingDetails.shippingMethod = 'method code 2';
      mockStore.modules.checkout.getters.getShippingMethods.mockImplementation(() => ([
        { method_code: 'method code 1', method_title: 'method title 1', amount: 'amount 1' },
        { method_code: 'method code 2', method_title: 'method title 2', amount: 'amount 2' },
        { method_code: 'method code 3', method_title: 'method title 3', amount: 'amount 3' }
      ]));

      const wrapper = mountMixinWithStore(Shipping, mockStore, mockMountingOptions);
      const shippingMethod = (wrapper.vm as any).getCurrentShippingMethod();

      expect(shippingMethod).toEqual({ method_code: 'method code 2', method_title: 'method title 2', amount: 'amount 2' });
    });

    it('changeShippingMethod should not emit event if there is no current shipping method', () => {
      mockMethods['changeShippingMethod'].mockRestore();
      mockMethods['getCurrentShippingMethod'].mockReturnValue();

      const wrapper = mountMixinWithStore(Shipping, mockStore, mockMountingOptions);
      (wrapper.vm as any).changeShippingMethod();

      expect(mockMountingOptions.mocks.$bus.$emit).not.toHaveBeenCalled();
    });

    it('changeShippingMethod should emit event with current shipping method if it is configured', () => {
      mockMethods['changeShippingMethod'].mockRestore();
      mockMethods['getCurrentShippingMethod'].mockReturnValue({ method_code: 'method code', carrier_code: 'carrier code' });
      mockStore.modules.checkout.state.shippingDetails.country = 'PL';
      mockStore.modules.checkout.getters.getPaymentMethods.mockImplementation(() => ([{ code: 'payment code' }]));

      const wrapper = mountMixinWithStore(Shipping, mockStore, mockMountingOptions);
      (wrapper.vm as any).changeShippingMethod();

      expect(mockMountingOptions.mocks.$bus.$emit).toHaveBeenCalledWith('checkout-after-shippingMethodChanged', {
        country: 'PL',
        method_code: 'method code',
        carrier_code: 'carrier code',
        payment_method: 'payment code'
      });
    });

    it('notInMethods method should inform if given shipping method is not supported', () => {
      mockMethods['notInMethods'].mockRestore();
      mockStore.modules.checkout.getters.getShippingMethods.mockImplementation(() => ([
        { method_code: 'method code 1' },
        { method_code: 'method code 2' },
        { method_code: 'method code 3' }
      ]));

      const wrapper = mountMixinWithStore(Shipping, mockStore, mockMountingOptions);

      expect((wrapper.vm as any).notInMethods('method code 2')).toBe(false);
      expect((wrapper.vm as any).notInMethods('invalid method code')).toBe(true);
    });
  });
});
