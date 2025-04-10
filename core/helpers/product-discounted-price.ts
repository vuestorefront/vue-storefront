import { isBundleProduct } from '@vue-storefront/core/modules/catalog/helpers';
import Product from '@vue-storefront/core/modules/catalog/types/Product';

import * as BundleProductDiscountedPrice from './bundle-product-discounted-price';

function getDiscountedPrice (
  product: Product,
  productDiscount: Record<string, number>,
  bundlePriceCalculationFunction: (
    product: Product,
    productDiscount: Record<string, number>
  ) => (number | undefined)
): number | undefined {
  if (
    isBundleProduct(product)
  ) {
    return bundlePriceCalculationFunction(
      product,
      productDiscount
    );
  }

  if (!product.id) {
    return;
  }

  return productDiscount[product.id];
}

export function getProductDiscountedPrice (
  product: Product,
  productDiscountedPrice: Record<string, number>
): number | undefined {
  return getDiscountedPrice(
    product,
    productDiscountedPrice,
    BundleProductDiscountedPrice.getBundleProductDefaultDiscountedPrice
  );
}

export function getCartItemDiscountedPrice (
  product: Product,
  productDiscountedPrice: Record<string, number>
): number | undefined {
  return getDiscountedPrice(
    product,
    productDiscountedPrice,
    BundleProductDiscountedPrice.getBundleCartItemDiscountedPrice
  );
}
