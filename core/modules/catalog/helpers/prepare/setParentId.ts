import Product from '@vue-storefront/core/modules/catalog/types/Product';

/**
 * set parent id, this is needed, because in configuration process we will override id by configurable_children.id
 */
export default function setParentId (product: Product) {
  if (!product.parentId) {
    product.parentId = product.id
  }
}
