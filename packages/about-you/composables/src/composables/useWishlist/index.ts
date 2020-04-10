/* istanbul ignore file */

import { ComputedProperty, UseWishlist } from '@vue-storefront/interfaces';
import { computed, Ref, ref } from '@vue/composition-api';
import { BapiProduct, BapiWishlist, BapiWishlistProduct } from '../../types';

// ishlist-specific typings.
// Those inetrfaces are just recommendations.
// Feel free to update them to match your platform specification.
type AddToWishlist = (product: BapiProduct, quantity: number) => Promise<void>
type RemoveFromWishlist = (product: BapiProduct) => Promise<void>
type IsOnWishlist = (product: BapiProduct) => ComputedProperty<boolean>
type ClearWishlist = () => Promise<void>
type RefreshWishlist = () => Promise<void>

// This state will be shared between all 'useCart` instances.
const wishlist: Ref<BapiWishlist> = ref<BapiWishlist>(null);
const loading: Ref<boolean> = ref<boolean>(true);
const error: Ref<any> = ref<any>(null);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const addToWishlist: AddToWishlist = async (product) => {};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const removeFromWishlist: RemoveFromWishlist = async (product) => {};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isOnWishlist: IsOnWishlist = (product) => computed(() => false);

const clearWishlist: ClearWishlist = async () => {};
const refreshWishlist: RefreshWishlist = async () => {};

// @todo wishlist

const useWishlist: () => UseWishlist<BapiWishlist, BapiProduct, BapiWishlistProduct> = () => ({
  wishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  isOnWishlist,
  refreshWishlist,
  error,
  loading
});

export default useWishlist;
