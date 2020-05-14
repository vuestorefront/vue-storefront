import { UseWishlist } from '../types';
import { Ref, ref, computed } from '@vue/composition-api';

export type UseWishlistFactoryParams<WISHLIST, WISHLIST_ITEM, PRODUCT> = {
  loadWishlist: (params: { currentWishlist: WISHLIST }) => Promise<WISHLIST>;
  addToWishlist: (params: {
    currentWishlist: WISHLIST;
    product: PRODUCT;
    quantity?: number;
  }) => Promise<WISHLIST>;
  removeFromWishlist: (params: {
    currentWishlist: WISHLIST;
    product: WISHLIST_ITEM;
  }) => Promise<WISHLIST>;
  clearWishlist: () => Promise<void>;
};

interface UseWishlistFactory<WISHLIST, WISHLIST_ITEM, PRODUCT> {
  useWishlist: () => UseWishlist<WISHLIST, PRODUCT, WISHLIST_ITEM>;
  setWishlist: (newWishlist: WISHLIST) => void;
}

export const useWishlistFactory = <WISHLIST, PRODUCT, WISHLIST_ITEM>(
  factoryParams: UseWishlistFactoryParams<WISHLIST, PRODUCT, WISHLIST_ITEM>
): UseWishlistFactory<WISHLIST, PRODUCT, WISHLIST_ITEM> => {
  const loading: Ref<boolean> = ref<boolean>(false);
  const wishlist: Ref<WISHLIST> = ref(null);

  const setWishlist = (newWishlist: WISHLIST) => {
    wishlist.value = newWishlist;
  };

  const useWishlist = (): UseWishlist<WISHLIST, PRODUCT, WISHLIST_ITEM> => {
    const addToWishlist = async (product: PRODUCT, quantity?: number) => {
      try {
        loading.value = true;
        wishlist.value = await factoryParams.addToWishlist({
          currentWishlist: wishlist.value,
          product,
          quantity
        });
      } finally {
        loading.value = false;
      }
    };

    const removeFromWishlist = async (product: WISHLIST_ITEM) => {
      try {
        loading.value = true;
        wishlist.value = await factoryParams.removeFromWishlist({
          currentWishlist: wishlist.value,
          product
        });
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
        wishlist.value = await factoryParams.loadWishlist({
          currentWishlist: wishlist.value
        });
      } finally {
        loading.value = false;
      }
    };

    return {
      wishlist: computed(() => wishlist.value),
      addToWishlist,
      removeFromWishlist,
      refreshWishlist,
      clearWishlist,
      loading: computed(() => loading.value)
    };
  };

  return {
    useWishlist,
    setWishlist
  };
};
