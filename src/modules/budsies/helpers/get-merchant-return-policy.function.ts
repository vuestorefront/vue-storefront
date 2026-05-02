import Product from '@vue-storefront/core/modules/catalog/types/Product';

import { FOREVERS_BUNDLE_SKUS } from 'src/modules/shared/types/forevers-product-skus';
import { GOLF_HEAD_COVERS_BUNDLE_SKUS } from 'src/modules/shared/types/golf-head-covers-product-skus';

const THIRTY_DAY_RETURN_COHORT_SKUS = new Set([
  ...FOREVERS_BUNDLE_SKUS,
  ...GOLF_HEAD_COVERS_BUNDLE_SKUS
]);

const DEFAULT_RETURN_POLICY = {
  '@type': 'MerchantReturnPolicy',
  returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
  itemDefectReturnFees: 'https://schema.org/FreeReturn'
};

const THIRTY_DAY_RETURN_POLICY = {
  '@type': 'MerchantReturnPolicy',
  returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
  merchantReturnDays: 30,
  returnMethod: 'https://schema.org/ReturnByMail',
  returnFees: 'https://schema.org/FreeReturn'
};

export function getMerchantReturnPolicy (product: Product): object {
  if (THIRTY_DAY_RETURN_COHORT_SKUS.has(product.sku)) {
    return THIRTY_DAY_RETURN_POLICY;
  }

  return DEFAULT_RETURN_POLICY;
}
