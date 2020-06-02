import Product from '@vue-storefront/core/modules/catalog/types/Product';
/**
 * Default object that are used in vsf
 */
export default function setDefaultObjects (product: Product) {
  product.errors = {}; // this is an object to store validation result for custom options and others
  product.info = {};
}
