/* istanbul ignore file */
import { useWishlistFactory, UseWishlistFactoryParams } from '../../factories/';
import { BapiProduct, BapiWishlist, BapiWishlistProduct } from '../../types';
import { getWishlist, addItemToWishlist, deleteItemFromWishlist } from '@vue-storefront/about-you-api';

const params: UseWishlistFactoryParams<BapiWishlist, BapiWishlistProduct, BapiProduct> = {
  loadWishlist: async ({ currentWishlist }) => {
    return await getWishlist(currentWishlist.key);
  },
  addToWishlist: async ({currentWishlist, product }) => {
    const addItemToWishlistResponse = await addItemToWishlist(currentWishlist.key, { masterKey: product.masterKey });
    if (addItemToWishlistResponse.type === 'success') {
      return Promise.resolve(addItemToWishlistResponse.wishlist);
    }
    return Promise.reject();
  },
  removeFromWishlist: async ({currentWishlist, item }) => {
    console.log(item);
    return await deleteItemFromWishlist(currentWishlist.key, item.key);
  },
  clearWishlist: async () => {}
};

const { useWishlist, setWishlist } = useWishlistFactory<BapiWishlist, BapiWishlistProduct, BapiProduct>(params);

export default {useWishlist, setWishlist};
