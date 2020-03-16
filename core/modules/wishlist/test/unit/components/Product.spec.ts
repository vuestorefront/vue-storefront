import { mountMixin, mountMixinWithStore } from '@vue-storefront/unit-tests/utils';
import { WishlistProduct } from '@vue-storefront/core/modules/wishlist/components/Product';

jest.mock('@vue-storefront/core/modules/wishlist/mixins/wishlistMountedMixin', () => ({}));

describe('Product', () => {
  let product;

  beforeEach(() => {
    jest.clearAllMocks();
    product = {
      sku: 'example_sku',
      image: 'example_image'
    };
  });

  it('creates a component', () => {
    const wrapper = mountMixin(WishlistProduct, {
      propsData: { product }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('thumbnail computed property calls getThumbnail method', () => {
    const getThumbnail = jest.fn(() => 'thumbnail');
    const wrapper = mountMixin(WishlistProduct, {
      propsData: { product },
      methods: { getThumbnail }
    });

    const thumbnail = (wrapper.vm as any).thumbnail;

    expect(getThumbnail).toHaveBeenCalledWith(product.image, 150, 150);
    expect(thumbnail).toBe('thumbnail');
  });

  it('removeFromWishlist method dispatches wishlist/removeItem action', () => {
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

    const wrapper = mountMixinWithStore(WishlistProduct, mockStore, {
      propsData: { product }
    });

    (wrapper.vm as any).removeFromWishlist(product);

    expect(mockStore.modules.wishlist.actions.removeItem).toHaveBeenCalledWith(expect.anything(), product);
  });
});
