import {
  getBundleOptionsValues,
  getBundleOptionPrice,
  getSelectedBundleOptions
} from '@vue-storefront/core/modules/catalog/helpers/bundleOptions'
import Product from '@vue-storefront/core/modules/catalog/types/Product';

export default function getBundleProductPrice (product: Product) {
  const selectedBundleOptions = getSelectedBundleOptions(product)
  const { price, priceInclTax } = getBundleOptionPrice(
    getBundleOptionsValues(selectedBundleOptions, product.bundle_options)
  )

  return { price, priceInclTax }
}
