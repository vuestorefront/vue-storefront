import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'

export default function syncProductPrice (product, backProduct) { // TODO: we probably need to update the Net prices here as well
  product.sgn = backProduct.sgn // copy the signature for the modified price
  product.price_incl_tax = backProduct.price_info.final_price
  product.original_price_incl_tax = backProduct.price_info.regular_price
  product.special_price_incl_tax = backProduct.price_info.special_price

  product.special_price = backProduct.price_info.extension_attributes.tax_adjustments.special_price
  product.price = backProduct.price_info.extension_attributes.tax_adjustments.final_price
  product.original_price = backProduct.price_info.extension_attributes.tax_adjustments.regular_price

  product.price_tax = product.price_incl_tax - product.price
  product.special_price_tax = product.special_price_incl_tax - product.special_price
  product.original_price_tax = product.original_price_incl_tax - product.original_price

  if (product.price_incl_tax >= product.original_price_incl_tax) {
    product.special_price_incl_tax = 0
    product.special_price = 0
  }

  /** BEGIN @deprecated - inconsitent naming kept just for the backward compatibility */
  product.priceInclTax = product.price_incl_tax
  product.priceTax = product.price_tax
  product.originalPrice = product.original_price
  product.originalPriceInclTax = product.original_price_incl_tax
  product.originalPriceTax = product.original_price_tax
  product.specialPriceInclTax = product.special_price_incl_tax
  product.specialPriceTax = product.special_price_tax
  /** END */
  EventBus.$emit('product-after-priceupdate', product)
  // Logger.log(product.sku, product, backProduct)()
  return product
}
