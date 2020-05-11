/* istanbul ignore file */
import { UseWishlist } from '../../types';
import { useWishlistFactory, UseWishlistFactoryParams } from '../../factories/';
import { Ref, ref } from '@vue/composition-api';
import { BapiProduct, BapiWishlist, BapiWishlistProduct } from '../../types';

// This state will be shared between all 'useCart` instances.
const wishlist: Ref<BapiWishlist> = ref<BapiWishlist>(null);

const params: UseWishlistFactoryParams<BapiWishlist, BapiProduct> = {
  wishlist,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loadWishlist: async () => ({}),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addToWishlist: async ({product, quantity}) => ({}),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeFromWishlist: async ({product}) => ({}),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clearWishlist: async () => {}
};

const useWishlist: () => UseWishlist<BapiWishlist, BapiProduct, BapiWishlistProduct> = useWishlistFactory<BapiWishlist, BapiProduct, BapiWishlistProduct>(params);

export default useWishlist;
