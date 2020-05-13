import { UseWishlist } from '../types/';
import { Ref, ref, computed } from '@vue/composition-api';

export type UseWishlistFactoryParams<WISHLIST, WISHLIST_ITEM, PRODUCT> = {
  wishlist: Ref<WISHLIST>;
  loadWishlist: () => Promise<WISHLIST>;
  addToWishlist: (params: { product: PRODUCT; quantity: number }) => Promise<WISHLIST>;
  removeFromWishlist: (params: { item: WISHLIST_ITEM }) => Promise<WISHLIST>;
  clearWishlist: () => Promise<void>;
}

export function useWishlistFactory<WISHLIST, WISHLIST_ITEM, PRODUCT>(factoryParams: UseWishlistFactoryParams<WISHLIST, WISHLIST_ITEM, PRODUCT>) {
  const loading: Ref<boolean> = ref<boolean>(false);

  return function useWishlist(): UseWishlist<WISHLIST, WISHLIST_ITEM, PRODUCT> {

    const addToWishlist = async (product) => {
      try {
        loading.value = true;
        factoryParams.wishlist.value = await factoryParams.addToWishlist(product);
      } finally {
        loading.value = false;
      }
    };

    const removeFromWishlist = async (product) => {
      try {
        loading.value = true;
        console.log(product);
        factoryParams.wishlist.value = await factoryParams.removeFromWishlist(product);
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
        factoryParams.wishlist.value = await factoryParams.loadWishlist();
      } finally {
        loading.value = false;
      }
    };

    return {
      wishlist: computed(() => factoryParams.wishlist.value),
      addToWishlist,
      removeFromWishlist,
      refreshWishlist,
      clearWishlist,
      loading: computed(() => loading.value)
    };
  };
}
