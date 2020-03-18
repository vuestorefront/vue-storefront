import { mountMixin, mountMixinWithStore } from '@vue-storefront/unit-tests/utils';
import { registerModule } from '@vue-storefront/core/lib/modules';
import { WishlistModule } from '@vue-storefront/core/modules/wishlist';
import { RemoveFromWishlist } from '@vue-storefront/core/modules/wishlist/components/RemoveFromWishlist';

jest.mock('@vue-storefront/core/lib/storage-manager', () => ({}));
jest.mock('@vue-storefront/core/lib/modules', () => ({ registerModule: jest.fn() }));
jest.mock('@vue-storefront/core/helpers', () => ({ once: () => ({}) }));
jest.mock('@vue-storefront/core/modules/wishlist/store', () => ({}));
jest.mock('@vue-storefront/core/modules/wishlist/store/whishListPersistPlugin', () => ({}));
jest.mock('@vue-storefront/core/modules/wishlist/mixins/wishlistMountedMixin', () => ({}));

describe('RemoveFromWishlist', () => {
  let product;

  beforeEach(() => {
    jest.clearAllMocks();
    product = {
      sku: 'example_sku',
      image: 'example_image'
    };
  });

  it('creates a component', () => {
    const wrapper = mountMixin(RemoveFromWishlist, {
      propsData: { product }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('removeFromWishlist method registers component and dispatches wishlist/removeItem action', () => {
    const mockStore = {
      modules: {
        wishlist: {
          actions: {
            removeItem: jest.fn()
          },
          namespaced: true
        }
      }
    };

    const wrapper = mountMixinWithStore(RemoveFromWishlist, mockStore, {
      propsData: { product }
    });

    (wrapper.vm as any).removeFromWishlist(product);

    expect(registerModule).toHaveBeenCalledWith(WishlistModule);
    expect(mockStore.modules.wishlist.actions.removeItem).toHaveBeenCalledWith(expect.anything(), product);
  });
});
