import { useCartFactory, UseCartFactoryParams, Context, AgnosticCoupon } from '@vue-storefront/core';
import { ref, Ref } from '@vue/composition-api';
import { CartType, LineItemType, Product } from '@vue-storefront/virtocommerce-api';


const getLineItemItemByProduct = ({ currentCart, product }) => {
  return currentCart.items.find((item) => item.productId === product._id);
};

// @todo: implement cart
const params: UseCartFactoryParams<CartType, LineItemType, Product, AgnosticCoupon> = { 


  load: async (context: Context,  { customQuery }) => {
    const cart = await context.$vc.api.getCart();
    return cart;
  },  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addItem: async (context: Context, { currentCart, product, quantity, customQuery }) => {
     await context.$vc.api.addToCart(currentCart, product, quantity);
     return  await context.$vc.api.getCart();  
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeItem: async (context: Context, { currentCart, product, customQuery }) => {
    await context.$vc.api.removeFromCart(currentCart, product);
    return await context.$vc.api.getCart();  
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateItemQty: async (context: Context, { currentCart, product, quantity, customQuery }) => {
    await context.$vc.api.updateCartItemQuantity(currentCart, product, quantity);
    return  await context.$vc.api.getCart();  
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clear: async (context: Context, { currentCart }) => {
    await context.$vc.api.clearCart(currentCart);
    return await context.$vc.api.getCart();    
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  applyCoupon: async (context: Context, { currentCart, couponCode, customQuery }) => {
    console.log('Mocked: applyCoupon');
    return {updatedCart: null, updatedCoupon: null};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeCoupon: async (context: Context, { currentCart, coupon, customQuery }) => {
    console.log('Mocked: removeCoupon');
    return {updatedCart: null};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isOnCart: (context: Context, { currentCart, product }) => {
   
    return Boolean(currentCart && getLineItemItemByProduct({ currentCart, product }));
  }
};

export default useCartFactory<CartType, LineItemType, Product, AgnosticCoupon>(params);