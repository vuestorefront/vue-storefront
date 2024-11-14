import get from 'lodash-es/get'

import { isBundleProduct } from '@vue-storefront/core/modules/catalog/helpers';
import { price } from '@vue-storefront/core/filters';
import { getCustomOptionValues, getCustomOptionPriceDelta } from '@vue-storefront/core/modules/catalog/helpers/customOption'
import { getBundleOptionsValues, getBundleOptionPrice, getDefaultBundleOptions } from '@vue-storefront/core/modules/catalog/helpers/bundleOptions'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'

import { UPDATE_CART_ITEM_DISCOUNT_PRICE_DATA_EVENT_ID, UPDATE_PRODUCT_DEFAULT_DISCOUNT_PRICE_DATA_EVENT_ID } from 'src/modules/shared/types/discount-price/events';
import UpdateProductDiscountPriceEventData from 'src/modules/shared/types/discount-price/update-product-discount-price-event-data.interface';
import { AmGiftCardOptions } from 'src/modules/gift-card';

interface ProductPriceData {
  originalPriceInclTax: number,
  priceInclTax: number,
  specialPrice: number | null
}

export interface ProductPrice {
  regular: number,
  special: number | null
}

function calculateCartItemBundleOptionsPrice (product) {
  const allBundleOptions = product.bundle_options || []
  const selectedBundleOptions = Object.values(get(product, 'product_option.extension_attributes.bundle_options', {}))
  const price = getBundleOptionPrice(
    getBundleOptionsValues(selectedBundleOptions as any[], allBundleOptions)
  )

  return price
}

function calculateProductDefaultBundleOptionsPrice (product) {
  return {
    priceInclTax: product.price_incl_tax || 0,
    originalPriceInclTax: product.original_price_incl_tax || 0,
    specialPrice: product.special_price
  };
}

function getProductPriceData (product, bundleOptionsPriceCalculationFunction: (product) => any): ProductPriceData {
  let productPriceData: ProductPriceData = {
    originalPriceInclTax: 0,
    priceInclTax: 0,
    specialPrice: null
  }

  const amGiftCardOptions: AmGiftCardOptions = product.product_option?.extension_attributes?.am_giftcard_options;

  if (isBundleProduct(product)) {
    productPriceData = bundleOptionsPriceCalculationFunction(product);
  } else if (product.giftcard_options) {
    productPriceData.priceInclTax = product.giftcard_options.price_amount;
    productPriceData.originalPriceInclTax = product.giftcard_options.price_amount;
  } else if (amGiftCardOptions) {
    productPriceData.priceInclTax = amGiftCardOptions.am_giftcard_amount || amGiftCardOptions.am_giftcard_amount_custom;
    productPriceData.originalPriceInclTax = productPriceData.priceInclTax;
  } else {
    productPriceData.priceInclTax = product.price_incl_tax || 0;
    productPriceData.originalPriceInclTax = product.original_price_incl_tax || 0;
    productPriceData.specialPrice = product.special_price;
  }

  return productPriceData;
}

function calculateCustomOptionsPriceDelta (product, customOptions) {
  const priceDelta = getCustomOptionPriceDelta(
    getCustomOptionValues(Object.values(customOptions), product.custom_options),
    product
  )

  return priceDelta.priceInclTax;
}

export function formatPrice (value: number | null) {
  return value !== null ? price(value) : ''
}

export function getProductDefaultDiscount (product, format = true, inPercent = true) {
  const defaultDiscount = format ? '' : 0;
  if (!product) {
    return defaultDiscount;
  }

  const productPriceData = getProductPriceData(product, calculateProductDefaultBundleOptionsPrice);
  const productDiscountPriceData: UpdateProductDiscountPriceEventData = {
    value: undefined,
    product
  };

  EventBus.$emit(UPDATE_PRODUCT_DEFAULT_DISCOUNT_PRICE_DATA_EVENT_ID, productDiscountPriceData);

  const price = getProductPrice(product, productDiscountPriceData, productPriceData);

  if (price.special === null || price.regular === price.special) {
    return defaultDiscount;
  }

  if (!inPercent) {
    return price.regular - price.special;
  }

  const discount = Math.round((1 - price.special / price.regular) * 100);

  return format ? `-${discount}%` : discount;
}

export function getCartItemDiscount (product, format = true, inPercent = true) {
  const defaultDiscount = format ? '' : 0;
  if (!product) {
    return defaultDiscount;
  }

  const productPriceData = getProductPriceData(product, calculateCartItemBundleOptionsPrice);
  const productDiscountPriceData: UpdateProductDiscountPriceEventData = {
    value: undefined,
    product
  };

  EventBus.$emit(UPDATE_CART_ITEM_DISCOUNT_PRICE_DATA_EVENT_ID, productDiscountPriceData);

  const price = getProductPrice(product, productDiscountPriceData, productPriceData)

  if (price.special === null || price.regular === price.special) {
    return defaultDiscount;
  }

  if (!inPercent) {
    return price.regular - price.special;
  }

  const discount = Math.round((1 - price.special / price.regular) * 100);

  return format ? `-${discount}%` : discount;
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

function getProductPrice (product, productDiscountPriceData: UpdateProductDiscountPriceEventData, productPriceData: ProductPriceData, customOptions = {}) {
  const productDiscountPrice = productDiscountPriceData.value
    ? productDiscountPriceData.value * (product.qty || 1)
    : productDiscountPriceData.value;

  let priceInclTax = productPriceData.priceInclTax;
  let originalPriceInclTax = productPriceData.originalPriceInclTax;
  let specialPrice = productPriceData.specialPrice;

  const priceDelta = calculateCustomOptionsPriceDelta(product, customOptions)

  const original = (originalPriceInclTax + priceDelta) * product.qty || originalPriceInclTax
  const regular = (priceInclTax + priceDelta) * product.qty || product.regular_price || priceInclTax
  let special = productDiscountPrice || (priceInclTax + priceDelta) * product.qty || priceInclTax

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

export function getCartItemPrice (product, customOptions, format = true) {
  if (!product) {
    return {
      regular: format ? '' : 0,
      special: format ? '' : null
    }
  }

  const productPriceData = getProductPriceData(product, calculateCartItemBundleOptionsPrice);
  const productDiscountPriceData: UpdateProductDiscountPriceEventData = {
    value: undefined,
    product
  }

  EventBus.$emit(UPDATE_CART_ITEM_DISCOUNT_PRICE_DATA_EVENT_ID, productDiscountPriceData);

  const productPrice = getProductPrice(product, productDiscountPriceData, productPriceData, customOptions);

  if (!format) {
    return productPrice;
  }

  return {
    regular: formatPrice(productPrice.regular),
    special: formatPrice(productPrice.special)
  }
}

export function getProductDefaultPrice (product, customOptions, format = true) {
  if (!product) {
    return {
      regular: format ? '' : 0,
      special: format ? '' : null
    }
  }

  const productPriceData = getProductPriceData(product, calculateProductDefaultBundleOptionsPrice);
  const productDiscountPriceData: UpdateProductDiscountPriceEventData = {
    value: undefined,
    product
  }

  EventBus.$emit(UPDATE_PRODUCT_DEFAULT_DISCOUNT_PRICE_DATA_EVENT_ID, productDiscountPriceData);

  const productPrice = getProductPrice(product, productDiscountPriceData, productPriceData, customOptions);

  if (!format) {
    return productPrice;
  }

  return {
    regular: productPrice.regular ? formatPrice(productPrice.regular) : '',
    special: formatPrice(productPrice.special)
  }
}

export function getProductPriceFromTotals (product) {
  if (!product.totals || !product.totals.options) {
    return {
      regular: '',
      special: ''
    }
  }

  const isSpecialPrice = product.totals.discount_amount > 0

  const special = product.totals.row_total_incl_tax - product.totals.discount_amount
  const regular = product.totals.row_total_incl_tax

  return {
    regular: formatPrice(regular),
    special: isSpecialPrice ? formatPrice(special) : ''
  }
}
