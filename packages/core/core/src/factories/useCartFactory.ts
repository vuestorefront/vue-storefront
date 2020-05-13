import { UseCart } from '../types';
import { Ref, ref, computed } from '@vue/composition-api';
import { useSSR, onSSR } from '../utils';

export type UseCartFactoryParams<CART, CART_ITEM, PRODUCT, COUPON> = {
  loadCart: () => Promise<CART>;
  addToCart: (params: {
    currentCart: CART;
    product: PRODUCT;
    quantity: any;
  }) => Promise<CART>;
  removeFromCart: (params: {
    currentCart: CART;
    product: CART_ITEM;
  }) => Promise<CART>;
  updateQuantity: (params: {
    currentCart: CART;
    product: CART_ITEM;
    quantity: number;
  }) => Promise<CART>;
  clearCart: (prams: { currentCart: CART }) => Promise<CART>;
  applyCoupon: (params: {
    currentCart: CART;
    coupon: string;
  }) => Promise<{ updatedCart: CART; updatedCoupon: COUPON }>;
  removeCoupon: (params: {
    currentCart: CART;
  }) => Promise<{ updatedCart: CART; updatedCoupon: COUPON }>;
  isOnCart: (params: { currentCart: CART; product: PRODUCT }) => boolean;
};

interface UseCartFactory<CART, CART_ITEM, PRODUCT, COUPON> {
  useCart: () => UseCart<CART, CART_ITEM, PRODUCT, COUPON>;
  setCart: (cart: CART) => void;
}

export const useCartFactory = <CART, CART_ITEM, PRODUCT, COUPON>(
  factoryParams: UseCartFactoryParams<CART, CART_ITEM, PRODUCT, COUPON>
): UseCartFactory<CART, CART_ITEM, PRODUCT, COUPON> => {
  const appliedCoupon: Ref<COUPON | null> = ref(null);
  const loading: Ref<boolean> = ref<boolean>(false);
  const cart: Ref<CART> = ref(null);

  const setCart = (newCart: CART) => {
    cart.value = newCart;
  };

  const useCart = (): UseCart<CART, CART_ITEM, PRODUCT, COUPON> => {
    const { initialState, saveToInitialState } = useSSR('vsf-cart');

    cart.value = initialState || null;

    const addToCart = async (product: PRODUCT, quantity: number) => {
      loading.value = true;
      const updatedCart = await factoryParams.addToCart({
        currentCart: cart.value,
        product,
        quantity
      });
      cart.value = updatedCart;
      loading.value = false;
    };

    const removeFromCart = async (product: CART_ITEM) => {
      loading.value = true;
      const updatedCart = await factoryParams.removeFromCart({
        currentCart: cart.value,
        product
      });
      cart.value = updatedCart;
      loading.value = false;
    };

    const updateQuantity = async (product: CART_ITEM, quantity?: number) => {
      if (quantity && quantity > 0) {
        loading.value = true;
        const updatedCart = await factoryParams.updateQuantity({
          currentCart: cart.value,
          product,
          quantity
        });
        cart.value = updatedCart;
        loading.value = false;
      }
    };

    const refreshCart = async () => {
      loading.value = true;
      cart.value = await factoryParams.loadCart();
      saveToInitialState(cart.value);
      loading.value = false;
    };

    const clearCart = async () => {
      loading.value = true;
      const updatedCart = await factoryParams.clearCart({
        currentCart: cart.value
      });
      cart.value = updatedCart;
      loading.value = false;
    };

    const isOnCart = (product: PRODUCT) => {
      return factoryParams.isOnCart({
        currentCart: cart.value,
        product
      });
    };

    const applyCoupon = async (coupon: string) => {
      try {
        loading.value = true;
        const { updatedCart, updatedCoupon } = await factoryParams.applyCoupon({
          currentCart: cart.value,
          coupon
        });
        cart.value = updatedCart;
        appliedCoupon.value = updatedCoupon;
      } finally {
        loading.value = false;
      }
    };

    const removeCoupon = async () => {
      try {
        loading.value = true;
        const { updatedCart, updatedCoupon } = await factoryParams.removeCoupon({
          currentCart: cart.value
        });
        cart.value = updatedCart;
        appliedCoupon.value = updatedCoupon;
        loading.value = false;
      } finally {
        loading.value = false;
      }
    };

    // Temporary enabled by default, related rfc: https://github.com/DivanteLtd/next/pull/330
    onSSR(async () => {
      if (!cart.value) {
        await refreshCart();
      }
    });

    return {
      cart: computed(() => cart.value),
      isOnCart,
      addToCart,
      refreshCart,
      removeFromCart,
      clearCart,
      updateQuantity,
      coupon: computed(() => appliedCoupon.value),
      applyCoupon,
      removeCoupon,
      loading: computed(() => loading.value)
    };
  };

  return { useCart, setCart };
};

/*
export function useCartFactory<CART, CART_ITEM, PRODUCT, COUPON>(
  factoryParams: UseCartFactoryParams<CART, CART_ITEM, PRODUCT, COUPON>
) {
  let isInitialized = false;
  const appliedCoupon: Ref<COUPON | null> = ref(null);
  const loading: Ref<boolean> = ref<boolean>(false);

  return function useCart(): UseCart<CART, CART_ITEM, PRODUCT, COUPON> {
    const { initialState, saveToInitialState } = useSSR('vsf-cart');

    factoryParams.cart.value = isInitialized ? factoryParams.cart.value : initialState || null;
    isInitialized = true;

    const addToCart = async (product: PRODUCT, quantity: number) => {
      loading.value = true;
      const updatedCart = await factoryParams.addToCart({
        currentCart: factoryParams.cart.value,
        product,
        quantity
      });
      factoryParams.cart.value = updatedCart;
      loading.value = false;
    };

    const removeFromCart = async (product: CART_ITEM) => {
      loading.value = true;
      const updatedCart = await factoryParams.removeFromCart({
        currentCart: factoryParams.cart.value,
        product
      });
      factoryParams.cart.value = updatedCart;
      loading.value = false;
    };

    const updateQuantity = async (product: CART_ITEM, quantity?: number) => {
      if (quantity && quantity > 0) {
        loading.value = true;
        const updatedCart = await factoryParams.updateQuantity({
          currentCart: factoryParams.cart.value,
          product,
          quantity
        });
        factoryParams.cart.value = updatedCart;
        loading.value = false;
      }
    };

    const refreshCart = async () => {
      loading.value = true;
      factoryParams.cart.value = await factoryParams.loadCart();
      saveToInitialState(factoryParams.cart.value);
      loading.value = false;
    };

    const clearCart = async () => {
      loading.value = true;
      const updatedCart = await factoryParams.clearCart({
        currentCart: factoryParams.cart.value
      });
      factoryParams.cart.value = updatedCart;
      loading.value = false;
    };

    const isOnCart = (product: PRODUCT) => {
      return factoryParams.isOnCart({
        currentCart: factoryParams.cart.value,
        product
      });
    };

    const applyCoupon = async (coupon: string) => {
      try {
        loading.value = true;
        const { updatedCart, updatedCoupon } = await factoryParams.applyCoupon({
          currentCart: factoryParams.cart.value,
          coupon
        });
        factoryParams.cart.value = updatedCart;
        appliedCoupon.value = updatedCoupon;
      } finally {
        loading.value = false;
      }
    };

    const removeCoupon = async () => {
      try {
        loading.value = true;
        const { updatedCart, updatedCoupon } = await factoryParams.removeCoupon({
          currentCart: factoryParams.cart.value
        });
        factoryParams.cart.value = updatedCart;
        appliedCoupon.value = updatedCoupon;
        loading.value = false;
      } finally {
        loading.value = false;
      }
    };

    // Temporary enabled by default, related rfc: https://github.com/DivanteLtd/next/pull/330
    onSSR(async () => {
      if (!factoryParams.cart.value) {
        await refreshCart();
      }
    });

    return {
      cart: computed(() => factoryParams.cart.value),
      isOnCart,
      addToCart,
      refreshCart,
      removeFromCart,
      clearCart,
      updateQuantity,
      coupon: computed(() => appliedCoupon.value),
      applyCoupon,
      removeCoupon,
      loading: computed(() => loading.value)
    };
  };
}
*/
