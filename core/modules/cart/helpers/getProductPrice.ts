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
      special: price_incl_tax * qty,
      original: original_price_incl_tax * qty,
      regular: (original_price_incl_tax || price_incl_tax) * qty
    }
  } else if (isOnline && totals) {
    if (finalPriceIncludesTax) {
      return {
        special: (totals.row_total + totals.tax_amount) - totals.discount_amount,
        original: totals.row_total_incl_tax,
        regular: totals.row_total_incl_tax
      }
    } else {
      return {
        special: totals.row_total - totals.discount_amount,
        original: totals.row_total,
        regular: totals.row_total
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
