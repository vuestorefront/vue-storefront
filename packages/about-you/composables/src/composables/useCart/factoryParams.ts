import {
  getCart,
  addItemToCart,
  deleteItemFromCart,
  updateItemInCart
} from '@vue-storefront/about-you-api';
import { UseCartFactoryParams} from '@vue-storefront/core';
import { BasketResponseData, BapiProduct, BasketItem, BasketWith } from '../../types';

const cartParams: BasketWith = {
  items: {
    product: {
      attributes: 'all',
      advancedAttributes: 'all',
      variants: 'all',
      images: 'all',
      siblings: 'all',
      categories: 'all',
      priceRange: true
    },
    variant: {
      attributes: 'all',
      advancedAttributes: 'all',
      stock: 'all'
    }
  }
};

const getBasketItemByProduct = ({ currentCart, product }) => {
  return currentCart.items.find(item => item.product.id === product.id);
};
const removeFromCart = async ({ product }) => {
  return deleteItemFromCart(null, product.key, { with: cartParams });
};
const updateQuantity = async ({ product, quantity }) => {
  const updatedCart = await updateItemInCart(null, product.key, quantity, { with: cartParams });
  return updatedCart.basket;
};
export const params: UseCartFactoryParams<BasketResponseData, BasketItem, BapiProduct, any> = {
  loadCart: async () => {
    const basketResponse = await getCart(null, { with: cartParams });

    return basketResponse.basket;
  },
  addToCart: async ({ currentCart, product, quantity = 1 }) => {
    const basketItem = getBasketItemByProduct({ currentCart, product });
    if (basketItem) {
      return updateQuantity({product: basketItem, quantity: basketItem.quantity + quantity});
    }

    const updatedCart = await addItemToCart(null, product.variants[0].id, quantity, { with: cartParams });
    return updatedCart.basket;
  },
  removeFromCart,
  updateQuantity,
  clearCart: async ({ currentCart }) => {
    return (await Promise.all(currentCart.items.map(product => deleteItemFromCart(null, product.key)))).pop();
  },
  applyCoupon: async () => {
    throw new Error('This feature is not available in AYC');
  },
  removeCoupon: async () => {
    throw new Error('This feature is not available in AYC');
  },
  isOnCart: ({ currentCart, product }) => {
    return Boolean(getBasketItemByProduct({ currentCart, product }));
  }
};
