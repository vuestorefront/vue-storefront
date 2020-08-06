import { CartGetters, AgnosticTotals } from '@vue-storefront/core';
import { Cart, LineItem } from './../types/GraphQL';

export const getCartItems = (cart: Cart): LineItem[] => {
  if (!cart) {
    return [];
  }

  return cart.lineItems;
};

export const getCartItemName = (product: LineItem): string => product.name;

export const getCartItemImage = (product: LineItem): string => product.variant.images[0].url;

export const getCartItemQty = (product: LineItem): number => product.quantity;

export const getCartItemSku = (product: LineItem): string => product.variant.sku;

export const getCartTotals = (cart: Cart): AgnosticTotals => {
  if (!cart) {
    return {
      total: 0,
      subtotal: 0
    };
  }

  const subtotalPrice = cart.totalPrice.centAmount;

  return {
    total: subtotalPrice / 100,
    subtotal: subtotalPrice / 100
  };
};

export const getCartTotalItems = (cart: Cart): number => {
  if (!cart || cart.lineItems.length === 0) {
    return 0;
  }

  return cart.lineItems.reduce((previous, current) => previous + current.quantity, 0);
};

const cartGetters: CartGetters<Cart, LineItem> = {
  getTotals: getCartTotals,
  getShippingPrice: null,
  getItems: getCartItems,
  getItemName: getCartItemName,
  getItemImage: getCartItemImage,
  getItemPrice: null,
  getItemQty: getCartItemQty,
  getItemAttributes: null,
  getItemSku: getCartItemSku,
  getTotalItems: getCartTotalItems,
  getFormattedPrice: null
};

export default cartGetters;
