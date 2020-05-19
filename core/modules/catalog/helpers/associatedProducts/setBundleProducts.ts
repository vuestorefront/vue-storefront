import Product from '@vue-storefront/core/modules/catalog/types/Product';
import { isBundleProduct } from './..';
import buildQuery from './buildQuery'
import setProductLink from './setProductLink'
import { ProductService } from '@vue-storefront/core/data-resolver/ProductService'

/**
 * This function prepare all product_links for bundle products.
 * It fetches products by sku.
 */
export default async function setBundleProducts (product: Product, { includeFields = null, excludeFields = null } = {}) {
  if (isBundleProduct(product) && product.bundle_options) {
    const skus = product.bundle_options
      .map((bundleOption) => bundleOption.product_links.map((productLink) => productLink.sku))
      .reduce((acc, next) => acc.concat(next), [])

    const query = buildQuery(skus)
    const { items } = await ProductService.getProducts({
      query,
      excludeFields,
      includeFields,
      options: {
        prefetchGroupProducts: false,
        fallbackToDefaultWhenNoAvailable: false,
        setProductErrors: false,
        setConfigurableProductOptions: false,
        assignProductConfiguration: false,
        separateSelectedVariant: false
      }
    })

    for (const bundleOption of product.bundle_options) {
      for (const productLink of bundleOption.product_links) {
        const associatedProduct = items.find((associatedProduct) => associatedProduct.sku === productLink.sku)
        setProductLink(productLink, associatedProduct)
      }
    }
  }
}
