import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus';

import { mountMixinWithStore } from '@vue-storefront/unit-tests/utils';
import { PersonalDetails } from '../../../components/PersonalDetails';
import Vue from 'vue'


jest.mock('@vue-storefront/core/compatibility/plugins/event-bus', () => ({
  __esModule: true,
  default: {
    $emit: jest.fn(),
    $on: jest.fn(),
    $off: jest.fn()
  }
}));
describe('PersonalDetails', () => {
  let mockStore;
  let mockMountingOptions;

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
            personalDetails: {}
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
  });

  it('can be initialized', () => {
    const wrapper = mountMixinWithStore(PersonalDetails, mockStore, mockMountingOptions);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('exposes computed properties', () => {
    const wrapper = mountMixinWithStore(PersonalDetails, mockStore, mockMountingOptions);

    expect((wrapper.vm as any).currentUser).toBeDefined();
    expect((wrapper.vm as any).isVirtualCart).toBeDefined();
  });

  describe('hooks', () => {
    it('beforeMount hook should subscribe to checkout loading', () => {
      const wrapper = mountMixinWithStore(PersonalDetails, mockStore, mockMountingOptions);

      expect(EventBus.$on).toHaveBeenCalledWith('checkout-after-load', (wrapper.vm as any).onCheckoutLoad);
    });

    it('destroyed hook should stop the checkout loading subscription', () => {
      const wrapper = mountMixinWithStore(PersonalDetails, mockStore, mockMountingOptions);

      wrapper.destroy();

      expect(EventBus.$off).toHaveBeenCalledWith('checkout-after-load', (wrapper.vm as any).onCheckoutLoad);
    });

    it('updated hook should set focus on password field', async () => {
      const wrapper = mountMixinWithStore(PersonalDetails, mockStore, mockMountingOptions);
      (wrapper.vm as any).$refs.password = { setFocus: jest.fn() };

      wrapper.setData({ isValidationError: false });
      wrapper.setProps({ focusedField: 'password' });

      await Vue.nextTick()

      expect((wrapper.vm as any).isValidationError).toBe(true);
      expect((wrapper.vm as any).passwordData).toEqual({
        password: '',
        repeatPassword: ''
      });
      expect((wrapper.vm as any).$refs.password.setFocus).toHaveBeenCalledWith('password');
    });
  });

  describe('methods', () => {
    it('onLoggedIn method should set names and email', () => {
      const personalDetails = {
        firstname: 'example first name',
        lastname: 'example last name',
        email: 'example email'
      };
      const wrapper = mountMixinWithStore(PersonalDetails, mockStore, mockMountingOptions);

      (wrapper.vm as any).onLoggedIn(personalDetails);

      expect((wrapper.vm as any).personalDetails).toEqual({
        firstName: personalDetails.firstname,
        lastName: personalDetails.lastname,
        emailAddress: personalDetails.email
      });
    });

    it('sendDataToCheckout method should create new account if flag is set', () => {
      const wrapper = mountMixinWithStore(PersonalDetails, mockStore, mockMountingOptions);

      wrapper.setData({
        createAccount: true,
        passwordData: {
          password: 'example password',
          repeatPassword: 'example password'
        }
      });
      (wrapper.vm as any).sendDataToCheckout();

      expect((wrapper.vm as any).personalDetails).toEqual({
        password: 'example password',
        createAccount: true
      });
    });

    it('sendDataToCheckout method should not create new account if flag is not set', () => {
      const wrapper = mountMixinWithStore(PersonalDetails, mockStore, mockMountingOptions);

      wrapper.setData({ createAccount: false });
      (wrapper.vm as any).sendDataToCheckout();

      expect((wrapper.vm as any).personalDetails).toEqual({ createAccount: false });
    });

    it('sendDataToCheckout method should emit event and init `filled` and `validation error` flags', () => {
      const wrapper = mountMixinWithStore(PersonalDetails, mockStore, mockMountingOptions);

      wrapper.setData({ createAccount: false });
      (wrapper.vm as any).sendDataToCheckout();

      expect(EventBus.$emit).toHaveBeenCalledWith('checkout-after-personalDetails', { createAccount: false }, undefined);
      expect((wrapper.vm as any).isFilled).toBe(true);
      expect((wrapper.vm as any).isValidationError).toBe(false);
    });

    it('edit method should emit event if flag is set', () => {
      const wrapper = mountMixinWithStore(PersonalDetails, mockStore, mockMountingOptions);

      wrapper.setData({ isFilled: true });
      (wrapper.vm as any).edit();

      expect(EventBus.$emit).toHaveBeenCalledWith('checkout-before-edit', 'personalDetails');
    });

    it('edit method should not emit event if flag is not set', () => {
      const wrapper = mountMixinWithStore(PersonalDetails, mockStore, mockMountingOptions);

      wrapper.setData({ isFilled: false });
      (wrapper.vm as any).edit();

      expect(EventBus.$emit).not.toHaveBeenCalled();
    });

    it('gotoAccount method should emit event', () => {
      const wrapper = mountMixinWithStore(PersonalDetails, mockStore, mockMountingOptions);

      (wrapper.vm as any).gotoAccount();

      expect(EventBus.$emit).toHaveBeenCalledWith('modal-show', 'modal-signup');
    });
  });
});
