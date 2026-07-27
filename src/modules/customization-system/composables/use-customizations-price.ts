import { useStore } from '@vue-storefront/core/application-services';
import { Ref, computed } from 'vue';

import { PriceHelper } from 'src/modules/shared';
import { PRODUCT_LOCALIZED_PRICE_DICTIONARY } from '@vue-storefront/core/modules/catalog';

import { Customization, CustomizationOptionValue } from '..';
import { getLowestPriceForOptionValues } from '../helpers/get-lowest-price-for-option-values';
import { getCustomizationSelectedValues } from '../helpers/get-customization-selected-values';
import { getOptionValuePrice } from '../helpers/get-option-value-price';

export function useCustomizationsPrice (
  customizations: Ref<Customization[]>,
  customizationOptionValue: Ref<Record<string, CustomizationOptionValue>>
) {
  const applicationStore = useStore();
  const customizationOptionValuesLowestPrice = computed<Record<string, PriceHelper.ProductPrice | undefined>>(
    () => {
      const dictionary: Record<string, PriceHelper.ProductPrice | undefined> = {};
      const productBySkuDictionary = applicationStore.getters['product/getProductBySkuDictionary'];
      const productPriceDictionary = applicationStore.getters[PRODUCT_LOCALIZED_PRICE_DICTIONARY];

      customizations.value.forEach((customization) => {
        if (!customization.optionData?.values) {
          return;
        }

        dictionary[customization.id] = getLowestPriceForOptionValues(
          customization.optionData.values,
          productBySkuDictionary,
          productPriceDictionary
        );
      });

      return dictionary;
    }
  );

  const totalPrice = computed<PriceHelper.ProductPrice>(() => {
    const productBySkuDictionary = applicationStore.getters['product/getProductBySkuDictionary'];
    const productPriceDictionary = applicationStore.getters[PRODUCT_LOCALIZED_PRICE_DICTIONARY];
    const selectedOptionValuesPrices: PriceHelper.ProductPrice[] = [];
    const _customizationOptionValuesLowestPrice = customizationOptionValuesLowestPrice.value;

    customizations.value.forEach((customization) => {
      if (!customization.optionData) {
        return;
      }

      if (!customization.optionData.values?.length) {
        return;
      }
      const selectedValues = getCustomizationSelectedValues(
        customization,
        customizationOptionValue.value[customization.id]
      );
      const hasSelections = !!selectedValues && selectedValues.length;

      if (!hasSelections && !customization.optionData.isRequired) {
        return;
      }

      if (!hasSelections) {
        const lowestPrice = _customizationOptionValuesLowestPrice[customization.id];

        if (lowestPrice) {
          selectedOptionValuesPrices.push(lowestPrice);
        }
      }

      if (!selectedValues) {
        return;
      }

      selectedValues.forEach((value) => {
        const price = getOptionValuePrice(
          value,
          productBySkuDictionary,
          productPriceDictionary
        );

        if (price) {
          selectedOptionValuesPrices.push(price);
        }
      });
    });

    return PriceHelper.getTotalPriceForProductPrices(selectedOptionValuesPrices);
  });

  return {
    totalPrice
  };
}
