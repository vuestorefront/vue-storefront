export function updateProductPrices (product, rate, sourcePriceInclTax = false) {
  const rateFactor = parseFloat(rate.rate) / 100
  product.price = parseFloat(product.price)
  product.special_price = parseFloat(product.special_price)

  let priceExclTax = product.price
  if (sourcePriceInclTax) {
    priceExclTax = product.price / (1 + rateFactor)
    product.price = priceExclTax
  }

  product.priceTax = priceExclTax * rateFactor
  product.priceInclTax = priceExclTax + product.priceTax

  let specialPriceExclTax = product.special_price
  if (sourcePriceInclTax) {
    specialPriceExclTax = product.special_price / (1 + rateFactor)
    product.special_price = specialPriceExclTax
  }

  product.specialPriceTax = specialPriceExclTax * rateFactor
  product.specialPriceInclTax = specialPriceExclTax + product.specialPriceTax

  if (product.special_price && (product.special_price < product.price)) {
    if ((product.special_to_date && new Date(product.special_to_date) < new Date()) || (product.special_from_date && new Date(product.special_from_date) > new Date())) {
      product.special_price = 0 // out of the dates period
    } else {
      product.originalPrice = priceExclTax
      product.originalPriceInclTax = product.priceInclTax
      product.originalPriceTax = product.priceTax

      product.price = specialPriceExclTax
      product.priceInclTax = product.specialPriceInclTax
      product.priceTax = product.specialPriceTax
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

      let priceExclTax = configurableChild.price
      if (sourcePriceInclTax) {
        priceExclTax = configurableChild.price / (1 + rateFactor)
        configurableChild.price = priceExclTax
      }

      configurableChild.priceTax = priceExclTax * rateFactor
      configurableChild.priceInclTax = priceExclTax + configurableChild.priceTax

      let specialPriceExclTax = parseFloat(configurableChild.special_price)

      if (sourcePriceInclTax) {
        specialPriceExclTax = configurableChild.special_price / (1 + rateFactor)
        configurableChild.special_price = specialPriceExclTax
      }

      configurableChild.specialPriceTax = specialPriceExclTax * rateFactor
      configurableChild.specialPriceInclTax = specialPriceExclTax + configurableChild.specialPriceTax

      if (configurableChild.special_price && (configurableChild.special_price < configurableChild.price)) {
        if ((configurableChild.special_to_date && new Date(configurableChild.special_to_date) < new Date()) || (configurableChild.special_from_date && new Date(configurableChild.special_from_date) > new Date())) {
          configurableChild.special_price = 0 // out of the dates period
        } else {
          configurableChild.originalPrice = priceExclTax
          configurableChild.originalPriceInclTax = configurableChild.priceInclTax
          configurableChild.originalPriceTax = configurableChild.priceTax

          configurableChild.price = specialPriceExclTax
          configurableChild.priceInclTax = configurableChild.specialPriceInclTax
          configurableChild.priceTax = configurableChild.specialPriceTax
        }
      } else {
        configurableChild.special_price = 0
      }

      if (configurableChild.priceInclTax < product.priceInclTax || product.price === 0) { // always show the lowest price
        product.priceInclTax = configurableChild.priceInclTax
        product.priceTax = configurableChild.priceTax
        product.price = configurableChild.price
        product.special_price = configurableChild.special_price
        product.specialPriceInclTax = configurableChild.specialPriceInclTax
        product.specialPriceTax = configurableChild.specialPriceTax
        product.originalPrice = configurableChild.originalPrice
        product.originalPriceInclTax = configurableChild.originalPriceInclTax
        product.originalPriceTax = configurableChild.originalPriceTax
      }
    }
  }
}

export function calculateProductTax (product, taxClasses, taxCountry = 'PL', taxRegion = '', sourcePriceInclTax = false) {
  let rateFound = false
  if (product.tax_class_id > 0) {
    let taxClass = taxClasses.find((el) => el.product_tax_class_ids.indexOf(parseInt(product.tax_class_id) >= 0))
    if (taxClass) {
      for (let rate of taxClass.rates) { // TODO: add check for zip code ranges (!)
        if (rate.tax_country_id === taxCountry && (rate.region_name === taxRegion || rate.tax_region_id === 0 || !rate.region_name)) {
          updateProductPrices(product, rate, sourcePriceInclTax)
          rateFound = true
          console.debug('Tax rate ' + rate.code + ' = ' + rate.rate + '% found for ' + taxCountry + ' / ' + taxRegion)
          break
        }
      }
    } else {
      console.debug('No such tax class id: ' + product.tax_class_id)
    }
  } else  {
    console.debug('No  tax class set for: ' + product.sku)
  }
  if (!rateFound) {
    console.log('No such tax class id: ' + product.tax_class_id + ' or rate not found for ' + taxCountry + ' / ' + taxRegion)
    updateProductPrices(product, {rate: 0})

    product.priceInclTax = product.price
    product.priceTax = 0
    product.specialPriceInclTax = 0
    product.specialPriceTax = 0
    if (product.configurable_children) {
      for (let configurableChildren of product.configurable_children) {
        configurableChildren.priceInclTax = configurableChildren.price
        configurableChildren.priceTax = 0
        configurableChildren.specialPriceInclTax = 0
        configurableChildren.specialPriceTax = 0
      }
    }
  }
}
