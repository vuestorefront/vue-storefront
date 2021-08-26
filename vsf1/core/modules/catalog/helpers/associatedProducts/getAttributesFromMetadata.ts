import config from 'config'
import Product from '@vue-storefront/core/modules/catalog/types/Product'

/**
 * Set associated attributes by meta data of product links
 */
export default async function getAttributesFromMetadata (context: any, products: Product[]) {
  if (config.entities.attribute.loadByAttributeMetadata) {
    context.dispatch('attribute/loadProductAttributes', { products, merge: true }, { root: true })
  }
}
