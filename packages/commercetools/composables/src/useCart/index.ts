import { UseCart as BaseUseCart } from '@vue-storefront/interfaces';
import {
  addToCart as apiAddToCart,
  removeFromCart as apiRemoveFromCart,
  updateCartQuantity as apiUpdateCartQuantity
} from '@vue-storefront/commercetools-api';
import { Ref, ref, watch, computed } from '@vue/composition-api';
import { ProductVariant, Cart, LineItem } from './../types/GraphQL';
import loadCurrentCart from './currentCart';

export const cart: Ref<Cart> = ref<Cart>(null);
const coupon = ref(null);
const error = ref(null);
const loading: Ref<boolean> = ref<boolean>(false);

// TODO: Think how to incorporate this into core (updateItem?)
interface UseCart extends BaseUseCart<Cart, ProductVariant, LineItem, any> {
  updateQuantity: (product: LineItem, quantity: number) => void;
}

export default function useCart(): UseCart {

  watch(async () => {
    if (!cart.value && !loading.value) {
      loading.value = true;
      cart.value = await loadCurrentCart();
      loading.value = false;
    }
  });

  const addToCart = async (variant: ProductVariant, quantity: number) => {
    loading.value = true;
    const updateResponse = await apiAddToCart(cart.value, variant, quantity);
    cart.value = updateResponse.data.cart;
    loading.value = false;
  };

  const removeFromCart = async (product: LineItem) => {
    loading.value = true;
    const updateResponse = await apiRemoveFromCart(cart.value, product);
    cart.value = updateResponse.data.cart;
    loading.value = false;
  };

  const updateQuantity = async (product: LineItem, quantity: number) => {
    if (quantity > 0) {
      loading.value = true;
      const updateResponse = await apiUpdateCartQuantity(
        cart.value,
        {
          ...product,
          quantity
        }
      );
      cart.value = updateResponse.data.cart;
      loading.value = false;
    }
  };

  const clearCart = () => console.log('useCart:clearCart');
  const applyCoupon = () => console.log('useCart:applyCoupon');
  const removeCoupon = () => console.log('useCart:removeCoupon');

  return {
    cart: computed(() => cart.value),
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
    coupon: computed(() => coupon.value),
    applyCoupon,
    removeCoupon,
    loading: computed(() => loading.value),
    error: computed(() => error.value)
  };
}
