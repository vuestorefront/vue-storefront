import Product from '@vue-storefront/core/modules/catalog/types/Product';
import { PriceHelper } from 'src/modules/shared';

import { OptionValue } from '../types/option-value.interface';

export function getOptionValuePrice (
  optionValue: OptionValue,
  productBySkuDictionary: Record<string, Product>
): PriceHelper.ProductPrice | undefined {
  const defaultOptionValuePrice = optionValue.price
    ? {
      regular: optionValue.price,
      special: null
    }
    : {
      regular: 0,
      special: null
    }

  if (!optionValue.sku) {
    return defaultOptionValuePrice;
  }

  const product = productBySkuDictionary[optionValue.sku];

  if (!product) {
    return defaultOptionValuePrice;
  }

  const price = PriceHelper.getProductDefaultPrice(product, {}, false);

  if (!price.regular) {
    return defaultOptionValuePrice;
  }

  return price;
}
