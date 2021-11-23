import get from 'lodash-es/get'
import { Store } from 'vuex'
import { BundleOptionsProductLink, SelectedBundleOption } from '@vue-storefront/core/modules/catalog/types/BundleOption';
import { getBundleOptionsValues } from '@vue-storefront/core/modules/catalog/helpers/bundleOptions';
import Product from '@vue-storefront/core/modules/catalog/types/Product';
import RootState from '@vue-storefront/core/types/RootState'

export default function getBundleProductDiscountPrice (product: Product, store: Store<RootState>): number | undefined {
  const allBundleOptions = product.bundle_options || [];

  const selectedBundleOptions = Object.values(get(product, 'product_option.extension_attributes.bundle_options', {}));
  const bundleOptionsValues = getBundleOptionsValues(selectedBundleOptions as SelectedBundleOption[], allBundleOptions);

  return getBundleOptionDiscountPrice(bundleOptionsValues, store);
}

function getBundleOptionDiscountPrice (bundleOptionValues: BundleOptionsProductLink[], store: Store<RootState>): number | undefined {
  let isDiscounted = false;

  const price = bundleOptionValues.map((optionValue) => {
    const product = optionValue.product;

    if (!product) {
      return optionValue.price || 0;
    }

    const productPrice = store.getters['promotionPlatform/getProductCampaignDiscountPrice'](product);

    if (productPrice) {
      isDiscounted = true;
    }

    return productPrice || product.special_price_incl_tax || product.priceInclTax || product.price_incl_tax || 0;
  }).reduce((productPrice, totalPrice) => (totalPrice + productPrice), 0);

  if (!isDiscounted || !price) {
    return;
  }

  return price;
}
