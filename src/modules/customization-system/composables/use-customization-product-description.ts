import { computed, Ref } from 'vue';

import Product from 'core/modules/catalog/types/Product';

import { getCustomizationSelectedValues } from '../helpers/get-customization-selected-values';
import { CustomizationOptionValue } from '../types/customization-option-value';
import { Customization } from '../types/customization.interface';

export function useCustomizationProductDescription (
  product: Ref<Product>,
  customizations: Ref<Customization[]>,
  customizationOptionValue: Ref<Record<string, CustomizationOptionValue>>
) {
  const descriptionProductSku = computed<string>(() => {
    for (const customization of customizations.value) {
      if (!customization.optionData?.hasDetailedDescription) {
        continue;
      }

      const selectedValues = getCustomizationSelectedValues(
        customization,
        customizationOptionValue.value[customization.id]
      );

      if (!selectedValues?.length) {
        continue;
      }

      const selectedValue = selectedValues[0];

      if (!selectedValue.sku) {
        continue;
      }

      return selectedValue.sku;
    }

    return product.value.sku;
  });

  return {
    descriptionProductSku
  }
}
