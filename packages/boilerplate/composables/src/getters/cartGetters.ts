import { CartGetters, AgnosticPrice, AgnosticTotals, AgnosticAttribute } from '@vue-storefront/interfaces';
import { Cart, LineItem } from '@vue-storefront/boilerplate-api/src/types';

export const getCartItems = (cart: Cart): LineItem[] => [];

export const getCartItemName = (product: LineItem): string => '';

export const getCartItemImage = (product: LineItem): string => '';

export const getCartItemPrice = (product: LineItem): AgnosticPrice => {
  return {
    regular: 0,
    special: 0
  };
};

export const getCartItemQty = (product: LineItem): number => 1;

export const getCartItemAttributes = (product: LineItem, filterByAttributeName?: Array<string>) => ({ color: 'red' });

export const getCartItemSku = (product: LineItem): string => '';

export const getCartTotals = (cart: Cart): AgnosticTotals => {
  return {
    total: 1,
    subtotal: 1
  };
};

export const getCartShippingPrice = (cart: Cart): number => 0;

export const getCartTotalItems = (cart: Cart): number => 0;

const cartGetters: CartGetters<Cart, LineItem> = {
  getTotals: getCartTotals,
  getShippingPrice: getCartShippingPrice,
  getItems: getCartItems,
  getItemName: getCartItemName,
  getItemImage: getCartItemImage,
  getItemPrice: getCartItemPrice,
  getItemQty: getCartItemQty,
  getItemAttributes: getCartItemAttributes,
  getItemSku: getCartItemSku,
  getTotalItems: getCartTotalItems
};

export default cartGetters;
