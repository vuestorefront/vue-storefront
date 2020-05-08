/* istanbul ignore file */

import { UseWishlist } from '../../types';
import { useWishlistFactory, UseWishlistFactoryParams } from '../../factories/';
import { Ref, ref } from '@vue/composition-api';
import { BapiProduct, BapiWishlist, BapiWishlistProduct } from '../../types';
import { getWishlist, addItemToWishlist, deleteItemFromWishlist } from '@vue-storefront/about-you-api';

// This state will be shared between all 'useCart` instances.
const wishlist: Ref<BapiWishlist> = ref<BapiWishlist>(null);

const params: UseWishlistFactoryParams<BapiWishlist, BapiWishlistProduct, BapiProduct> = {
  wishlist,
  loadWishlist: async () => {
    return await getWishlist(wishlist.value.key);
  },
  addToWishlist: async ({ product }) => {
    const addItemToWishlistResponse = await addItemToWishlist(wishlist.value.key, { masterKey: product.masterKey });
    if (addItemToWishlistResponse.type === 'success') {
      return Promise.resolve(addItemToWishlistResponse.wishlist);
    }
    return Promise.reject();
  },
  removeFromWishlist: async ({ item }) => {
    return await deleteItemFromWishlist(wishlist.value.key, item.key);
  }
};

const useWishlist: () => UseWishlist<BapiWishlist, BapiWishlistProduct, BapiProduct> = useWishlistFactory<BapiWishlist, BapiWishlistProduct, BapiProduct>(params);

export default useWishlist;
