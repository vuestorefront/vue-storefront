import { onlineHelper } from '@vue-storefront/core/helpers';
import config from 'config';
import CartItem from '@vue-storefront/core/modules/cart/types/CartItem';

interface ItemPrices {
  special: number,
  original: number,
  regular: number
}

const getProductPrice = (product: CartItem): ItemPrices => {
  if (!product) {
    return {
      special: null,
      original: null,
      regular: null
    };
  }

  const { isOnline } = onlineHelper;
  const { cart: { displayItemDiscounts }, tax: { finalPriceIncludesTax } } = config;
  // @ts-ignore
  const { price_incl_tax, original_price_incl_tax, regular_price, totals, qty } = product;

  if (!displayItemDiscounts || !isOnline) {
    return {
      special: null,
      original: null,
      regular: (original_price_incl_tax || price_incl_tax) * qty
    }
  } else if (isOnline && totals) {
    if (finalPriceIncludesTax) {
      return {
        special: totals.discount_amount ? (totals.row_total + totals.tax_amount) - totals.discount_amount : null,
        original: totals.discount_amount ? totals.row_total_incl_tax : null,
        regular: !totals.discount_amount ? totals.row_total_incl_tax : null
      }
    } else {
      return {
        special: totals.discount_amount ? totals.row_total - totals.discount_amount : null,
        original: totals.discount_amount ? totals.row_total : null,
        regular: !totals.discount_amount ? totals.row_total : null
      }
    }
  }
  return {
    special: null,
    original: null,
    regular: regular_price
  }
}

export default getProductPrice;
