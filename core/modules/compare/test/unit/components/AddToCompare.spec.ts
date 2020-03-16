import { mountMixinWithStore } from '@vue-storefront/unit-tests/utils';
import { AddToCompare } from '../../../components/AddToCompare'
import { registerModule } from '@vue-storefront/core/lib/modules';
import { CompareModule } from '@vue-storefront/core/modules/compare';

jest.mock('@vue-storefront/core/helpers', () => ({
  once: jest.fn()
}));
jest.mock('@vue-storefront/core/modules/compare/mixins/compareMountedMixin', () => ({}))
jest.mock('@vue-storefront/core/lib/modules', () => ({
  registerModule: jest.fn()
}))
jest.mock('@vue-storefront/core/modules/compare', () => ({}))

describe('AddToCompare', () => {
  it('addToCompare dispatches addItem action', () => {
    const product = {};

    const storeMock = {
      modules: {
        compare: {
          actions: {
            addItem: jest.fn(() => [])
          },
          namespaced: true
        }
      }
    };

    const wrapper = mountMixinWithStore(AddToCompare, storeMock);

    (wrapper.vm as any).addToCompare(product);

    expect(storeMock.modules.compare.actions.addItem).toBeCalledWith(expect.anything(), product);
  })

  it('compare module has been registered on created', () => {
    mountMixinWithStore(AddToCompare);

    expect(registerModule).toBeCalledWith(CompareModule);
  })
});
