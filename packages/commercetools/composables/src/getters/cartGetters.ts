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

export const getCartItemName = (product: LineItem): string => product?.name || '';

export const getCartItemImage = (product: LineItem): string => product?.variant?.images[0]?.url || '';

export const getCartItemPrice = (product: LineItem): AgnosticPrice => createPrice(product);

export const getCartItemQty = (product: LineItem): number => product?.quantity || 0;

export const getCartItemAttributes = (product: LineItem, filterByAttributeName?: Array<string>) =>
  getProductAttributes(product.variant, filterByAttributeName);

export const getCartItemSku = (product: LineItem): string => product?.variant?.sku || '';

const getCartSubtotalPrice = (cart: Cart, selectSpecialPrices = false): number => {
  return getCartItems(cart).reduce((total, cartItem) => {
    if (cartItem.lineItemMode === 'GiftLineItem') {
      return total;
    }
    const { special, regular } = getCartItemPrice(cartItem);
    const itemPrice = (selectSpecialPrices && special) || regular;
    return total + itemPrice;
  }, 0);
};

export const getCartTotals = (cart: Cart): AgnosticTotals => {
  if (!cart) {
    return {
      total: 0,
      subtotal: 0,
      special: 0
    };
  }

  return {
    total: cart.totalPrice.centAmount / 100,
    subtotal: getCartSubtotalPrice(cart),
    special: getCartSubtotalPrice(cart, true)
  };
};

export const getCartShippingPrice = (cart: Cart): number => {
  const total = cart?.totalPrice?.centAmount;
  const shippingInfo = cart?.shippingInfo;
  const centAmount = shippingInfo?.shippingMethod?.zoneRates[0].shippingRates[0].freeAbove?.centAmount;

  if (!shippingInfo || !total || (centAmount && total >= centAmount)) {
    return 0;
  }

  return shippingInfo.price.centAmount / 100;
};

export const getCartTotalItems = (cart: Cart): number => {
  if (!cart) {
    return 0;
  }

  return cart.lineItems.reduce((previous, current) => previous + current.quantity, 0);
};

export const getFormattedPrice = (price: number) => price as any as string;

export const getCartCoupons = (cart: Cart): AgnosticCoupon[] => {
  return getCouponsFromCart(cart);
};

export const getCartDiscounts = (cart: Cart): AgnosticDiscount[] => {
  const lineItems = getCartItems(cart);
  return lineItems.reduce((reducedDiscounts, lineItem) => {
    const discounts = lineItem.discountedPricePerQuantity;
    const discountsLength = discounts.length;
    const quantity = lineItem.quantity;

    discounts[discountsLength - 1]?.discountedPrice.includedDiscounts.forEach(includedDiscount => {
      const searchedDiscountIndex = reducedDiscounts.findIndex(discount => discount.id === includedDiscount.discount.id);
      const discountDetails = includedDiscount.discount;
      const discountValue = includedDiscount.discountedAmount.centAmount * quantity / 100;

      if (searchedDiscountIndex === -1) {
        reducedDiscounts.push({
          id: discountDetails.id,
          name: discountDetails.name,
          requiresCoupon: discountDetails.requiresDiscountCode,
          typeId: 'cart-discount',
          valueType: discountDetails.value.type,
          value: discountValue
        });
      } else {
        reducedDiscounts[searchedDiscountIndex].value += discountValue;
      }
    });
    return reducedDiscounts;
  }, []);
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
  getCoupons: getCartCoupons,
  getDiscounts: getCartDiscounts
};

export default cartGetters;
