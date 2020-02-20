/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */
import { UseCart } from '@vue-storefront/interfaces';
import { Ref, ref } from '@vue/composition-api';
import { Cart, ProductVariant } from '@vue-storefront/boilerplate-api/src/types';

// Cart-specific typings.
// Those inetrfaces are just recommendations.
// Feel free to update them to match your platform specification.
type AddToCart = (product: ProductVariant, quantity: number) => void
type RemoveFromCart = (product: ProductVariant) => void
type ClearCart = () => void
type Coupon = string
type ApplyCoupon = (coupon: string) => void
type RemoveCoupon = () => void

// This state will be shared between all 'useCart` instances.
const cart: Ref<Cart> = ref(null);
const loading: Ref<boolean> = ref(true);
const error: Ref<any> = ref(null);
const coupon: Ref<Coupon> = ref(null);

const addToCart: AddToCart = (product) => {};
const removeFromCart: RemoveFromCart = (product) => {};
const clearCart: ClearCart = () => {};
const applyCoupon: ApplyCoupon = () => {};
const removeCoupon: RemoveCoupon = () => {};

async function loadCart() {
  // get cart id / user id from useUser or localStorage and load it to `cart` variable
  loading.value = false;
}

export default function useCart(): UseCart<Cart, AddToCart, RemoveFromCart, ClearCart, Ref<Coupon>, ApplyCoupon, RemoveCoupon> {
  return {
    cart,
    addToCart,
    removeCoupon,
    clearCart,
    coupon,
    applyCoupon,
    removeFromCart,
    error,
    loading
  };
}
