import { mountMixinWithStore } from '@vue-storefront/unit-tests/utils';

import AppliedCoupon from '../../../types/AppliedCoupon'
import CartTotalSegments from '../../../types/CartTotalSegments'
import Product from '@vue-storefront/core/modules/catalog/types/Product';

import { Microcart } from '../../../components/Microcart'

describe('Microcart', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('productsInCart returns products in cart', () => {
    const storeMock = {
      modules: {
        cart: {
          state: {
            cartItems: [{} as any as Product]
          },
          namespaced: true
        }
      }
    };

    const wrapper = mountMixinWithStore(Microcart, storeMock);

    expect((wrapper.vm as any).productsInCart).toBe(storeMock.modules.cart.state.cartItems);
  });

  it('appliedCoupon returns currently set coupon', () => {
    const storeMock = {
      modules: {
        cart: {
          getters: {
            getCoupon: () => ({} as any as AppliedCoupon)
          },
          namespaced: true
        }
      }
    };

    const wrapper = mountMixinWithStore(Microcart, storeMock);

    expect((wrapper.vm as any).appliedCoupon).toEqual(storeMock.modules.cart.getters.getCoupon());
  });

  it('totals returns cart totals', () => {
    const storeMock = {
      modules: {
        cart: {
          getters: {
            getTotals: () => ({} as any as CartTotalSegments)
          },
          namespaced: true
        }
      }
    };

    const wrapper = mountMixinWithStore(Microcart, storeMock);

    expect((wrapper.vm as any).totals).toEqual(storeMock.modules.cart.getters.getTotals());
  });

  it('isOpen returns cart state if it is open', () => {
    const storeMock = {
      modules: {
        cart: {
          state: {
            isMicrocartOpen: true
          },
          namespaced: true
        }
      }
    };

    const wrapper = mountMixinWithStore(Microcart, storeMock);

    expect((wrapper.vm as any).isOpen).toBe(storeMock.modules.cart.state.isMicrocartOpen);
  });

  it('applyCoupon dispatches applyCupon action to save it', () => {
    const couponCode = 'foo';
    const storeMock = {
      modules: {
        cart: {
          actions: {
            applyCoupon: jest.fn()
          },
          namespaced: true
        }
      }
    };

    const wrapper = mountMixinWithStore(Microcart, storeMock);

    (wrapper.vm as any).applyCoupon(couponCode);

    expect(storeMock.modules.cart.actions.applyCoupon).toBeCalledWith(expect.anything(), 'foo');
  });

  it('removeCoupon dispatches removeCoupon action to delete it', () => {
    const storeMock = {
      modules: {
        cart: {
          actions: {
            removeCoupon: jest.fn()
          },
          namespaced: true
        }
      }
    };

    const wrapper = mountMixinWithStore(Microcart, storeMock);

    (wrapper.vm as any).removeCoupon();

    expect(storeMock.modules.cart.actions.removeCoupon).toBeCalled();
  });

  it('toggleMicrocart dispatches toggleMicrocart to change its state', () => {
    const storeMock = {
      modules: {
        ui: {
          actions: {
            toggleMicrocart: jest.fn()
          },
          namespaced: true
        }
      }
    };

    const wrapper = mountMixinWithStore(Microcart, storeMock);

    (wrapper.vm as any).toggleMicrocart();

    expect(storeMock.modules.ui.actions.toggleMicrocart).toBeCalled();
  });
});
