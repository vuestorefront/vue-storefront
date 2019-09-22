import { mountMixinWithStore } from '@vue-storefront/unit-tests/utils';

import { MicrocartButton } from '../../../components/MicrocartButton'

describe('MicrocartButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('quantity returns total quantity of products in cart', () => {
    const storeMock = {
      modules: {
        cart: {
          getters: {
            getItemsTotalQuantity: () => 123
          },
          namespaced: true
        }
      }
    };

    const wrapper = mountMixinWithStore(MicrocartButton, storeMock);

    expect((wrapper.vm as any).quantity).toEqual(storeMock.modules.cart.getters.getItemsTotalQuantity());
  });

  it('toggleMicrocart dispatches toggleMicrocart to change its state', () => {
    const storeMock = {
      modules: {
        cart: {
          actions: {
            toggleMicrocart: jest.fn()
          },
          namespaced: true
        }
      }
    };

    const wrapper = mountMixinWithStore(MicrocartButton, storeMock);

    (wrapper.vm as any).toggleMicrocart();

    expect(storeMock.modules.cart.actions.toggleMicrocart).toBeCalled();
  });
});
