import camelCase from 'lodash-es/camelCase'

// this is the mirror copy of taxcalc.js from VSF API

function isSpecialPriceActive (fromDate, toDate) {
  if (!fromDate && !toDate) {
    return true
  }

  const now = new Date()
  fromDate = fromDate ? new Date(fromDate) : false
  toDate = toDate ? new Date(toDate) : false

  if (fromDate && toDate) {
    return fromDate < now && toDate > now
  }

  if (fromDate && !toDate) {
    return fromDate < now
  }

  if (!fromDate && toDate) {
    return toDate > now
  }
}

/**
 * change object keys to camelCase
 */
function toCamelCase (obj: Record<string, any> = {}): Record<string, any> {
  return Object.keys(obj).reduce((accObj, currKey) => {
    accObj[camelCase(currKey)] = obj[currKey]
    return accObj
  }, {})
}

/**
 * Create price object with base price and tax
 * @param price - product price which is used to extract tax value
 * @param rateFactor - tax % in decimal
 * @param isPriceInclTax - determines if price already include tax
 */
function createSinglePrice (price: number, rateFactor: number, isPriceInclTax: boolean) {
  const _price = isPriceInclTax ? price / (1 + rateFactor) : price
  const tax = _price * rateFactor

  return { price: _price, tax }
}

interface AssignPriceParams {
  product: any,
  target: string,
  price: number,
  tax?: number,
  deprecatedPriceFieldsSupport?: boolean
}
/**
 * assign price and tax to product with proper keys
 * @param AssignPriceParams
 */
function assignPrice ({ product, target, price, tax = 0, deprecatedPriceFieldsSupport = true }: AssignPriceParams): void {
  let priceUpdate = {
    [target]: price,
    [`${target}_tax`]: tax,
    [`${target}_incl_tax`]: price + tax
  }

  if (deprecatedPriceFieldsSupport) {
    /** BEGIN @deprecated - inconsitent naming kept just for the backward compatibility */
    priceUpdate = Object.assign(priceUpdate, toCamelCase(priceUpdate))
    /** END */
  }

  Object.assign(product, priceUpdate)
}

export function updateProductPrices ({ product, rate, sourcePriceInclTax = false, deprecatedPriceFieldsSupport = false, finalPriceInclTax = true }) {
  const rate_factor = parseFloat(rate.rate) / 100
  const hasOriginalPrices = (
    product.hasOwnProperty('original_price') &&
    product.hasOwnProperty('original_final_price') &&
    product.hasOwnProperty('original_special_price')
  )
  // build objects with original price and tax
  // for first calculation use `price`, for next one use `original_price`
  const priceWithTax = createSinglePrice(parseFloat(product.original_price || product.price), rate_factor, sourcePriceInclTax && !hasOriginalPrices)
  const finalPriceWithTax = createSinglePrice(parseFloat(product.original_final_price || product.final_price), rate_factor, finalPriceInclTax && !hasOriginalPrices)
  const specialPriceWithTax = createSinglePrice(parseFloat(product.original_special_price || product.special_price), rate_factor, sourcePriceInclTax && !hasOriginalPrices)

  // save original prices
  if (!hasOriginalPrices) {
    assignPrice({ product, target: 'original_price', ...priceWithTax, deprecatedPriceFieldsSupport })

    if (specialPriceWithTax.price) {
      product.original_special_price = specialPriceWithTax.price
    }

    if (finalPriceWithTax.price) {
      product.original_final_price = finalPriceWithTax.price
    }
  }

  // reset previous calculation
  assignPrice({ product, target: 'price', ...priceWithTax, deprecatedPriceFieldsSupport })

  if (specialPriceWithTax.price) {
    assignPrice({ product, target: 'special_price', ...specialPriceWithTax, deprecatedPriceFieldsSupport })
  }
  if (finalPriceWithTax.price) {
    assignPrice({ product, target: 'final_price', ...finalPriceWithTax, deprecatedPriceFieldsSupport })
  }

  if (product.final_price) {
    if (product.final_price < product.price) { // compare the prices with the product final price if provided; final prices is used in case of active catalog promo rules for example
      assignPrice({ product, target: 'price', ...finalPriceWithTax, deprecatedPriceFieldsSupport })
      if (product.special_price && product.final_price < product.special_price) { // for VS - special_price is any price lowered than regular price (`price`); in Magento there is a separate mechanism for setting the `special_prices`
        assignPrice({ product, target: 'price', ...specialPriceWithTax, deprecatedPriceFieldsSupport }) // if the `final_price` is lower than the original `special_price` - it means some catalog rules were applied over it
        assignPrice({ product, target: 'special_price', ...finalPriceWithTax, deprecatedPriceFieldsSupport })
      } else {
        assignPrice({ product, target: 'price', ...finalPriceWithTax, deprecatedPriceFieldsSupport })
      }
    }
  }

  if (product.special_price && (product.special_price < product.original_price)) {
    if (!isSpecialPriceActive(product.special_from_date, product.special_to_date)) {
      // out of the dates period
      assignPrice({ product, target: 'special_price', price: 0, tax: 0, deprecatedPriceFieldsSupport })
    } else {
      assignPrice({ product, target: 'price', ...specialPriceWithTax, deprecatedPriceFieldsSupport })
    }
  } else {
    // the same price as original; it's not a promotion
    assignPrice({ product, target: 'special_price', price: 0, tax: 0, deprecatedPriceFieldsSupport })
  }

  if (product.configurable_children) {
    for (let configurableChild of product.configurable_children) {
      if (configurableChild.custom_attributes) {
        for (let opt of configurableChild.custom_attributes) {
          configurableChild[opt.attribute_code] = opt.value
        }
      }

      // update children prices
      updateProductPrices({ product: configurableChild, rate, sourcePriceInclTax, deprecatedPriceFieldsSupport, finalPriceInclTax })

      if ((configurableChild.price_incl_tax <= product.price_incl_tax) || product.price === 0) { // always show the lowest price
        assignPrice({
          product,
          target: 'price',
          price: configurableChild.price,
          tax: configurableChild.price_tax,
          deprecatedPriceFieldsSupport
        })
        assignPrice({
          product,
          target: 'special_price',
          price: configurableChild.special_price,
          tax: configurableChild.special_price_tax,
          deprecatedPriceFieldsSupport
        })
      }
    }
  }
}

export function calculateProductTax ({ product, taxClasses, taxCountry = 'PL', taxRegion = '', sourcePriceInclTax = false, deprecatedPriceFieldsSupport = false, finalPriceInclTax = true, userGroupId = null, isTaxWithUserGroupIsActive }) {
  let rateFound = false
  let product_tax_class_id = parseInt(product.tax_class_id)
  if (product_tax_class_id > 0) {
    let taxClass
    if (isTaxWithUserGroupIsActive) {
      taxClass = taxClasses.find((el) =>
        el.product_tax_class_ids.indexOf(product_tax_class_id) >= 0 &&
          el.customer_tax_class_ids.indexOf(userGroupId) >= 0
      )
    } else {
      taxClass = taxClasses.find((el) => el.product_tax_class_ids.indexOf(product_tax_class_id) >= 0)
    }

    if (taxClass) {
      for (let rate of taxClass.rates) { // TODO: add check for zip code ranges (!)
        if (rate.tax_country_id === taxCountry && (rate.region_name === taxRegion || rate.tax_region_id === 0 || !rate.region_name)) {
          updateProductPrices({ product, rate, sourcePriceInclTax, deprecatedPriceFieldsSupport, finalPriceInclTax })
          rateFound = true
          break
        }
      }
    }
  }
  if (!rateFound) {
    updateProductPrices({ product, rate: { rate: 0 }, sourcePriceInclTax, deprecatedPriceFieldsSupport, finalPriceInclTax })

    product.price_incl_tax = product.price
    product.price_tax = 0
    product.special_price_incl_tax = 0
    product.special_price_tax = 0

    if (deprecatedPriceFieldsSupport) {
      /** BEGIN @deprecated - inconsitent naming kept just for the backward compatibility */
      product.priceInclTax = product.price
      product.priceTax = 0
      product.specialPriceInclTax = 0
      product.specialPriceTax = 0
      /** END */
    }

    if (product.configurable_children) {
      for (let configurableChildren of product.configurable_children) {
        configurableChildren.price_incl_tax = configurableChildren.price
        configurableChildren.price_tax = 0
        configurableChildren.special_price_incl_tax = 0
        configurableChildren.special_price_tax = 0

        if (deprecatedPriceFieldsSupport) {
          /** BEGIN @deprecated - inconsitent naming kept just for the backward compatibility */
          configurableChildren.priceInclTax = configurableChildren.price
          configurableChildren.priceTax = 0
          configurableChildren.specialPriceInclTax = 0
          configurableChildren.specialPriceTax = 0
          /** END */
        }
      }
    }
  }
  return product
}
