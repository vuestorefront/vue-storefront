/**
 * set parent sku, this is needed, because in configuration process we will override sku by configurable_children.sku
 */
export default function setParentSku (product) {
  if (!product.parentSku) {
    product.parentSku = product.sku
  }
}
