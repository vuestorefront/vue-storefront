import get from 'lodash-es/get'

import CartItem from '@vue-storefront/core/modules/cart/types/CartItem';
import { isBundleProduct } from '@vue-storefront/core/modules/catalog/helpers';
import { getBundleOptionsValues, getBundleOptionPrice } from '@vue-storefront/core/modules/catalog/helpers/bundleOptions'
import Product from '@vue-storefront/core/modules/catalog/types/Product';
import { price } from '@vue-storefront/core/filters';
import UpdateProductDiscountPriceEventData from 'src/modules/shared/types/discount-price/update-product-discount-price-event-data.interface';

import { getCartItemDiscountedPrice, getProductDiscountedPrice } from './product-discounted-price';

interface ProductPriceData {
  originalPriceInclTax: number,
  priceInclTax: number,
  specialPrice: number | null
}

export interface ProductPrice {
  regular: number,
  special: number | null
}

export interface FormattedProductPrice {
  regular: string,
  special: string
}

export interface ProductDiscount {
  discount: number,
  discountPercent: number
}

export interface FormattedProductDiscount {
  discount: string,
  discountPercent: string
}

function calculateCartItemBundleOptionsPrice (
  product: Product
): ProductPriceData {
  const allBundleOptions = product.bundle_options || []
  const selectedBundleOptions = Object.values(get(product, 'product_option.extension_attributes.bundle_options', {}))
  const price = getBundleOptionPrice(
    getBundleOptionsValues(selectedBundleOptions as any[], allBundleOptions)
  )

  return price
}

export function calculateProductDefaultBundleOptionsPrice (
  product: Product
): ProductPriceData {
  return {
    priceInclTax: product.price_incl_tax || 0,
    originalPriceInclTax: product.original_price_incl_tax || 0,
    specialPrice: product.special_price !== undefined ? product.special_price : null
  };
}

export function getProductPriceData (
  product: Product | CartItem,
  bundleOptionsPriceCalculationFunction: (product: Product) => any
): ProductPriceData {
  let productPriceData: ProductPriceData = {
    originalPriceInclTax: 0,
    priceInclTax: 0,
    specialPrice: null
  }

  const amGiftCardOptions = product.product_option?.extension_attributes?.am_giftcard_options;
  const giftCardOptions = (product as CartItem).giftcard_options;

  if (isBundleProduct(product)) {
    productPriceData = bundleOptionsPriceCalculationFunction(product);
  } else if (giftCardOptions) {
    productPriceData.priceInclTax = giftCardOptions.price_amount;
    productPriceData.originalPriceInclTax = giftCardOptions.price_amount;
  } else if (amGiftCardOptions) {
    productPriceData.priceInclTax = amGiftCardOptions.am_giftcard_amount || amGiftCardOptions.am_giftcard_amount_custom;
    productPriceData.originalPriceInclTax = productPriceData.priceInclTax;
  } else {
    productPriceData.priceInclTax = product.price_incl_tax || 0;
    productPriceData.originalPriceInclTax = product.original_price_incl_tax || 0;
    productPriceData.specialPrice = product.special_price !== undefined ? product.special_price : null;
  }

  return productPriceData;
}

export function formatPrice (value: number | null) {
  return value !== null ? price(value) : ''
}

export function formatProductPrice (
  value: ProductPrice
): FormattedProductPrice {
  return {
    special: formatPrice(value.special),
    regular: formatPrice(value.regular)
  }
}

export function formatProductDiscount (
  value: ProductDiscount
): FormattedProductDiscount {
  return {
    discount: value.discount ? price(value) : '',
    discountPercent: value.discountPercent
      ? `-${value.discountPercent}%`
      : ''
  };
}

export function getProductDiscount (
  productPrice: ProductPrice
): ProductDiscount {
  if (
    productPrice.special === null ||
    productPrice.regular === productPrice.special
  ) {
    return {
      discount: 0,
      discountPercent: 0
    };
  }
  const discount = productPrice.regular - productPrice.special;
  const discountPercent = Math.round((1 - productPrice.special / productPrice.regular) * 100);

  return {
    discount,
    discountPercent
  }
}

export function getFinalPrice ({
  special, regular
}: ProductPrice): number {
  return special !== null && special < regular ? special : regular;
}

export function getTotalPriceForProductPrices (
  productPrices: ProductPrice[]
): ProductPrice {
  let totalRegularPrice = 0;
  let totalSpecialPrice = 0;

  productPrices.forEach((price) => {
    totalRegularPrice += price.regular;
    totalSpecialPrice += price.special !== null
      ? price.special
      : price.regular;
  });

  return {
    regular: totalRegularPrice,
    special: totalSpecialPrice >= totalRegularPrice ? null : totalSpecialPrice
  }
}

function getProductPrice (
  product: Product,
  productDiscountedPriceData: UpdateProductDiscountPriceEventData,
  productPriceData: ProductPriceData
) {
  const quantity = (product.qty || 1);
  const productDiscountPrice = productDiscountedPriceData.value
    ? productDiscountedPriceData.value * quantity
    : productDiscountedPriceData.value;

  let priceInclTax = productPriceData.priceInclTax;
  let originalPriceInclTax = productPriceData.originalPriceInclTax;
  let specialPrice = productPriceData.specialPrice;

  const original = originalPriceInclTax
  const regular = product.regular_price || priceInclTax
  let special = productDiscountPrice || priceInclTax

  if (productDiscountPrice !== undefined && productDiscountPrice < special) {
    special = productDiscountPrice
  }

  const isSpecialPrice = (!!productDiscountPrice ||
    (specialPrice && priceInclTax && originalPriceInclTax) ||
    specialPrice === 0) &&
    special < original;

  if (!special && isSpecialPrice) {
    special = 0;
  }

  return {
    regular: isSpecialPrice ? original : regular,
    special: isSpecialPrice ? special : null
  }
}

export function getCartItemPrice (
  cartItem: CartItem,
  productDiscountedPriceDictionary: Record<string, number>
) {
  const productPriceData = getProductPriceData(
    cartItem,
    calculateCartItemBundleOptionsPrice
  );
  const productDiscountedPriceData: UpdateProductDiscountPriceEventData = {
    value: getCartItemDiscountedPrice(cartItem, productDiscountedPriceDictionary),
    product: cartItem
  }

  return getProductPrice(
    cartItem,
    productDiscountedPriceData,
    productPriceData
  );
}

export function getProductDefaultPrice (
  product: Product,
  productDiscountedPriceDictionary: Record<string, number>
) {
  const productPriceData = getProductPriceData(
    product,
    calculateProductDefaultBundleOptionsPrice
  );
  const productDiscountedPriceData: UpdateProductDiscountPriceEventData = {
    value: getProductDiscountedPrice(product, productDiscountedPriceDictionary),
    product
  }

  return getProductPrice(
    product,
    productDiscountedPriceData,
    productPriceData
  );
}
