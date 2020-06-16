import Product from '@vue-storefront/core/modules/catalog/types/Product'

/**
 * Set associated attributes by meta data of product links
 */
export default async function setAttributesMetaFromProducts (context: any, products: Product[]) {
  context.dispatch('attribute/loadProductAttributes', { products, merge: true }, { root: true })
}
