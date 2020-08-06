import { ProductVariant, Cart, LineItem } from './../types/GraphQL';
import { useCartFactory, UseCartFactoryParams} from '@vue-storefront/core';

const getBasketItemByProduct = ({ currentCart, product }) => {
  return currentCart.lineItems.find(item => item.productId === product._id);
};

const params: UseCartFactoryParams<Cart, LineItem, ProductVariant, any> = {
  loadCart: async () => {
    console.info('loadCart: mock - return empty cart');
    return {
      lineItems: [],
      totalPrice: { centAmount: 0 }
    } as Cart;
  },
  addToCart: async ({ currentCart, product, quantity }) => {
    console.info('addToCart: mock - return null');
    return null;
  },
  removeFromCart: async ({ currentCart, product }) => {
    console.info('removeFromCart: mock - return null');
    return null;
  },
  updateQuantity: async ({ currentCart, product, quantity }) => {
    console.info('updateQuantity: mock - return null');
    return null;
  },
  clearCart: async ({ currentCart }) => {
    console.info('clearCart: mock - return current cart');
    return currentCart;
  },
  applyCoupon: async ({ currentCart, coupon }) => {
    console.info('applyCoupon: mock - return null');
    return null;
  },
  removeCoupon: async ({ currentCart, coupon }) => {
    console.info('removeCoupon: mock - return null');
    return null;
  },
  isOnCart: ({ currentCart, product }) => {
    return Boolean(getBasketItemByProduct({ currentCart, product }));
  }
};

const { useCart, setCart } = useCartFactory<Cart, LineItem, ProductVariant, any>(params);

export { useCart, setCart };
