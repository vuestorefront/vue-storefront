
import { UseWishlist } from '@vue-storefront/core';
import { Ref, ref, computed } from '@vue/composition-api';

export type UseWishlistFactoryParams<WISHLIST, PRODUCT, WISHLIST_PRODUCT> = {
  wishlist: Ref<WISHLIST>;
  getWishlist: () => Promise<WISHLIST>;
  addToWishlist: (params: { product: PRODUCT; quantity: number }) => Promise<WISHLIST_PRODUCT>;
  removeFromWishlist: (params: { product: PRODUCT }) => Promise<void>;
  clearWishlist: () => Promise<void>;
  refreshWishlist: () => Promise<void>;
}

export function useWishlistFactory<WISHLIST, PRODUCT, WISHLIST_PRODUCT>(factoryParams: UseWishlistFactoryParams<WISHLIST, PRODUCT, WISHLIST_PRODUCT>) {
  const loading: Ref<boolean> = ref<boolean>(false);

  return function useWishlist(): UseWishlist<WISHLIST, PRODUCT, WISHLIST_PRODUCT> {

    const getWishList = async () => {
      try {
        loading.value = true;
        return await factoryParams.getWishlist();
      } finally {
        loading.value = false;
      }
    };

    const addToWishlist = async (product) => {
      try {
        loading.value = true;
        await factoryParams.addToWishlist(product);
      } finally {
        loading.value = false;
      }
    };

    const removeFromWishlist = async (product) => {
      try {
        loading.value = true;
        await factoryParams.removeFromWishlist(product);
      } finally {
        loading.value = false;
      }
    };

    const clearWishlist = async () => {
      try {
        loading.value = true;
        await factoryParams.clearWishlist();
      } finally {
        loading.value = false;
      }
    };

    const refreshWishlist = async () => {
      try {
        loading.value = true;
        await factoryParams.refreshWishlist();
      } finally {
        loading.value = false;
      }
    };

    return {
      wishlist: computed(() => factoryParams.wishlist.value),
      getWishList,
      addToWishlist,
      removeFromWishlist,
      clearWishlist,
      refreshWishlist,
      loading: computed(() => loading.value)
    };
  };
}
