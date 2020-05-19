import Product from '@vue-storefront/core/modules/catalog/types/Product';

/**
 * set product quantity to 1
 */
export default function setDefaultQty (product: Product) {
  if (!product.qty) {
    product.qty = 1
  }
}
