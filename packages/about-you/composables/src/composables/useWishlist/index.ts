import { useWishlistFactory, UseWishlistFactoryParams } from '@vue-storefront/core';
import { getWishlist, addItemToWishlist, deleteItemFromWishlist } from '@vue-storefront/about-you-api';
import { BapiProduct, BapiWishlist, BapiWishlistProduct } from '../../types';

const params: UseWishlistFactoryParams<BapiWishlist, BapiProduct, BapiWishlistProduct> = {
  loadWishlist: async ({ currentWishlist }) => {
    return await getWishlist(currentWishlist.key || null);
  },
  addToWishlist: async ({currentWishlist, product }) => {
    const addItemToWishlistResponse = await addItemToWishlist(currentWishlist.key, { masterKey: product.masterKey });
    if (addItemToWishlistResponse.type === 'success') {
      return Promise.resolve(addItemToWishlistResponse.wishlist);
    }
    return Promise.reject();
  },
  removeFromWishlist: async ({currentWishlist, wishlistItem }) => {
    return await deleteItemFromWishlist(currentWishlist.key, wishlistItem.key);
  },
  clearWishlist: async () => {}
};

const { useWishlist, setWishlist } = useWishlistFactory<BapiWishlist, BapiProduct, BapiWishlistProduct>(params);

export default {useWishlist, setWishlist};
