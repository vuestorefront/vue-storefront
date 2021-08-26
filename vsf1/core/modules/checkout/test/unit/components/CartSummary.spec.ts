import { mountMixin, mountMixinWithStore } from '@vue-storefront/unit-tests/utils';
import { CartSummary } from '../../../components/CartSummary';

jest.mock('@vue-storefront/core/compatibility/components/blocks/Microcart/Microcart');

describe('CartSummary', () => {
  it('can be initialized', () => {
    const wrapper = mountMixin(CartSummary);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('exposes computed properties', () => {
    const mockStore = {
      modules: {
        cart: {
          getters: {
            getTotals: jest.fn(() => 1),
            isVirtualCart: jest.fn(() => true)
          },
          namespaced: true
        }
      }
    };

    const wrapper = mountMixinWithStore(CartSummary, mockStore);

    expect((wrapper.vm as any).totals).toBeDefined();
    expect((wrapper.vm as any).isVirtualCart).toBeDefined();
  });
});
