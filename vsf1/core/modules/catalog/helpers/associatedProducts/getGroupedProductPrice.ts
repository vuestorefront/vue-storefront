import Product, { ProductLink } from '@vue-storefront/core/modules/catalog/types/Product';
import { getProductLinkPrice } from './getProductLinkPrice';

export default function getGroupedProductPrice (product: Product) {
  const productLinks: ProductLink[] = (product.product_links || [])

  return getProductLinkPrice(productLinks)
}
