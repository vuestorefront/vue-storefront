import {
  getCart,
  addItemToCart,
  deleteItemFromCart,
  updateItemInCart
} from '@vue-storefront/about-you-api';

import { UseCartFactoryParams} from '@vue-storefront/core';

import { ref, Ref } from '@vue/composition-api';
import { BasketResponseData } from '@aboutyou/backbone';
import { BasketItem } from '@aboutyou/backbone/endpoints/basket/getBasket';
import { BapiProduct } from '../../types';

export const cart: Ref<BasketResponseData> = ref(null);

export const params: UseCartFactoryParams<BasketResponseData, BasketItem, BapiProduct, any> = {
  cart,
  loadCart: async () => {
    const basketRespone = await getCart(null, {
      with: {
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
      }
    });

    return basketRespone.basket;
  },
  addToCart: async ({ product, quantity }) => {
    const updatedCart = await addItemToCart(null, product.variants[0].id, quantity);
    return updatedCart.basket;
  },
  removeFromCart: async ({ product }) => {
    return deleteItemFromCart(null, product.key);
  },
  updateQuantity: async ({ product, quantity }) => {
    const updatedCart = await updateItemInCart(null, product.key, quantity);
    return updatedCart.basket;
  },
  clearCart: async ({ currentCart }) => {
    return (await Promise.all(currentCart.items.map(product => deleteItemFromCart(null, product.key)))).pop();
  },
  applyCoupon: async () => {
    throw new Error('This feature is not available in AYC');
  },
  removeCoupon: async () => {
    throw new Error('This feature is not available in AYC');
  },
  isOnCart: ({ currentCart }) => {
    console.log('Mocked isOnCart', currentCart);
    return true;
  }
};
