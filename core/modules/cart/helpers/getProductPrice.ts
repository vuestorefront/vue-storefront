import { onlineHelper } from '@vue-storefront/core/helpers';
import config from 'config';
import CartItem from '@vue-storefront/core/modules/cart/types/CartItem';

type Price = number|string

interface Prices {
  special: Price,
  original: Price,
  regular: Price
}

const getProductPrice = (product: CartItem): Prices => {
  if (!product) {
    return {
      special: '',
      original: '',
      regular: ''
    };
  }

  const { isOnline } = onlineHelper;
const { cart: { displayItemDiscounts }, tax: { finalPriceIncludesTax } } = config;
  const { displayItemDiscounts } = cart;
  const { finalPriceIncludesTax } = tax
  // @ts-ignore
  const { price_incl_tax, original_price_incl_tax, regular_price, totals, qty } = product;

  if (!displayItemDiscounts || !isOnline) {
    return {
      special: price_incl_tax * qty,
      original: original_price_incl_tax * qty,
      regular: (original_price_incl_tax || price_incl_tax) * qty
    }
  } else if (isOnline && totals) {
    return {
      special: finalPriceIncludesTax ? (totals.row_total + totals.tax_amount) - totals.discount_amount : totals.row_total - totals.discount_amount,
      original: finalPriceIncludesTax ? totals.row_total_incl_tax : totals.row_total,
      regular: finalPriceIncludesTax ? totals.row_total_incl_tax : totals.row_total
    }
  } else {
    return {
      special: '',
      original: '',
      regular: regular_price
    }
  }
}

export default getProductPrice;
