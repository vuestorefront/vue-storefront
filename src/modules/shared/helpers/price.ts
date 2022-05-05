import get from 'lodash-es/get'

import { isBundleProduct } from '@vue-storefront/core/modules/catalog/helpers';
import { price } from '@vue-storefront/core/filters';
import { getCustomOptionValues, getCustomOptionPriceDelta } from '@vue-storefront/core/modules/catalog/helpers/customOption'
import { getBundleOptionsValues, getBundleOptionPrice, getDefaultBundleOptions } from '@vue-storefront/core/modules/catalog/helpers/bundleOptions'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { SelectedBundleOption } from '@vue-storefront/core/modules/catalog/types/BundleOption';

import { UPDATE_CART_ITEM_DISCOUNT_PRICE_DATA_EVENT_ID, UPDATE_PRODUCT_DEFAULT_DISCOUNT_PRICE_DATA_EVENT_ID } from 'src/modules/shared/types/discount-price/events';
import UpdateProductDiscountPriceEventData from 'src/modules/shared/types/discount-price/update-product-discount-price-event-data.interface';

interface ProductPriceData {
  originalPriceInclTax: number,
  priceInclTax: number,
  specialPrice: number
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
  const allBundleOptions = product.bundle_options || [];

  const defaultBundleOptions = getDefaultBundleOptions(product);

  const price = getBundleOptionPrice(
    getBundleOptionsValues(defaultBundleOptions as SelectedBundleOption[], allBundleOptions)
  )

  return price;
}

function getProductPriceData (product, bundleOptionsPriceCalculationFunction: (product) => any): ProductPriceData {
  let productPriceData: ProductPriceData = {
    originalPriceInclTax: 0,
    priceInclTax: 0,
    specialPrice: 0
  }

  if (isBundleProduct(product)) {
    productPriceData = bundleOptionsPriceCalculationFunction(product);
  } else if (product.giftcard_options) {
    productPriceData.priceInclTax = product.giftcard_options.price_amount;
    productPriceData.originalPriceInclTax = product.giftcard_options.price_amount;
  } else {
    productPriceData.priceInclTax = product.price_incl_tax || product.priceInclTax || 0
    productPriceData.originalPriceInclTax = product.original_price_incl_tax || product.originalPriceInclTax || 0
    productPriceData.specialPrice = product.special_price || product.specialPrice || 0
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

function formatPrice (value) {
  return value ? price(value) : ''
}

export function getProductDefaultDiscount (product, format = true) {
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

  if (!price.special || price.regular === price.special) {
    return defaultDiscount;
  }

  const discount = Math.round((1 - price.special / price.regular) * 100);

  return format ? `-${discount}%` : discount;
}

function getProductPrice (product, productDiscountPriceData: UpdateProductDiscountPriceEventData, productPriceData: ProductPriceData, customOptions = {}) {
  const productDiscountPrice = productDiscountPriceData.value
    ? productDiscountPriceData.value * (product.qty || 1)
    : productDiscountPriceData.value;

  let priceInclTax = productPriceData.priceInclTax;
  let originalPriceInclTax = productPriceData.originalPriceInclTax;
  let specialPrice = productPriceData.specialPrice;

  const isSpecialPrice = !!productDiscountPrice || (specialPrice && priceInclTax && originalPriceInclTax)
  const priceDelta = calculateCustomOptionsPriceDelta(product, customOptions)

  const special = productDiscountPrice || (priceInclTax + priceDelta) * product.qty || priceInclTax
  const original = (originalPriceInclTax + priceDelta) * product.qty || originalPriceInclTax
  const regular = (priceInclTax + priceDelta) * product.qty || product.regular_price || priceInclTax

  return {
    regular: isSpecialPrice ? original : regular,
    special: isSpecialPrice ? special : 0
  }
}

export function getCartItemPrice (product, customOptions, format = true) {
  if (!product) {
    return {
      regular: format ? '' : 0,
      special: format ? '' : 0
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
      special: format ? '' : 0
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
    regular: formatPrice(productPrice.regular),
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
