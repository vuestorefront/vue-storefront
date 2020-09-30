import { CartGetters, AgnosticPrice, AgnosticTotals, AgnosticCoupon } from '@vue-storefront/core';
import { Cart, LineItem } from '@vue-storefront/shopify-api/src/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItems = (cart: Cart): LineItem[] => {
  return cart.lineItems;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemName = (product: LineItem): string => (product as any).title;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemImage = (product: LineItem): string => {
  if ((product as any).variant && (product as any).variant.image.src) {
    return (product as any).variant.image.src;
  }
  return '';
};

export const checkSpecialPrice = (product: LineItem): boolean => {
  const defaultVariant = product.variant;
  if (defaultVariant.compareAtPrice !== '0.00') {
    return true;
  }
  return false;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemPrice = (product: LineItem): AgnosticPrice => {
  let productPrice = {
    regular: 0,
    special: 0
  };
  if (product && product.variant) {
    const defaultVariant = product.variant;
    productPrice = {
      regular: parseFloat(defaultVariant.price),
      special: 0
    };
    const hasSpecialPrice = checkSpecialPrice(product);
    if (hasSpecialPrice) productPrice = { regular: parseFloat(defaultVariant.compareAtPrice), special: parseFloat(defaultVariant.price) };
  }

  return productPrice;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemQty = (product: LineItem): number => (product as any).quantity;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemAttributes = (product: LineItem, filterByAttributeName?: Array<string>): any => {
  const selectedOption = {};
  if (product.variant.selectedOptions) {
    const selectedOptions = product.variant.selectedOptions;
    for (let i = 0; i < selectedOptions.length; i++) {
      selectedOption[`${selectedOptions[i].name}`] = `${selectedOptions[i].value}`;
    }
  }
  return selectedOption;
};

export const hasItemAttributes = (product: LineItem) => {
  if (product && product.variant && product.variant.selectedOptions) {
    return true;
  }
  return false;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemSku = (product: LineItem): string => (product as any).sku;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartTotals = (cart: Cart): AgnosticTotals => {
  return {
    total: Number(cart.totalPrice),
    subtotal: Number(cart.subtotalPrice)
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartShippingPrice = (cart: Cart): number => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartTotalItems = (cart: Cart): number => {
  if (cart && cart.lineItems) {
    return cart.lineItems.length;
  }
  return 0;
};

export const getFormattedPrice = (price: number): string => price ? `$ ${price}` : '';

export const getCartCheckoutUrl = (cart: Cart): string => {
  if (cart) {
    return cart.webUrl;
  }
  return '#';
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCoupons = (cart: Cart): AgnosticCoupon[] => [];

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
  getFormattedPrice: getFormattedPrice,
  getTotalItems: getCartTotalItems,
  getCheckoutUrl: getCartCheckoutUrl,
  hasItemAttributes: hasItemAttributes,
  getCoupons
  // getItemAttributes: getCartItemAttributes
};

export default cartGetters;
