import get from 'lodash-es/get'
import { BundleOptionsProductLink, SelectedBundleOption } from '@vue-storefront/core/modules/catalog/types/BundleOption';
import { getBundleOptionsValues, getDefaultBundleOptions } from '@vue-storefront/core/modules/catalog/helpers/bundleOptions';
import Product from '@vue-storefront/core/modules/catalog/types/Product';
import { ProductDiscountedPrice } from '@vue-storefront/core/modules/catalog';

function getBundleOptionDiscountedPrice (
  bundleOptionValues: BundleOptionsProductLink[],
  productDiscountedPrice: Record<string, ProductDiscountedPrice>
): ProductDiscountedPrice | undefined {
  let isDiscounted = false;

  const price = bundleOptionValues.map((optionValue) => {
    const product = optionValue.product;

    if (!product || !product.id) {
      return {
        regular: optionValue.price || 0,
        final: optionValue.price || 0
      };
    }

    const productPrice = productDiscountedPrice[product.id];

    if (productPrice) {
      isDiscounted = true;
    }

    return {
      final: productPrice?.final ||
        product.special_price_incl_tax ||
        product.priceInclTax ||
        product.price_incl_tax ||
        0,
      regular: productPrice?.regular ||
        product.priceInclTax ||
        product.price_incl_tax ||
        0
    };
  }).reduce((productPrice, totalPrice) => {
    return {
      regular: totalPrice.regular + productPrice.regular,
      final: totalPrice.final + productPrice.final
    }
  }, { regular: 0, final: 0 });

  if (!isDiscounted || !price) {
    return;
  }

  return price;
}

export function getBundleCartItemDiscountedPrice (
  product: Product,
  productDiscountedPrice: Record<string, ProductDiscountedPrice>
): ProductDiscountedPrice | undefined {
  const allBundleOptions = product.bundle_options || [];

  const selectedBundleOptions = Object.values(
    get(
      product,
      'product_option.extension_attributes.bundle_options',
      {}
    )
  );
  const bundleOptionsValues = getBundleOptionsValues(
    selectedBundleOptions as SelectedBundleOption[],
    allBundleOptions
  );

  return getBundleOptionDiscountedPrice(bundleOptionsValues, productDiscountedPrice);
}

export function getBundleProductDefaultDiscountedPrice (
  product: Product,
  productDiscountedPrice: Record<string, ProductDiscountedPrice>
): ProductDiscountedPrice | undefined {
  const allBundleOptions = product.bundle_options || [];

  const defaultBundleOptions = getDefaultBundleOptions(product);
  const bundleOptionsValues = getBundleOptionsValues(
    defaultBundleOptions as SelectedBundleOption[],
    allBundleOptions
  );

  return getBundleOptionDiscountedPrice(bundleOptionsValues, productDiscountedPrice);
}
