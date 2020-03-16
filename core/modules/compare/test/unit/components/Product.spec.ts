import { mountMixinWithStore } from '@vue-storefront/unit-tests/utils';
import { CompareProduct as Product } from '../../../components/Product'

jest.mock('@vue-storefront/core/helpers', () => ({
  once: jest.fn()
}));
jest.mock('@vue-storefront/core/modules/compare/mixins/compareMountedMixin', () => ({}))

describe('Product', () => {
  it('removeFromCompare dispatches addItem action', () => {
    const product = {};

    const storeMock = {
      modules: {
        compare: {
          actions: {
            removeItem: jest.fn()
          },
          namespaced: true
        }
      }
    };

    const wrapper = mountMixinWithStore(Product, storeMock);

    (wrapper.vm as any).removeFromCompare(product);

    expect(storeMock.modules.compare.actions.removeItem).toBeCalledWith(expect.anything(), product);
  })
});
