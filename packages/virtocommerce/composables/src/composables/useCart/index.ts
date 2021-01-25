import { useCartFactory, UseCartFactoryParams, Context } from '@vue-storefront/core';
import { ref, Ref } from '@vue/composition-api';

import { CartType, LineItemType, Product } from '@vue-storefront/virtocommerce-api';
export const cart: Ref<CartType> = ref(null);

const getLineItemItemByProduct = ({ currentCart, product }) => {
  return currentCart.items.find((item) => item.productId === product._id);
};


// @todo: implement cart

const params: UseCartFactoryParams<CartType, LineItemType, Product, any> = {
  loadCart: async (context: Context) => {
    console.log("getCart");
    const cart = await context.$vc.api.getCart(context);
    return cart;
  },
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addToCart: async (context: Context, { currentCart, product, quantity }) => {
     await context.$vc.api.addToCart(context, currentCart, product, quantity);
     return  await context.$vc.api.getCart(context);  
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeFromCart: async (context: Context, { currentCart, product }) => {
    await context.$vc.api.removeFromCart(context, currentCart, product);
    return await context.$vc.api.getCart(context);  
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateQuantity: async (context: Context, { currentCart, product, quantity }) => {
    await context.$vc.api.updateCartItemQuantity(context, currentCart, product, quantity);
    return  await context.$vc.api.getCart(context);  
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clearCart: async (context: Context, { currentCart }) => {
    await context.$vc.api.clearCart(context, currentCart);
    return await context.$vc.api.getCart(context);    
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  applyCoupon: async (context: Context, { currentCart, couponCode }) => {
    console.log('Mocked: applyCoupon');
    return {updatedCart: null, updatedCoupon: null};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeCoupon: async (context: Context, { currentCart, coupon }) => {
    console.log('Mocked: removeCoupon');
    return {updatedCart: null};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isOnCart: (context: Context, { currentCart, product }) => {
   
    return Boolean(currentCart && getLineItemItemByProduct({ currentCart, product }));
  }
};



const { useCart } = useCartFactory<CartType, LineItemType, Product, any>(params);

export { useCart };
