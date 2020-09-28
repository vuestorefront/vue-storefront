import Product from '@vue-storefront/core/modules/catalog/types/Product'
import buildQuery from './buildQuery'
import setProductLink from './setProductLink'
import getGroupedProductPrice from './getGroupedProductPrice'
import { isGroupedProduct } from './..'
import { ProductService } from '@vue-storefront/core/data-resolver/ProductService'
import { catalogHooksExecutors } from './../../hooks'

/**
 * This function prepare all product_links for grouped products.
 * It fetches products by sku.
 */
export default async function setGroupedProduct (product: Product, { includeFields = null, excludeFields = null } = {}) {
  if (isGroupedProduct(product) && product.product_links) {
    const productLinks = product.product_links.filter((productLink) => productLink.link_type === 'associated' && productLink.linked_product_type === 'simple')
    const skus = productLinks.map((productLink) => productLink.linked_product_sku)

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

    catalogHooksExecutors.afterSetGroupedProduct(items)

    for (const productLink of productLinks) {
      const associatedProduct = items.find((associatedProduct) => associatedProduct.sku === productLink.linked_product_sku)
      setProductLink(productLink, associatedProduct)
    }

    const { price, priceInclTax } = getGroupedProductPrice(product)
    product.price = price
    product.priceInclTax = priceInclTax
    product.price_incl_tax = priceInclTax
  }
}
