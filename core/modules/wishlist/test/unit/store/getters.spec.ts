import wishlistGetters from '@vue-storefront/core/modules/wishlist/store/getters';

describe('Wishlist getters', () => {
  it('should inform if given product is on wishlist', () => {
    const mockState = {
      items: [
        { sku: 1 }, { sku: 2 }, { sku: 3 }
      ]
    };

    const productExists = (wishlistGetters as any).isOnWishlist(mockState)({ sku: 1 });
    const productDoesNotExist = (wishlistGetters as any).isOnWishlist(mockState)({ sku: 123 });

    expect(productExists).toBe(true);
    expect(productDoesNotExist).toBe(false);
  });

  it('should inform if wishlist is loaded', () => {
    const wishlistIsLoaded = (wishlistGetters as any).isWishlistLoaded({ loaded: true });
    const wishlistIsNotLoaded = (wishlistGetters as any).isWishlistLoaded({ loaded: false });

    expect(wishlistIsLoaded).toBe(true);
    expect(wishlistIsNotLoaded).toBe(false);
  });

  it('should return number of products in wishlist', () => {
    const mockState = {
      items: [
        { sku: 1 }, { sku: 2 }, { sku: 3 }
      ]
    };

    const numberOfProducts = (wishlistGetters as any).getWishlistItemsCount(mockState);

    expect(numberOfProducts).toBe(mockState.items.length);
  });
});
