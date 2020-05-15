import { UseWishlist } from '../types';
import { Ref, ref, computed } from '@vue/composition-api';

export type UseWishlistFactoryParams<WISHLIST, PRODUCT, WISHLIST_ITEM> = {
  loadWishlist: (params: { currentWishlist: WISHLIST }) => Promise<WISHLIST>;
  addToWishlist: (params: {
    currentWishlist: WISHLIST;
    product: PRODUCT;
  }) => Promise<WISHLIST>;
  removeFromWishlist: (params: {
    currentWishlist: WISHLIST;
    wishlistItem: WISHLIST_ITEM;
  }) => Promise<WISHLIST>;
  clearWishlist: () => Promise<void>;
};

interface UseWishlistFactory<WISHLIST, PRODUCT, WISHLIST_ITEM> {
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
    const addToWishlist = async (product: PRODUCT) => {
      try {
        loading.value = true;
        wishlist.value = await factoryParams.addToWishlist({
          currentWishlist: wishlist.value,
          product
        });
      } finally {
        loading.value = false;
      }
    };

    const removeFromWishlist = async (wishlistItem: WISHLIST_ITEM) => {
      try {
        loading.value = true;
        wishlist.value = await factoryParams.removeFromWishlist({
          currentWishlist: wishlist.value,
          wishlistItem
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

    const loadWishlist = async () => {
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
      loadWishlist,
      clearWishlist,
      loading: computed(() => loading.value)
    };
  };

  return {
    useWishlist,
    setWishlist
  };
};
