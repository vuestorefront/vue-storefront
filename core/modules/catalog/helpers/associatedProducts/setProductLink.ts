import Product, { ProductLink } from '@vue-storefront/core/modules/catalog/types/Product';
import { preConfigureProduct } from '../prepare';
import { Logger } from '@vue-storefront/core/lib/logger';
import { BundleOptionsProductLink } from '@vue-storefront/core/modules/catalog/types/BundleOption';

/**
 * Set associated product to product link object
 */

export default async function setProductLink (productLink: BundleOptionsProductLink | ProductLink, associatedProduct: Product) {
  if (associatedProduct) {
    productLink.product = preConfigureProduct(associatedProduct)
    productLink.product.qty = Number((productLink as BundleOptionsProductLink).qty || '1')
  } else {
    Logger.error('Product not found', (productLink as ProductLink).linked_product_sku || productLink.sku)()
  }
}
