import { mountMixinWithStore } from '@vue-storefront/unit-tests/utils';
import { Compare } from '../../../components/Compare'
import config from 'config'

jest.mock('@vue-storefront/core/helpers', () => ({
  once: jest.fn()
}));
jest.mock('@vue-storefront/core/modules/compare/mixins/compareMountedMixin', () => ({}))
jest.mock('config', () => ({}));

describe('Compare', () => {
  it('Compare dispatches attribute list action on created', () => {
    const storeMock = {
      modules: {
        attribute: {
          actions: {
            list: jest.fn(() => [])
          },
          namespaced: true
        }
      }
    };

    config.entities = {
      attribute: {
        loadByAttributeMetadata: false
      }
    }

    mountMixinWithStore(Compare, storeMock);

    expect(storeMock.modules.attribute.actions.list).toBeCalledWith(expect.anything(), {
      filterValues: [],
      filterField: 'is_user_defined'
    });
  })

  it('removeFromCompare dispatches addItem action', () => {
    const product = {};

    const storeMock = {
      modules: {
        compare: {
          actions: {
            removeItem: jest.fn()
          },
          namespaced: true
        },
        attribute: {
          actions: {
            list: jest.fn(() => [])
          },
          namespaced: true
        }
      }
    };

    const wrapper = mountMixinWithStore(Compare, storeMock);

    (wrapper.vm as any).removeFromCompare(product);

    expect(storeMock.modules.compare.actions.removeItem).toBeCalledWith(expect.anything(), product);
  })
});
