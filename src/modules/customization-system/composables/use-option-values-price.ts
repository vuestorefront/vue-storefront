import { useStore } from '@vue-storefront/core/application-services';
import { Ref, computed } from 'vue';

import { PRODUCT_LOCALIZED_PRICE_DICTIONARY } from '@vue-storefront/core/modules/catalog';

import { PriceHelper } from 'src/modules/shared';

import { getOptionValuePrice } from '../helpers/get-option-value-price';
import { OptionValue } from '../types/option-value.interface';
import { Currency, GET_ACTIVE_CURRENCY } from 'src/modules/currency';
import { PRODUCTION_TIME_SELECTOR_STANDARD_OPTION_VALUE_ID } from '../types/production-time-selector-standard-option-value-id';

export function useOptionValuesPrice (
  values: Ref<OptionValue[]>,
  useLowestPriceAsDefault = false
) {
  const applicationStore = useStore();
  const optionValuePriceDictionary = computed<Record<string, PriceHelper.ProductPrice | undefined>>(
    () => {
      const dictionary: Record<string, PriceHelper.ProductPrice | undefined> = {};
      const productBySkuDictionary = applicationStore.getters['product/getProductBySkuDictionary'];
      const productPriceDictionary = applicationStore.getters[PRODUCT_LOCALIZED_PRICE_DICTIONARY];

      values.value.forEach((optionValue) => {
        if (optionValue.id === PRODUCTION_TIME_SELECTOR_STANDARD_OPTION_VALUE_ID) {
          dictionary[optionValue.id] = {
            regular: 0,
            special: null
          };
          return;
        }

        dictionary[optionValue.id] = getOptionValuePrice(
          optionValue,
          productBySkuDictionary,
          productPriceDictionary
        );
      });

      return dictionary;
    }
  );

  const defaultOptionValue = computed<OptionValue | undefined>(() => {
    const _values = values.value;
    const defaultValue = _values.find((value) => value.isDefault || value.id === PRODUCTION_TIME_SELECTOR_STANDARD_OPTION_VALUE_ID);

    if (defaultValue && !useLowestPriceAsDefault) {
      return defaultValue;
    }

    let valueWithLowestPrice: OptionValue | undefined;
    let lowestFinalPrice: number | undefined;
    const _optionValuePriceDictionary = optionValuePriceDictionary.value;

    for (const optionValue of _values) {
      const optionValuePrice = _optionValuePriceDictionary[optionValue.id];

      if (!optionValuePrice) {
        continue;
      }

      const optionValueFinalPrice = PriceHelper.getFinalPrice(optionValuePrice);

      if (lowestFinalPrice && optionValueFinalPrice > lowestFinalPrice) {
        continue;
      }

      valueWithLowestPrice = optionValue;
      lowestFinalPrice = optionValueFinalPrice;
    }

    return valueWithLowestPrice;
  });

  const defaultOptionValuePrice = computed<PriceHelper.ProductPrice | undefined>(() => {
    const _defaultOptionValue = defaultOptionValue.value;
    if (!_defaultOptionValue) {
      return;
    }

    return optionValuePriceDictionary.value[_defaultOptionValue.id];
  });

  const defaultOptionValueFinalPrice = computed<number | undefined>(() => {
    const _defaultOptionValuePrice = defaultOptionValuePrice.value;
    if (!_defaultOptionValuePrice) {
      return;
    }

    return PriceHelper.getFinalPrice(_defaultOptionValuePrice);
  });
  const optionValueFinalPriceDeltaDictionary = computed<Record<string, number | undefined>>(() => {
    const dictionary: Record<string, number | undefined> = {};
    const _defaultOptionValueFinalPrice = defaultOptionValueFinalPrice.value;

    if (_defaultOptionValueFinalPrice === undefined) {
      return dictionary;
    }

    const _optionValuePriceDictionary = optionValuePriceDictionary.value;

    for (const optionValueId of Object.keys(_optionValuePriceDictionary)) {
      const optionValuePrice = _optionValuePriceDictionary[optionValueId];

      if (!optionValuePrice) {
        continue;
      }

      const priceDelta: PriceHelper.ProductPrice = {
        regular: optionValuePrice.regular - _defaultOptionValueFinalPrice,
        special: optionValuePrice.special != null
          ? optionValuePrice.special - _defaultOptionValueFinalPrice
          : null
      };

      dictionary[optionValueId] = PriceHelper.getFinalPrice(priceDelta);
    }

    return dictionary;
  });

  const isOptionValuesSamePrice = computed<boolean>(() => {
    for (const finalPriceDelta of Object.values(optionValueFinalPriceDeltaDictionary.value)) {
      if (!finalPriceDelta) {
        continue;
      }

      if (finalPriceDelta !== 0) {
        return false;
      }
    }

    return true;
  });

  const selectedCurrency = computed<Currency>(() => {
    return applicationStore.getters[GET_ACTIVE_CURRENCY];
  });

  function isDefaultOptionValue (optionValue: OptionValue): boolean {
    const _defaultOptionValue = defaultOptionValue.value;
    return !!_defaultOptionValue && _defaultOptionValue.id === optionValue.id;
  }

  function formatPrice (value: number): string {
    return PriceHelper.formatPrice(value, selectedCurrency.value.symbol);
  }

  return {
    defaultOptionValue,
    defaultOptionValueFinalPrice,
    isDefaultOptionValue,
    isOptionValuesSamePrice,
    optionValuePriceDictionary,
    optionValueFinalPriceDeltaDictionary,
    formatPrice
  }
}
