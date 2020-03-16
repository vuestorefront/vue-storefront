import { mountMixinWithStore } from '@vue-storefront/unit-tests/utils';
import { Payment } from '../../../components/Payment';

describe('Payment', () => {
  let mockStore;
  let mockMountingOptions;
  let mockMethods;
  let mockHooks;

  beforeEach(() => {
    jest.clearAllMocks();

    mockStore = {
      modules: {
        cart: {
          getters: {
            isVirtualCart: jest.fn(() => true)
          },
          namespaced: true
        },
        checkout: {
          state: {
            shippingDetails: {}
          },
          getters: {
            getPaymentMethods: jest.fn(() => ([])),
            getPaymentDetails: jest.fn(() => ({
              paymentMethod: '',
              firstName: '',
              company: '',
              country: ''
            }))
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
          $emit: jest.fn()
        }
      }
    };

    mockMethods = Object.entries(Payment.methods)
      .reduce((result, [methodName]) => {
        result[methodName] = jest.spyOn(Payment.methods, methodName as keyof typeof Payment.methods)
          .mockImplementation(jest.fn());

        return result;
      }, {});

    mockHooks = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed']
      .reduce((result, hookName) => {
        if (Payment[hookName]) {
          result[hookName] = jest.spyOn(Payment, hookName as any)
            .mockImplementation(jest.fn());
        }

        return result;
      }, {});
  });

  it('can be initialized', () => {
    const wrapper = mountMixinWithStore(Payment, mockStore, mockMountingOptions);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('exposes computed properties', () => {
    const wrapper = mountMixinWithStore(Payment, mockStore, mockMountingOptions);

    expect((wrapper.vm as any).currentUser).toBeDefined();
    expect((wrapper.vm as any).shippingDetails).toBeDefined();
    expect((wrapper.vm as any).paymentMethods).toBeDefined();
    expect((wrapper.vm as any).paymentDetails).toBeDefined();
    expect((wrapper.vm as any).isVirtualCart).toBeDefined();
  });

  describe('hooks', () => {
    describe('created hook', () => {
      beforeEach(() => {
        mockHooks['created'].mockRestore();
      });

      it('should initialize payment method as "cashondelivery" if payment method is not configured', () => {
        mockMethods['notInMethods'].mockReturnValue(false);
        mockStore.modules.checkout.getters.getPaymentMethods.mockImplementation(() => ([]));
        mockStore.modules.checkout.getters.getPaymentDetails.mockImplementation(() => ({
          paymentMethod: ''
        }));

        const wrapper = mountMixinWithStore(Payment, mockStore, mockMountingOptions);

        expect((wrapper.vm as any).payment.paymentMethod).toBe('cashondelivery');
      });

      it('should initialize payment method as "cashondelivery" if payment method is not supported', () => {
        mockMethods['notInMethods'].mockReturnValue(true);
        mockStore.modules.checkout.getters.getPaymentMethods.mockImplementation(() => ([]));
        mockStore.modules.checkout.getters.getPaymentDetails.mockImplementation(() => ({
          paymentMethod: 'not supported payment method'
        }));

        const wrapper = mountMixinWithStore(Payment, mockStore, mockMountingOptions);

        expect((wrapper.vm as any).payment.paymentMethod).toBe('cashondelivery');
      });

      it('should initialize payment method as first one from all payment methods if it is not configured', () => {
        mockMethods['notInMethods'].mockReturnValue(true);
        mockStore.modules.checkout.getters.getPaymentMethods.mockImplementation(() => ([
          { code: 'first payment method' }, { code: 'second payment method' }
        ]));
        mockStore.modules.checkout.getters.getPaymentDetails.mockImplementation(() => ({
          paymentMethod: 'not supported payment method'
        }));

        const wrapper = mountMixinWithStore(Payment, mockStore, mockMountingOptions);

        expect((wrapper.vm as any).payment.paymentMethod).toBe('first payment method');
      });
    });

    describe('mounted hook', () => {
      beforeEach(() => {
        mockHooks['mounted'].mockRestore();
      });

      it('should initialize billing address if payment is from individual customer and then change payment method', () => {
        mockStore.modules.checkout.getters.getPaymentDetails.mockImplementation(() => ({
          firstName: 'example first name',
          company: ''
        }));

        mountMixinWithStore(Payment, mockStore, mockMountingOptions);

        expect(mockMethods['initializeBillingAddress']).toHaveBeenCalled();
        expect(mockMethods['changePaymentMethod']).toHaveBeenCalled();
      });

      it('should mark invoice generation and do not initialize billing address if payment is from company and then change payment method', () => {
        mockStore.modules.checkout.getters.getPaymentDetails.mockImplementation(() => ({
          firstName: '',
          company: 'example company'
        }));

        const wrapper = mountMixinWithStore(Payment, mockStore, mockMountingOptions);

        expect(mockMethods['initializeBillingAddress']).not.toHaveBeenCalled();
        expect(mockMethods['changePaymentMethod']).toHaveBeenCalled();
        expect((wrapper.vm as any).generateInvoice).toBeTruthy();
      });
    });
  });

  describe('watchers', () => {
    it('should call copyShippingToBillingAddress method if "send to shipping address" flag is configured', () => {
      const wrapper = mountMixinWithStore(Payment, mockStore, mockMountingOptions);

      wrapper.setData({ sendToShippingAddress: true });
      (wrapper.vm as any).$options.watch.shippingDetails.handler.call(wrapper.vm);

      expect(mockMethods['copyShippingToBillingAddress']).toHaveBeenCalled();
    });

    it('should not call copyShippingToBillingAddress method if "send to shipping address" flag is not configured', () => {
      const wrapper = mountMixinWithStore(Payment, mockStore, mockMountingOptions);

      wrapper.setData({ sendToShippingAddress: false });
      (wrapper.vm as any).$options.watch.shippingDetails.handler.call(wrapper.vm);

      expect(mockMethods['copyShippingToBillingAddress']).not.toHaveBeenCalled();
    });

    it('should call useShippingAddress method if "send to shipping address" flag is changed', () => {
      const wrapper = mountMixinWithStore(Payment, mockStore, mockMountingOptions);

      (wrapper.vm as any).$options.watch.sendToShippingAddress.handler.call(wrapper.vm);

      expect(mockMethods['useShippingAddress']).toHaveBeenCalled();
    });

    it('should call useBillingAddress method if "send to billing address" flag is changed', () => {
      const wrapper = mountMixinWithStore(Payment, mockStore, mockMountingOptions);

      (wrapper.vm as any).$options.watch.sendToBillingAddress.handler.call(wrapper.vm);

      expect(mockMethods['useBillingAddress']).toHaveBeenCalled();
    });

    it('should call useGenerateInvoice method if "generate invoice" flag is changed', () => {
      const wrapper = mountMixinWithStore(Payment, mockStore, mockMountingOptions);

      (wrapper.vm as any).$options.watch.generateInvoice.handler.call(wrapper.vm);

      expect(mockMethods['useGenerateInvoice']).toHaveBeenCalled();
    });
  });

  describe('methods', () => {
    it('sendDataToCheckout method should emit an event and set flag', () => {
      mockMethods['sendDataToCheckout'].mockRestore();

      const paymentDetails = {
        firstName: 'example first name',
        company: 'example company',
        country: 'example country'
      };

      mockStore.modules.checkout.getters.getPaymentDetails.mockImplementation(() => paymentDetails);

      const wrapper = mountMixinWithStore(Payment, mockStore, mockMountingOptions);

      (wrapper.vm as any).sendDataToCheckout();

      expect(mockMountingOptions.mocks.$bus.$emit).toHaveBeenCalledWith('checkout-after-paymentDetails', paymentDetails, undefined);
      expect((wrapper.vm as any).isFilled).toBe(true);
    });

    it('edit method should emit event if flag is set', () => {
      mockMethods['edit'].mockRestore();

      const wrapper = mountMixinWithStore(Payment, mockStore, mockMountingOptions);

      wrapper.setData({ isFilled: true });
      (wrapper.vm as any).edit();

      expect(mockMountingOptions.mocks.$bus.$emit).toHaveBeenCalledWith('checkout-before-edit', 'payment');
    });

    it('edit method should not emit event if flag is not set', () => {
      mockMethods['edit'].mockRestore();

      const wrapper = mountMixinWithStore(Payment, mockStore, mockMountingOptions);

      wrapper.setData({ isFilled: false });
      (wrapper.vm as any).edit();

      expect(mockMountingOptions.mocks.$bus.$emit).not.toHaveBeenCalled();
    });

    it('hasBillingData method should inform if current user has default_billing own property', () => {
      mockMethods['hasBillingData'].mockRestore();

      const wrapper = mountMixinWithStore(Payment, mockStore, mockMountingOptions);

      mockStore.modules.user.state.current = { default_billing: true };
      expect((wrapper.vm as any).hasBillingData()).toBe(true);

      mockStore.modules.user.state.current = {};
      expect((wrapper.vm as any).hasBillingData()).toBe(false);
    });

    it('initializeBillingAddress method should init payment properties with empty strings if current user and payment details are not set', () => {
      mockMethods['initializeBillingAddress'].mockRestore();
      mockMountingOptions.computed = {
        currentUser: jest.fn(),
        paymentDetails: jest.fn()
      };

      const wrapper = mountMixinWithStore(Payment, mockStore, mockMountingOptions);
      (wrapper.vm as any).initializeBillingAddress();

      expect((wrapper.vm as any).payment).toEqual({
        firstName: '',
        lastName: '',
        company: '',
        country: '',
        state: '',
        city: '',
        streetAddress: '',
        apartmentNumber: '',
        postcode: '',
        zipCode: '',
        phoneNumber: '',
        taxId: '',
        paymentMethod: ''
      });
    });

    it('initializeBillingAddress method should copy billing address from address id from current user', () => {
      mockMethods['initializeBillingAddress'].mockRestore();
      mockMountingOptions.computed = {
        currentUser: jest.fn(() => ({
          default_billing: 123,
          addresses: [
            {
              id: 123,
              firstname: 'example first name',
              lastname: 'example last name',
              company: 'example company',
              country_id: 'example country',
              region: { region: 'example region' },
              city: 'example city',
              street: ['example street', 'example apartment number'],
              postcode: 'example post code',
              vat_id: 'example vat id',
              telephone: 'example telephone'
            }
          ]
        })),
        paymentMethods: jest.fn(() => ([{ code: 'example payment method' }])),
        paymentDetails: jest.fn()
      };

      const wrapper = mountMixinWithStore(Payment, mockStore, mockMountingOptions);
      (wrapper.vm as any).initializeBillingAddress();

      expect((wrapper.vm as any).payment).toEqual({
        firstName: 'example first name',
        lastName: 'example last name',
        company: 'example company',
        country: 'example country',
        state: 'example region',
        city: 'example city',
        streetAddress: 'example street',
        apartmentNumber: 'example apartment number',
        zipCode: 'example post code',
        phoneNumber: 'example telephone',
        taxId: 'example vat id',
        paymentMethod: 'example payment method'
      });
      expect((wrapper.vm as any).generateInvoice).toBe(true);
      expect((wrapper.vm as any).sendToBillingAddress).toBe(true);
    });

    it('useShippingAddress method should call copyShippingToBillingAddress if shipping address is set', () => {
      mockMethods['useShippingAddress'].mockRestore();
      mockMountingOptions.methods = {
        copyShippingToBillingAddress: jest.fn()
      };

      const wrapper = mountMixinWithStore(Payment, mockStore, mockMountingOptions);

      wrapper.setData({ sendToShippingAddress: true });
      (wrapper.vm as any).useShippingAddress();

      expect(mockMountingOptions.methods.copyShippingToBillingAddress).toHaveBeenCalled();
      expect((wrapper.vm as any).sendToBillingAddress).toBe(false);
    });

    it('useShippingAddress method should not call copyShippingToBillingAddress if shipping address is not set', () => {
      mockMethods['useShippingAddress'].mockRestore();

      const paymentDetails = {
        firstName: 'example first name',
        lastName: 'example last name',
        company: 'example company',
        country: 'example country',
        state: 'example region',
        city: 'example city',
        streetAddress: 'example street',
        apartmentNumber: 'example apartment number',
        zipCode: 'example post code',
        phoneNumber: 'example telephone',
        taxId: 'example vat id',
        paymentMethod: 'example payment method'
      };

      mockStore.modules.checkout.getters.getPaymentDetails.mockImplementation(() => paymentDetails);
      mockMountingOptions.methods = {
        copyShippingToBillingAddress: jest.fn()
      };

      const wrapper = mountMixinWithStore(Payment, mockStore, mockMountingOptions);

      wrapper.setData({ sendToBillingAddress: false, sendToShippingAddress: false });
      (wrapper.vm as any).useShippingAddress();

      expect(mockMountingOptions.methods.copyShippingToBillingAddress).not.toHaveBeenCalled();
      expect((wrapper.vm as any).payment).toEqual(paymentDetails);
    });

    it('copyShippingToBillingAddress method should copy data from shipping address', () => {
      mockMethods['copyShippingToBillingAddress'].mockRestore();

      const paymentDetails = {
        firstName: 'example first name',
        lastName: 'example last name',
        country: 'example country',
        state: 'example region',
        city: 'example city',
        streetAddress: 'example street',
        apartmentNumber: 'example apartment number',
        zipCode: 'example post code',
        phoneNumber: 'example telephone'
      };

      mockStore.modules.checkout.state.shippingDetails = paymentDetails;
      mockStore.modules.checkout.getters.getPaymentMethods.mockImplementation(() => ([
        { code: 'first payment method' }, { code: 'second payment method' }
      ]));

      const wrapper = mountMixinWithStore(Payment, mockStore, mockMountingOptions);
      (wrapper.vm as any).copyShippingToBillingAddress();

      expect((wrapper.vm as any).payment).toEqual({
        ...paymentDetails,
        paymentMethod: 'first payment method'
      });
    });

    it('useBillingAddress method should copy billing address from address id from current user', () => {
      mockMethods['useBillingAddress'].mockRestore();
      mockMountingOptions.computed = {
        currentUser: jest.fn(() => ({
          default_billing: 123,
          addresses: [
            {
              id: 123,
              firstname: 'example first name',
              lastname: 'example last name',
              company: 'example company',
              country_id: 'example country',
              region: { region: 'example region' },
              city: 'example city',
              street: ['example street', 'example apartment number'],
              postcode: 'example post code',
              vat_id: 'example vat id',
              telephone: 'example telephone'
            }
          ]
        })),
        paymentMethods: jest.fn(() => ([{ code: 'example payment method' }]))
      };

      const wrapper = mountMixinWithStore(Payment, mockStore, mockMountingOptions);

      wrapper.setData({ sendToBillingAddress: true });
      (wrapper.vm as any).useBillingAddress();

      expect((wrapper.vm as any).payment).toEqual({
        firstName: 'example first name',
        lastName: 'example last name',
        company: 'example company',
        country: 'example country',
        state: 'example region',
        city: 'example city',
        streetAddress: 'example street',
        apartmentNumber: 'example apartment number',
        zipCode: 'example post code',
        phoneNumber: 'example telephone',
        taxId: 'example vat id',
        paymentMethod: 'example payment method'
      });
      expect((wrapper.vm as any).generateInvoice).toBe(true);
      expect((wrapper.vm as any).sendToShippingAddress).toBe(false);
    });

    it('useBillingAddress method should copy billing address from payment details if address is not set', () => {
      mockMethods['useBillingAddress'].mockRestore();

      const paymentDetails = {
        firstName: 'example first name',
        lastName: 'example last name',
        company: 'example company',
        country: 'example country',
        state: 'example region',
        city: 'example city',
        streetAddress: 'example street',
        apartmentNumber: 'example apartment number',
        zipCode: 'example post code',
        phoneNumber: 'example telephone',
        taxId: 'example vat id',
        paymentMethod: 'example payment method'
      };

      mockStore.modules.checkout.getters.getPaymentDetails.mockImplementation(() => paymentDetails);

      const wrapper = mountMixinWithStore(Payment, mockStore, mockMountingOptions);

      wrapper.setData({ sendToBillingAddress: false, sendToShippingAddress: false });
      (wrapper.vm as any).useBillingAddress();

      expect((wrapper.vm as any).payment).toEqual(paymentDetails);
      expect((wrapper.vm as any).generateInvoice).toBe(false);
    });

    it('useGenerateInvoice method should clear company and taxId fields if generateInvoice is not set', () => {
      mockMethods['useGenerateInvoice'].mockRestore();
      mockStore.modules.checkout.getters.getPaymentDetails.mockImplementation(() => ({
        company: 'example company',
        taxId: 'example taxId'
      }));

      const wrapper = mountMixinWithStore(Payment, mockStore, mockMountingOptions);

      wrapper.setData({ generateInvoice: false });
      (wrapper.vm as any).useGenerateInvoice();

      expect((wrapper.vm as any).payment.company).toBe('');
      expect((wrapper.vm as any).payment.taxId).toBe('');
    });

    it('useGenerateInvoice method should not clear company and taxId fields if generateInvoice is set', () => {
      mockMethods['useGenerateInvoice'].mockRestore();
      mockStore.modules.checkout.getters.getPaymentDetails.mockImplementation(() => ({
        company: 'example company',
        taxId: 'example taxId'
      }));

      const wrapper = mountMixinWithStore(Payment, mockStore, mockMountingOptions);

      wrapper.setData({ generateInvoice: true });
      (wrapper.vm as any).useGenerateInvoice();

      expect((wrapper.vm as any).payment.company).toBe('example company');
      expect((wrapper.vm as any).payment.taxId).toBe('example taxId');
    });

    it('getCountryName method should return country name from payment', () => {
      mockMethods['getCountryName'].mockRestore();
      mockStore.modules.checkout.getters.getPaymentDetails.mockImplementation(() => ({
        country: 'PL'
      }));

      const wrapper = mountMixinWithStore(Payment, mockStore, mockMountingOptions);
      const countryName = (wrapper.vm as any).getCountryName();

      expect(countryName).toBe('Poland');
    });

    it('getCountryName method should return empty string if country has not been found', () => {
      mockMethods['getCountryName'].mockRestore();
      mockStore.modules.checkout.getters.getPaymentDetails.mockImplementation(() => ({
        country: 'invalid country code'
      }));

      const wrapper = mountMixinWithStore(Payment, mockStore, mockMountingOptions);
      const countryName = (wrapper.vm as any).getCountryName();

      expect(countryName).toBe('');
    });

    it('getPaymentMethod method should return payment name', () => {
      mockMethods['getPaymentMethod'].mockRestore();
      mockStore.modules.checkout.getters.getPaymentDetails.mockImplementation(() => ({
        paymentMethod: 'second payment method'
      }));
      mockStore.modules.checkout.getters.getPaymentMethods.mockImplementation(() => ([
        { code: 'first payment method', name: 'payment 1' }, { code: 'second payment method', name: 'payment 2' }
      ]));

      const wrapper = mountMixinWithStore(Payment, mockStore, mockMountingOptions);
      const paymentMethod = (wrapper.vm as any).getPaymentMethod();

      expect(paymentMethod).toEqual({ title: 'payment 2' });
    });

    it('getPaymentMethod method should return empty name if it is not found', () => {
      mockMethods['getPaymentMethod'].mockRestore();
      mockStore.modules.checkout.getters.getPaymentDetails.mockImplementation(() => ({
        paymentMethod: 'invalid payment method'
      }));
      mockStore.modules.checkout.getters.getPaymentMethods.mockImplementation(() => ([
        { code: 'first payment method', name: 'payment 1' }, { code: 'second payment method', name: 'payment 2' }
      ]));

      const wrapper = mountMixinWithStore(Payment, mockStore, mockMountingOptions);
      const paymentMethod = (wrapper.vm as any).getPaymentMethod();

      expect(paymentMethod).toEqual({ name: '' });
    });

    it('notInMethods method should inform if given payment method is not supported', () => {
      mockMethods['notInMethods'].mockRestore();
      mockStore.modules.checkout.getters.getPaymentMethods.mockImplementation(() => ([
        { code: 'first payment method', name: 'payment 1' }, { code: 'second payment method', name: 'payment 2' }
      ]));

      const wrapper = mountMixinWithStore(Payment, mockStore, mockMountingOptions);

      expect((wrapper.vm as any).notInMethods('second payment method')).toBe(false);
      expect((wrapper.vm as any).notInMethods('invalid payment method')).toBe(true);
    });

    it('changePaymentMethod method should emit an event when there is paymentMethod', () => {
      mockMethods['changePaymentMethod'].mockRestore();
      mockStore.modules.checkout.getters.getPaymentDetails.mockImplementation(() => ({
        paymentMethod: 'payment method'
      }));

      const wrapper = mountMixinWithStore(Payment, mockStore, mockMountingOptions);
      (wrapper.vm as any).changePaymentMethod();

      expect(mockMountingOptions.mocks.$bus.$emit).toHaveBeenCalledWith('checkout-payment-method-changed', expect.anything());
    });
  });
});
