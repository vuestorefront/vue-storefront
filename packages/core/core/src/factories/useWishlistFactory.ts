
import { ComputedProperty } from '@vue-storefront/core';
import { Ref, ref } from '@vue/composition-api';

export type UseWishlistFactoryParams<WISHLIST, PRODUCT, WISHLIST_PRODUCT> = {
  wishlist: Ref<WISHLIST>;
  getWishlist: () => Promise<WISHLIST>;
  addToWishlist: (params: {product: PRODUCT; quantity: number}) => Promise<WISHLIST_PRODUCT>;
  removeFromWishlist: (params: {product: PRODUCT}) => Promise<void>;
  isOnWishlist: (params: {product: PRODUCT}) => ComputedProperty<boolean>;
  clearWishlist: () => Promise<void>;
  refreshWishlist: () => Promise<void>;
}

export function useWishlistFactory<WISHLIST, PRODUCT, WISHLIST_PRODUCT>(factoryParams: UseWishlistFactoryParams<WISHLIST, PRODUCT, WISHLIST_PRODUCT>) {
  const wishlist: Ref<WISHLIST | null> = ref(null);
  const loading: Ref<boolean> = ref<boolean>(false);
  console.log(factoryParams);
  return {
    wishlist,
    loading
  };
}
