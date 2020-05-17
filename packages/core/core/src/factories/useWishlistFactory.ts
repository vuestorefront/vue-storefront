import { UseWishlist } from '../types';
import { Ref, ref, computed } from '@vue/composition-api';
import { useSSR } from '../utils';

export type UseWishlistFactoryParams<WISHLIST, WISHLIST_ITEM, PRODUCT> = {
  loadWishlist: () => Promise<WISHLIST>;
  addToWishlist: (params: {
    currentWishlist: WISHLIST;
    product: PRODUCT;
  }) => Promise<WISHLIST>;
  removeFromWishlist: (params: {
    currentWishlist: WISHLIST;
    product: WISHLIST_ITEM;
  }) => Promise<WISHLIST>;
  clearWishlist: (prams: { currentWishlist: WISHLIST }) => Promise<WISHLIST>;
  isOnWishlist: (params: { currentWishlist: WISHLIST; product: PRODUCT }) => boolean;
};

interface UseWishlistFactory<WISHLIST, WISHLIST_ITEM, PRODUCT> {
  useWishlist: () => UseWishlist<WISHLIST, WISHLIST_ITEM, PRODUCT>;
  setWishlist: (wishlist: WISHLIST) => void;
}

export const useWishlistFactory = <WISHLIST, WISHLIST_ITEM, PRODUCT>(
  factoryParams: UseWishlistFactoryParams<WISHLIST, WISHLIST_ITEM, PRODUCT>
): UseWishlistFactory<WISHLIST, WISHLIST_ITEM, PRODUCT> => {
  const loading: Ref<boolean> = ref<boolean>(false);
  const wishlist: Ref<WISHLIST> = ref(null);
  let isInitialized = false;

  const setWishlist = (newWishlist: WISHLIST) => {
    wishlist.value = newWishlist;
  };

  const useWishlist = (): UseWishlist<WISHLIST, WISHLIST_ITEM, PRODUCT> => {
    const { initialState, saveToInitialState } = useSSR('vsf-wishlist');

    wishlist.value = isInitialized ? wishlist.value : initialState || null;
    isInitialized = true;

    const addToWishlist = async (product: PRODUCT) => {
      loading.value = true;
      const updatedWishlist = await factoryParams.addToWishlist({
        currentWishlist: wishlist.value,
        product
      });
      wishlist.value = updatedWishlist;
      loading.value = false;
    };

    const removeFromWishlist = async (product: WISHLIST_ITEM) => {
      loading.value = true;
      const updatedWishlist = await factoryParams.removeFromWishlist({
        currentWishlist: wishlist.value,
        product
      });
      wishlist.value = updatedWishlist;
      loading.value = false;
    };

    const loadWishlist = async () => {
      if (wishlist.value) return;

      loading.value = true;
      wishlist.value = await factoryParams.loadWishlist();
      saveToInitialState(wishlist.value);
      loading.value = false;
    };

    const clearWishlist = async () => {
      loading.value = true;
      const updatedWishlist = await factoryParams.clearWishlist({
        currentWishlist: wishlist.value
      });
      wishlist.value = updatedWishlist;
      loading.value = false;
    };

    const isOnWishlist = (product: PRODUCT) => {
      return factoryParams.isOnWishlist({
        currentWishlist: wishlist.value,
        product
      });
    };

    return {
      wishlist: computed(() => wishlist.value),
      isOnWishlist,
      addToWishlist,
      loadWishlist,
      removeFromWishlist,
      clearWishlist,
      loading: computed(() => loading.value)
    };
  };

  return { useWishlist, setWishlist };
};

