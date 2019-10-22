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

export function updateProductPrices ({ product, rate, sourcePriceInclTax = false, deprecatedPriceFieldsSupport = false, finalPriceInclTax = true }) {
  const rate_factor = parseFloat(rate.rate) / 100
  if (finalPriceInclTax) {
    product.final_price_incl_tax = parseFloat(product.final_price) // final price does include tax
    product.final_price = product.final_price_incl_tax / (1 + rate_factor)
    product.final_price_tax = product.final_price_incl_tax - product.final_price
  } else {
    product.final_price = parseFloat(product.final_price) // final price does include tax
    product.final_price_tax = product.final_price * rate_factor
    product.final_price_incl_tax = product.final_price + product.final_price_tax
  }
  product.price = parseFloat(product.price)
  product.special_price = parseFloat(product.special_price)

  if (product.final_price) {
    if (product.final_price < product.price) { // compare the prices with the product final price if provided; final prices is used in case of active catalog promo rules for example
      if (product.final_price < product.special_price) { // for VS - special_price is any price lowered than regular price (`price`); in Magento there is a separate mechanism for setting the `special_prices`
        product.price = product.special_price // if the `final_price` is lower than the original `special_price` - it means some catalog rules were applied over it
      }
      product.special_price = product.final_price
    } else {
      product.price = product.final_price
    }
  }

  let price_excl_tax = product.price
  if (sourcePriceInclTax) {
    price_excl_tax = product.price / (1 + rate_factor)
    product.price = price_excl_tax
  }

  product.price_tax = price_excl_tax * rate_factor
  product.price_incl_tax = price_excl_tax + product.price_tax

  if (!product.original_price) {
    product.original_price = price_excl_tax
    product.original_price_incl_tax = product.price_incl_tax
    product.original_price_tax = product.price_tax
  }

  let special_price_excl_tax = product.special_price
  if (sourcePriceInclTax) {
    special_price_excl_tax = product.special_price / (1 + rate_factor)
    product.special_price = special_price_excl_tax
  }

  product.special_price_tax = special_price_excl_tax * rate_factor
  product.special_price_incl_tax = special_price_excl_tax + product.special_price_tax

  if (deprecatedPriceFieldsSupport) {
    /** BEGIN @deprecated - inconsitent naming kept just for the backward compatibility */
    product.priceTax = product.price_tax
    product.priceInclTax = product.price_incl_tax
    product.specialPriceTax = product.special_price_tax
    product.specialPriceInclTax = product.special_price_incl_tax
    /** END */
  }

  if (product.special_price && (product.special_price < product.original_price)) {
    if (!isSpecialPriceActive(product.special_from_date, product.special_to_date)) {
      product.special_price = 0 // out of the dates period
    } else {
      product.original_price = price_excl_tax
      product.original_price_incl_tax = product.price_incl_tax
      product.original_price_tax = product.price_tax

      product.price = special_price_excl_tax
      product.price_incl_tax = product.special_price_incl_tax
      product.price_tax = product.special_price_tax

      if (deprecatedPriceFieldsSupport) {
        /** BEGIN @deprecated - inconsitent naming kept just for the backward compatibility */
        product.priceInclTax = product.price_incl_tax
        product.priceTax = product.price_tax
        product.originalPrice = product.original_price
        product.originalPriceInclTax = product.original_price_incl_tax
        product.originalPriceTax = product.original_price_tax
        /** END */
      }
    }
  } else {
    product.special_price = 0 // the same price as original; it's not a promotion
  }

  if (product.configurable_children) {
    for (let configurableChild of product.configurable_children) {
      if (configurableChild.custom_attributes) {
        for (let opt of configurableChild.custom_attributes) {
          configurableChild[opt.attribute_code] = opt.value
        }
      }
      configurableChild.price = parseFloat(configurableChild.price)
      configurableChild.special_price = parseFloat(configurableChild.special_price)
      configurableChild.final_price_incl_tax = parseFloat(configurableChild.final_price) // final price does include tax
      configurableChild.final_price = configurableChild.final_price_incl_tax / (1 + rate_factor)

      if (configurableChild.final_price) {
        if (configurableChild.final_price < configurableChild.price) { // compare the prices with the product final price if provided; final prices is used in case of active catalog promo rules for example
          if (configurableChild.final_price < configurableChild.special_price) { // for VS - special_price is any price lowered than regular price (`price`); in Magento there is a separate mechanism for setting the `special_prices`
            configurableChild.price = configurableChild.special_price // if the `final_price` is lower than the original `special_price` - it means some catalog rules were applied over it
          }
          configurableChild.special_to_date = null
          configurableChild.special_from_date = null
          configurableChild.special_price = product.final_price
        } else {
          configurableChild.price = configurableChild.final_price
        }
      }

      let price_excl_tax = configurableChild.price
      if (sourcePriceInclTax) {
        price_excl_tax = configurableChild.price / (1 + rate_factor)
        configurableChild.price = price_excl_tax
      }

      configurableChild.price_tax = price_excl_tax * rate_factor
      configurableChild.price_incl_tax = price_excl_tax + configurableChild.price_tax

      let special_price_excl_tax = parseFloat(configurableChild.special_price)

      if (sourcePriceInclTax) {
        special_price_excl_tax = configurableChild.special_price / (1 + rate_factor)
        configurableChild.special_price = special_price_excl_tax
      }

      configurableChild.special_price_tax = special_price_excl_tax * rate_factor
      configurableChild.special_price_incl_tax = special_price_excl_tax + configurableChild.special_price_tax

      if (deprecatedPriceFieldsSupport) {
        /** BEGIN @deprecated - inconsitent naming kept just for the backward compatibility */
        configurableChild.priceTax = configurableChild.price_tax
        configurableChild.priceInclTax = configurableChild.price_incl_tax
        configurableChild.specialPriceTax = configurableChild.special_price_tax
        configurableChild.specialPriceInclTax = configurableChild.special_price_incl_tax
        /** END */
      }

      if (configurableChild.special_price && (configurableChild.special_price < configurableChild.price)) {
        if (!isSpecialPriceActive(configurableChild.special_from_date, configurableChild.special_to_date)) {
          configurableChild.special_price = 0 // out of the dates period
        } else {
          configurableChild.original_price = price_excl_tax
          configurableChild.original_price_incl_tax = configurableChild.price_incl_tax
          configurableChild.original_price_tax = configurableChild.price_tax

          configurableChild.price = special_price_excl_tax
          configurableChild.price_incl_tax = configurableChild.special_price_incl_tax
          configurableChild.price_tax = configurableChild.special_price_tax

          if (deprecatedPriceFieldsSupport) {
            /** BEGIN @deprecated - inconsitent naming kept just for the backward compatibility */
            configurableChild.originalPrice = configurableChild.original_price
            configurableChild.originalPriceInclTax = configurableChild.original_price_incl_tax
            configurableChild.originalPriceTax = configurableChild.original_price_tax
            configurableChild.priceInclTax = configurableChild.price_incl_tax
            configurableChild.priceTax = configurableChild.price_tax
            /** END */
          }
        }
      } else {
        configurableChild.special_price = 0
      }

      if ((configurableChild.price_incl_tax <= product.price_incl_tax) || product.price === 0) { // always show the lowest price
        product.price_incl_tax = configurableChild.price_incl_tax
        product.price_tax = configurableChild.price_tax
        product.price = configurableChild.price
        product.special_price = configurableChild.special_price
        product.special_price_incl_tax = configurableChild.special_price_incl_tax
        product.special_price_tax = configurableChild.special_price_tax
        product.original_price = configurableChild.original_price
        product.original_price_incl_tax = configurableChild.original_price_incl_tax
        product.original_price_tax = configurableChild.original_price_tax

        if (deprecatedPriceFieldsSupport) {
          /** BEGIN @deprecated - inconsitent naming kept just for the backward compatibility */
          product.priceInclTax = product.price_incl_tax
          product.priceTax = product.price_tax
          product.specialPriceInclTax = product.special_price_incl_tax
          product.specialPriceTax = product.special_price_tax
          product.originalPrice = product.original_price
          product.originalPriceInclTax = product.original_price_incl_tax
          product.originalPriceTax = product.original_price_tax
          /** END */
        }
      }
    }
  }
}

export function calculateProductTax ({ product, taxClasses, taxCountry = 'PL', taxRegion = '', sourcePriceInclTax = false, deprecatedPriceFieldsSupport = false, finalPriceInclTax = true, userGroupId = null, isTaxWithUserGroupIsActive }) {
  let rateFound = false
  if (product.tax_class_id > 0) {
    let taxClass
    if (isTaxWithUserGroupIsActive) {
      taxClass = taxClasses.find((el) =>
        el.product_tax_class_ids.indexOf(parseInt(product.tax_class_id)) >= 0 &&
          el.customer_tax_class_ids.indexOf(userGroupId) >= 0
      )
    } else {
      taxClass = taxClasses.find((el) => el.product_tax_class_ids.indexOf(parseInt(product.tax_class_id) >= 0))
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
}
