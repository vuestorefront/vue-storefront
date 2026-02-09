import { computed, ComputedRef } from '@vue/composition-api';

import { CustomizationOptionValue } from '../types/customization-option-value';
import { Customization } from '../types/customization.interface';
import { isFileUploadValue } from '../types/is-file-upload-value.typeguard';

export function useExistingCartItemOptionValues (
  availableCustomizations: ComputedRef<Customization[]>,
  existingCartItemCustomizationOptionValue: ComputedRef<Record<string, CustomizationOptionValue>>
) {
  const addedToCartOptionValueId: ComputedRef<Record<string, Record<string, boolean>>> = computed(() => {
    const result: Record<string, Record<string, boolean>> = {};
    const cartItemValueByCustomizationId = existingCartItemCustomizationOptionValue.value;

    for (const customization of availableCustomizations.value) {
      result[customization.id] = {};

      const customizationOptionValue = cartItemValueByCustomizationId[customization.id];
      if (!customizationOptionValue || isFileUploadValue(customizationOptionValue)) {
        continue;
      }

      if (Array.isArray(customizationOptionValue)) {
        for (const optionValue of customizationOptionValue) {
          result[customization.id][optionValue] = true;
        }
        continue;
      }

      result[customization.id][customizationOptionValue] = true;
    }

    return result;
  });

  return {
    addedToCartOptionValueId
  };
}
