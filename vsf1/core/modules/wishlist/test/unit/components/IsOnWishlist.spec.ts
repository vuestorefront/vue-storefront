import { mountMixin, mountMixinWithStore } from '@vue-storefront/unit-tests/utils';
import { registerModule } from '@vue-storefront/core/lib/modules';
import { WishlistModule } from '@vue-storefront/core/modules/wishlist';
import { IsOnWishlist } from '@vue-storefront/core/modules/wishlist/components/IsOnWishlist';

jest.mock('@vue-storefront/core/lib/storage-manager', () => ({}));
jest.mock('@vue-storefront/core/lib/modules', () => ({ registerModule: jest.fn() }));
jest.mock('@vue-storefront/core/helpers', () => ({ once: () => ({}) }));
jest.mock('@vue-storefront/core/modules/wishlist/store', () => ({}));
jest.mock('@vue-storefront/core/modules/wishlist/store/whishListPersistPlugin', () => ({}));
jest.mock('@vue-storefront/core/modules/wishlist/mixins/wishlistMountedMixin', () => ({}));

describe('IsOnWishlist', () => {
  let product;

  beforeEach(() => {
    jest.clearAllMocks();
    product = {
      sku: 'example_sku',
      image: 'example_image'
    };
  });

  it('creates a component', () => {
    const wrapper = mountMixin(IsOnWishlist, {
      propsData: { product }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('component has been registered in "created" hook', () => {
    mountMixin(IsOnWishlist, {
      propsData: { product }
    });

    expect(registerModule).toHaveBeenCalledWith(WishlistModule);
  });

  it('isOnWishlist computed property calls wishlist/isOnWishlist getter with product from prop', () => {
    const isOnWishlistGetter = jest.fn(() => true);
    const mockStore = {
      modules: {
        wishlist: {
          getters: {
            isOnWishlist: () => isOnWishlistGetter
          },
          namespaced: true
        }
      }
    };

    const wrapper = mountMixinWithStore(IsOnWishlist, mockStore, {
      propsData: { product }
    });

    const isOnWishlist = (wrapper.vm as any).isOnWishlist;

    expect(isOnWishlistGetter).toHaveBeenCalledWith(product);
    expect(isOnWishlist).toBe(true);
  });
});
