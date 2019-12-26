import { mountMixinWithStore } from '@vue-storefront/unit-tests/utils';
import wishlistMountedMixin from '@vue-storefront/core/modules/wishlist/mixins/wishlistMountedMixin';

describe('wishlistMountedMixin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches wishlist/load action on mount', () => {
    const mockStore = {
      modules: {
        wishlist: {
          actions: {
            load: jest.fn()
          },
          namespaced: true
        }
      }
    };

    mountMixinWithStore(wishlistMountedMixin, mockStore);

    expect(mockStore.modules.wishlist.actions.load).toHaveBeenCalled();
  });
});
