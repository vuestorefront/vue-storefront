import { mountMixin, mountMixinWithStore } from '@vue-storefront/unit-tests/utils';
import { registerModule } from '@vue-storefront/core/lib/modules';
import { WishlistModule } from '@vue-storefront/core/modules/wishlist';
import { Wishlist } from '@vue-storefront/core/modules/wishlist/components/Wishlist';

jest.mock('@vue-storefront/core/lib/storage-manager', () => ({}));
jest.mock('@vue-storefront/core/lib/modules', () => ({ registerModule: jest.fn() }));
jest.mock('@vue-storefront/core/helpers', () => ({ once: () => ({}) }));
jest.mock('@vue-storefront/core/modules/wishlist/store', () => ({}));
jest.mock('@vue-storefront/core/modules/wishlist/store/whishListPersistPlugin', () => ({}));
jest.mock('@vue-storefront/core/modules/wishlist/mixins/wishlistMountedMixin', () => ({}));

describe('Wishlist', () => {
  let product;

  beforeEach(() => {
    jest.clearAllMocks();
    product = {
      sku: 'example_sku',
      image: 'example_image'
    };
  });

  it('creates a component', () => {
    const wrapper = mountMixin(Wishlist, {
      propsData: { product }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('component has been registered in "created" hook', () => {
    mountMixin(Wishlist, {
      propsData: { product }
    });

    expect(registerModule).toHaveBeenCalledWith(WishlistModule);
  });

  it('isWishlistOpen computed property returns ui/wishlist state', () => {
    const mockStore = {
      modules: {
        ui: {
          state: {
            wishlist: true
          },
          namespaced: true
        }
      }
    };

    const wrapper = mountMixinWithStore(Wishlist, mockStore, {
      propsData: { product }
    });

    const result = (wrapper.vm as any).isWishlistOpen;

    expect(result).toBe(true);
  });

  it('productsInWishlist computed property returns wishlist/items state', () => {
    const wishlistItems = [{ sku: 1 }, { sku: 2 }, { sku: 3 }];
    const mockStore = {
      modules: {
        wishlist: {
          state: {
            items: wishlistItems
          },
          namespaced: true
        }
      }
    };

    const wrapper = mountMixinWithStore(Wishlist, mockStore, {
      propsData: { product }
    });

    const result = (wrapper.vm as any).productsInWishlist;

    expect(result).toBe(wishlistItems);
  });

  it('closeWishlist method dispatches ui/toggleWishlist action', () => {
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

    const wrapper = mountMixinWithStore(Wishlist, mockStore, {
      propsData: { product }
    });

    (wrapper.vm as any).closeWishlist();

    expect(mockStore.modules.ui.actions.toggleWishlist).toHaveBeenCalled();
  });
});
