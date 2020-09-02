import { CartGetters, AgnosticPrice, AgnosticTotals } from '@vue-storefront/core';
import { Cart, CartItem, Product } from '@vue-storefront/salesforce-cc-poc-api/src/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItems = (cart: Cart): CartItem[] => cart.items;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemName = (product: CartItem | Product): string => product.name || 'Product\'s name';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemImage = (product: CartItem | Product): string => product.image;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemPrice = (product: CartItem): AgnosticPrice => {
  return {
    regular: product?.price?.current
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemQty = (product: CartItem): number => 1;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemAttributes = (product: CartItem, filterByAttributeName?: Array<string>) => (product.attributes);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemSku = (product: CartItem): string => product.id || 'some-sku';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartTotals = (cart: Cart): AgnosticTotals => {
  let total = 0;
  cart.items.map(ci => {
    total += ci.price.current;
  });
  return {
    total: total,
    subtotal: total
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartShippingPrice = (cart: Cart): number => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartTotalItems = (cart: Cart): number => cart.items.length;

export const getFormattedPrice = (price: number) => `${price} USD`;

const cartGetters: CartGetters<Cart, CartItem> = {
  getTotals: getCartTotals,
  getShippingPrice: getCartShippingPrice,
  getItems: getCartItems,
  getItemName: getCartItemName,
  getItemImage: getCartItemImage,
  getItemPrice: getCartItemPrice,
  getItemQty: getCartItemQty,
  getItemAttributes: getCartItemAttributes,
  getItemSku: getCartItemSku,
  getFormattedPrice: getFormattedPrice,
  getTotalItems: getCartTotalItems
};

export default cartGetters;
