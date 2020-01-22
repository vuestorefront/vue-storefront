import get from 'lodash-es/get'

const calculateBundleOptionProductPrice = ({ price = 1, priceInclTax = 1, qty = '1' }) => {
  const product = {
    price: 0,
    priceInclTax: 0
  }
  if (parseInt(qty) >= 0) {
    product.price += price * parseInt(qty)
    product.priceInclTax += priceInclTax * parseInt(qty)
  }
  return product
}

export const getBundleOptionPrice = (bundleOptionValues) => bundleOptionValues
  .map(bundleOptionValue => {
    const product = get(bundleOptionValue, 'product', {})
    return calculateBundleOptionProductPrice({
      price: product.price,
      priceInclTax: product.price_incl_tax || product.priceInclTax,
      qty: bundleOptionValue.qty
    })
  })
  .reduce(
    (priceDelta, currentPriceDelta) => ({
      price: currentPriceDelta.price + priceDelta.price,
      priceInclTax: currentPriceDelta.priceInclTax + priceDelta.priceInclTax
    }),
    { price: 0, priceInclTax: 0 }
  )

export const getBundleOptionsValues = (selectedBundleOptions, allBundeOptions) => selectedBundleOptions
  .map(selectedBundleOption => {
    const {
      product_links: productLinks = []
    } = allBundeOptions.find(bundleOption => bundleOption.option_id === selectedBundleOption.option_id) || {}
    const value = productLinks.find(productLink => String(productLink.id) === String(selectedBundleOption.option_selections[0])) || {}
    return { ...value, qty: selectedBundleOption.option_qty }
  })
