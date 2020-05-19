import { useWishlist } from '../../../src/composables/useWishlist';
import { useWishlistFactory } from '@vue-storefront/core';
import { params } from '../../../src/composables/useWishlist/factoryParams';

jest.mock('@vue-storefront/core', () => ({
  useWishlistFactory: jest.fn(() => ({useWishlist: () => ({ id: 'wishlist-id' }), setWishlist: jest.fn()}))
}));

jest.mock('../../../src/composables/useWishlist/factoryParams', () => ({
  params: {}
}));

describe('[about-you-composables] useWishlist', () => {
  it('returns useUserFactory functions', () => {
    expect(useWishlistFactory).toHaveBeenCalledWith(params);
    expect(useWishlist()).toEqual({id: 'wishlist-id'});
  });
});
