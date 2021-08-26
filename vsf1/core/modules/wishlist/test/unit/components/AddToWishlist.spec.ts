import { mountMixin, mountMixinWithStore } from '@vue-storefront/unit-tests/utils';
import { registerModule } from '@vue-storefront/core/lib/modules';
import { WishlistModule } from '@vue-storefront/core/modules/wishlist';
import { AddToWishlist } from '@vue-storefront/core/modules/wishlist/components/AddToWishlist';

jest.mock('@vue-storefront/core/lib/storage-manager', () => ({}));
jest.mock('@vue-storefront/core/lib/modules', () => ({ registerModule: jest.fn() }));
jest.mock('@vue-storefront/core/helpers', () => ({ once: () => ({}) }));
jest.mock('@vue-storefront/core/modules/wishlist/store', () => ({}));
jest.mock('@vue-storefront/core/modules/wishlist/store/whishListPersistPlugin', () => ({}));
jest.mock('@vue-storefront/core/modules/wishlist/mixins/wishlistMountedMixin', () => ({}));

describe('AddToWishlist', () => {
  let product;

  beforeEach(() => {
    jest.clearAllMocks();
    product = {
      sku: 'example_sku',
      image: 'example_image'
    };
  });

  it('creates a component', () => {
    const wrapper = mountMixin(AddToWishlist, {
      propsData: { product }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('component has been registered in "created" hook', () => {
    mountMixin(AddToWishlist, {
      propsData: { product }
    });

    expect(registerModule).toHaveBeenCalledWith(WishlistModule);
  });

  it('addToWishList method dispatches wishlist/addItem action', () => {
    const mockStore = {
      modules: {
        wishlist: {
          actions: {
            addItem: jest.fn()
          },
          namespaced: true
        }
      }
    };

    const wrapper = mountMixinWithStore(AddToWishlist, mockStore, {
      propsData: { product }
    });

    (wrapper.vm as any).addToWishlist(product);

    expect(mockStore.modules.wishlist.actions.addItem).toHaveBeenCalledWith(expect.anything(), product);
  });
});
