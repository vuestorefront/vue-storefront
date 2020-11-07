import { useCartFactory, UseCartFactoryParams } from '@vue-storefront/core';
import { ref, Ref } from '@vue/composition-api';

import { CartType, LineItemType, Product, getCart, addToCart, clearCart, updateCartItemQuantity, removeFromCart } from '@vue-storefront/virtocommerce-api';
export const cart: Ref<CartType> = ref(null);

const getLineItemItemByProduct = ({ currentCart, product }) => {
  return currentCart.items.find((item) => item.productId === product._id);
};


// @todo: implement cart

const params: UseCartFactoryParams<CartType, LineItemType, Product, any> = {
  loadCart: async () => {
    const cart = await getCart();
    return cart;
  },
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addToCart: async ({ currentCart, product, quantity }) => {
     await addToCart(currentCart, product, quantity);
     return  await getCart();  
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeFromCart: async ({ currentCart, product }) => {
    await removeFromCart(currentCart, product);
    return await getCart();  
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateQuantity: async ({ currentCart, product, quantity }) => {
    await updateCartItemQuantity(currentCart, product, quantity);
    return  await getCart();  
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clearCart: async ({ currentCart }) => {
    await clearCart(currentCart);
    return await getCart();    
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  applyCoupon: async ({ currentCart, couponCode }) => {
    console.log('Mocked: applyCoupon');
    return {updatedCart: null, updatedCoupon: null};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeCoupon: async ({ currentCart, coupon }) => {
    console.log('Mocked: removeCoupon');
    return {updatedCart: null};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isOnCart: ({ currentCart, product }) => {
   
    return Boolean(currentCart && getLineItemItemByProduct({ currentCart, product }));
  }
};



const { setCart, useCart } = useCartFactory<CartType, LineItemType, Product, any>(params);

export { setCart, useCart };
