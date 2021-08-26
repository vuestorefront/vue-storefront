import { mountMixin, mountMixinWithStore } from '@vue-storefront/unit-tests/utils';
import { OrderReview } from '../../../components/OrderReview';

jest.mock('@vue-storefront/i18n', () => ({
  t: jest.fn(t => t)
}));

jest.mock('@vue-storefront/core/lib/logger', () => ({
  Logger: {
    error: jest.fn(() => jest.fn())
  }
}));

describe('OrderReview', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('can be initialized', () => {
    const wrapper = mountMixin(OrderReview, {
      propsData: {
        isActive: true
      }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('exposes computed properties', () => {
    const mockStore = {
      modules: {
        cart: {
          getters: {
            isVirtualCart: jest.fn(() => true)
          },
          namespaced: true
        },
        checkout: {
          getters: {
            getShippingDetails: jest.fn(() => ([])),
            getPersonalDetails: jest.fn(() => ([]))
          },
          namespaced: true
        }
      }
    };

    const wrapper = mountMixinWithStore(OrderReview, mockStore, {
      propsData: {
        isActive: true
      }
    });

    expect((wrapper.vm as any).isVirtualCart).toBeDefined();
    expect((wrapper.vm as any).getShippingDetails).toBeDefined();
    expect((wrapper.vm as any).getPersonalDetails).toBeDefined();
  });

  describe('placeOrder method', () => {
    let wrapper;
    const mockGetPersonalDetails = jest.fn();
    const mockRegisterFn = jest.fn();
    const mockEmitFn = jest.fn();

    beforeEach(() => {
      wrapper = mountMixin(OrderReview, {
        propsData: {
          isActive: true
        },
        computed: {
          getPersonalDetails: mockGetPersonalDetails
        },
        methods: {
          register: mockRegisterFn
        },
        mocks: {
          $bus: {
            $emit: mockEmitFn
          }
        }
      });
    });

    it('registers an account if it is not created yet', () => {
      mockGetPersonalDetails.mockImplementation(() => ({
        createAccount: true
      }));

      (wrapper.vm as any).placeOrder();

      expect(mockRegisterFn).toHaveBeenCalled();
      expect(mockEmitFn).not.toHaveBeenCalled();
    });

    it('emits an event if account is already created', () => {
      mockGetPersonalDetails.mockImplementation(() => ({
        createAccount: false
      }));

      (wrapper.vm as any).placeOrder();

      expect(mockRegisterFn).not.toHaveBeenCalled();
      expect(mockEmitFn).toHaveBeenCalledWith('checkout-before-placeOrder');
    });
  });

  describe('register method', () => {
    let wrapper;

    const mockGetPersonalDetails = jest.fn(() => ({
      emailAddress: 'example email address',
      password: 'example password',
      firstName: 'example first name',
      lastName: 'example last name'
    }));

    const mockGetShippingDetails = jest.fn(() => ({
      firstName: 'example first name',
      lastName: 'example last name',
      streetAddress: 'example street address',
      apartmentNumber: 'example apartment number',
      city: 'example city',
      state: 'example state',
      region: 'example region',
      country: 'example country',
      zipCode: 'example zip code',
      phoneNumber: 'example phone number'
    }));

    const mockOnSuccessFn = jest.fn();
    const mockOnFailureFn = jest.fn();
    const mockEmitFn = jest.fn();

    const mockStore = {
      modules: {
        user: {
          actions: {
            login: jest.fn(),
            register: jest.fn()
          },
          namespaced: true
        }
      }
    };

    beforeEach(() => {
      wrapper = mountMixinWithStore(OrderReview, mockStore, {
        propsData: {
          isActive: true
        },
        computed: {
          getPersonalDetails: mockGetPersonalDetails,
          getShippingDetails: mockGetShippingDetails
        },
        methods: {
          onSuccess: mockOnSuccessFn,
          onFailure: mockOnFailureFn
        },
        mocks: {
          $bus: {
            $emit: mockEmitFn
          }
        }
      });
    });

    it('dispatches user/register action with proper payload', () => {
      (wrapper.vm as any).register();

      expect(mockStore.modules.user.actions.register).toHaveBeenCalledWith(expect.anything(), {
        email: 'example email address',
        password: 'example password',
        firstname: 'example first name',
        lastname: 'example last name',
        addresses: [{
          firstname: 'example first name',
          lastname: 'example last name',
          street: ['example street address', 'example apartment number'],
          city: 'example city',
          region: {
            region: 'example state'
          },
          country_id: 'example country',
          postcode: 'example zip code',
          telephone: 'example phone number',
          default_shipping: true
        }]
      });
    });

    it('emits events about start and stop of notification progress', async () => {
      const result = {
        code: 500,
        result: 'example error message'
      };

      mockStore.modules.user.actions.register.mockImplementation(() => Promise.resolve(result));

      await (wrapper.vm as any).register();

      expect(mockEmitFn).toHaveBeenCalledTimes(2);
      expect(mockEmitFn).toHaveBeenNthCalledWith(1, 'notification-progress-start', 'Registering the account ...');
      expect(mockEmitFn).toHaveBeenNthCalledWith(2, 'notification-progress-stop');
    });

    it('catches thrown error and sends event about stop of notification progress', async () => {
      mockStore.modules.user.actions.register.mockImplementation(() => { throw Error('Error') });

      await (wrapper.vm as any).register();

      expect(mockEmitFn).toHaveBeenCalledWith('notification-progress-stop');
    });

    describe('failed result if return code is other than 200', () => {
      it('calls onFailure callback', async () => {
        const result = {
          code: 500,
          result: 'example error message'
        };

        mockStore.modules.user.actions.register.mockImplementation(() => Promise.resolve(result));

        await (wrapper.vm as any).register();

        expect(mockOnFailureFn).toHaveBeenCalledWith(result);
        expect(mockOnSuccessFn).not.toHaveBeenCalled();
        expect(mockEmitFn).not.toHaveBeenCalledWith('checkout-before-placeOrder', expect.anything());
      });

      it('emits event to indicate validation error with password if error includes a word "password"', async () => {
        const result = {
          code: 500,
          result: 'example error message with password'
        };

        mockStore.modules.user.actions.register.mockImplementation(() => Promise.resolve(result));

        await (wrapper.vm as any).register();

        expect(mockEmitFn).toHaveBeenCalledWith('checkout-after-validationError', 'password');
      });

      it('emits event to indicate validation error with email address if error includes a word "email"', async () => {
        const result = {
          code: 500,
          result: 'example error message with email'
        };

        mockStore.modules.user.actions.register.mockImplementation(() => Promise.resolve(result));

        await (wrapper.vm as any).register();

        expect(mockEmitFn).toHaveBeenCalledWith('checkout-after-validationError', 'email-address');
      });
    });

    describe('successful result if return code is 200', () => {
      it('calls onSuccess callback and emits proper events', async () => {
        const result = {
          code: 200,
          result: { id: 42 }
        };

        mockStore.modules.user.actions.register.mockImplementation(() => Promise.resolve(result));

        await (wrapper.vm as any).register();

        expect(mockOnSuccessFn).toHaveBeenCalled();
        expect(mockOnFailureFn).not.toHaveBeenCalled();
        expect(mockEmitFn).toHaveBeenCalledWith('modal-hide', 'modal-signup');
        expect(mockEmitFn).toHaveBeenCalledWith('checkout-before-placeOrder', 42);
      });

      it('dispatches user/login action', async () => {
        const result = {
          code: 200,
          result: { id: 42 }
        };

        mockStore.modules.user.actions.register.mockImplementation(() => Promise.resolve(result));

        await (wrapper.vm as any).register();

        expect(mockStore.modules.user.actions.login).toHaveBeenCalledWith(expect.anything(), {
          username: 'example email address',
          password: 'example password'
        });
      });
    });
  });
});
