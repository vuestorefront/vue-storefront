import { CartGetters, AgnosticCoupon, AgnosticPrice, AgnosticTotals, AgnosticDiscount } from '@vue-storefront/core';
import { Cart, LineItem } from './../types/GraphQL';
import { getProductAttributes } from './productGetters';
import { createPrice } from './_utils';
import { getCouponsFromCart } from '../helpers/internals';

export const getCartItems = (cart: Cart): LineItem[] => {
  if (!cart) {
    return [];
  }

  return cart.lineItems;
};

export const getCartItemName = (product: LineItem): string => product.name;

export const getCartItemImage = (product: LineItem): string => product.variant.images[0].url;

export const getCartItemPrice = (product: LineItem): AgnosticPrice => createPrice(product);

export const getCartItemQty = (product: LineItem): number => product.quantity;

export const getCartItemAttributes = (product: LineItem, filterByAttributeName?: Array<string>) =>
  getProductAttributes(product.variant, filterByAttributeName);

export const getCartItemSku = (product: LineItem): string => product.variant.sku;

export const getCartTotals = (cart: Cart): AgnosticTotals => {
  if (!cart) {
    return {
      total: 0,
      subtotal: 0,
      special: 0
    };
  }

  const subtotalPrice = cart.totalPrice.centAmount;
  const shipping = cart.shippingInfo ? cart.shippingInfo.price.centAmount : 0;

  return {
    total: (shipping + subtotalPrice) / 100,
    subtotal: subtotalPrice / 100,
    special: 0
  };
};

export const getCartShippingPrice = (cart: Cart): number => cart && cart.shippingInfo ? cart.shippingInfo.price.centAmount / 100 : 0;

export const getCartTotalItems = (cart: Cart): number => {
  if (!cart) {
    return 0;
  }

  return cart.lineItems.reduce((previous, current) => previous + current.quantity, 0);
};

export const getFormattedPrice = (price: number) => price as any as string;

export const getCoupons = (cart: Cart): AgnosticCoupon[] => {
  return getCouponsFromCart(cart);
};

// eslint-disable-next-line
export const getDiscounts = (cart: Cart): AgnosticDiscount[] => {
  return [];
};

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
  getTotalItems: getCartTotalItems,
  getFormattedPrice,
  getCoupons,
  getDiscounts
};

export default cartGetters;
