/* istanbul ignore file */

import { UseWishlist, useWishlistFactory, UseWishlistFactoryParams } from '@vue-storefront/core';
import { computed, Ref, ref } from '@vue/composition-api';
import { BapiProduct, BapiWishlist, BapiWishlistProduct } from '../../types';

// ishlist-specific typings.
// Those inetrfaces are just recommendations.
// Feel free to update them to match your platform specification.
// type AddToWishlist = (product: BapiProduct, quantity: number) => Promise<void>
// type RemoveFromWishlist = (product: BapiProduct) => Promise<void>
// type IsOnWishlist = (product: BapiProduct) => ComputedProperty<boolean>
// type ClearWishlist = () => Promise<void>
// type RefreshWishlist = () => Promise<void>

// const useWishlist: () => UseWishlist<BapiWishlist, BapiProduct, BapiWishlistProduct> = () => ({
//   wishlist,
//   addToWishlist,
//   removeFromWishlist,
//   clearWishlist,
//   isOnWishlist,
//   refreshWishlist,
//   error,
//   loading
// });

// This state will be shared between all 'useCart` instances.
const wishlist: Ref<BapiWishlist> = ref<BapiWishlist>(null);

const params: UseWishlistFactoryParams<BapiWishlist, BapiProduct, BapiWishlistProduct> = {
  wishlist,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getWishlist: async (wishlist) => ({}),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addToWishlist: async (product) => ({}),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeFromWishlist: async (product) => ({}),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isOnWishlist: (product) => computed(() => false),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clearWishlist: async () => ({}),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  refreshWishlist: async () => ({})
};

const useWishlist: () => UseWishlist<BapiWishlist, BapiProduct, BapiWishlistProduct> = useWishlistFactory<BapiWishlist, BapiProduct, BapiWishlistProduct>(params);

export default useWishlist;
