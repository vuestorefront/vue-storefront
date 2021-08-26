import { mountMixin, mountMixinWithStore } from '@vue-storefront/unit-tests/utils';
import { WishlistButton } from '@vue-storefront/core/modules/wishlist/components/WishlistButton';

jest.mock('@vue-storefront/core/modules/wishlist/mixins/wishlistMountedMixin', () => ({}));

describe('WishlistButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates a component', () => {
    const wrapper = mountMixin(WishlistButton);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('getWishlistItemsCount computed property calls wishlist/getWishlistItemsCount getter', () => {
    const getWishlistItemsCountGetter = jest.fn(() => 42);
    const mockStore = {
      modules: {
        wishlist: {
          getters: {
            getWishlistItemsCount: getWishlistItemsCountGetter
          },
          namespaced: true
        }
      }
    };

    const wrapper = mountMixinWithStore(WishlistButton, mockStore);

    const getWishlistItemsCount = (wrapper.vm as any).getWishlistItemsCount;

    expect(getWishlistItemsCountGetter).toHaveBeenCalled();
    expect(getWishlistItemsCount).toBe(42);
  });

  it('toggleWishlist method dispatches ui/toggleWishlist action', () => {
    const mockStore = {
      modules: {
        ui: {
          actions: {
            toggleWishlist: jest.fn()
          },
          namespaced: true
        }
      }
    };

    const wrapper = mountMixinWithStore(WishlistButton, mockStore);

    (wrapper.vm as any).toggleWishlist();

    expect(mockStore.modules.ui.actions.toggleWishlist).toHaveBeenCalled();
  });
});
