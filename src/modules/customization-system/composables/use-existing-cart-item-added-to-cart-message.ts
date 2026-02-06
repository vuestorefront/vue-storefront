import { computed, ComputedRef } from '@vue/composition-api';

import { CustomizationOptionValue } from '../types/customization-option-value';
import { Customization } from '../types/customization.interface';
import { isFileUploadValue } from '../types/is-file-upload-value.typeguard';
import { CustomizationAddedToCartMessageConfig } from '../types/customization-added-to-cart-message-config.interface';

export function useExistingCartItemAddedToCartMessage (
  availableCustomizations: ComputedRef<Customization[]>,
  existingCartItemCustomizationOptionValue: ComputedRef<Record<string, CustomizationOptionValue>>,
  message: string
) {
  const addedToCartMessageConfigByCustomizationId: ComputedRef<Record<string, CustomizationAddedToCartMessageConfig>> = computed(() => {
    const result: Record<string, CustomizationAddedToCartMessageConfig> = {};
    const cartItemValueByCustomizationId = existingCartItemCustomizationOptionValue.value;

    for (const customization of availableCustomizations.value) {
      result[customization.id] = {
        isCustomizationAlreadyInCart: false,
        message,
        optionValueIdsAlreadyInCart: []
      };

      const customizationOptionValue = cartItemValueByCustomizationId[customization.id];
      if (!customizationOptionValue || isFileUploadValue(customizationOptionValue)) {
        continue;
      }

      if (Array.isArray(customizationOptionValue)) {
        result[customization.id].optionValueIdsAlreadyInCart = customizationOptionValue;
        continue;
      }

      result[customization.id].isCustomizationAlreadyInCart = !!customizationOptionValue;
    }

    return result;
  });

  return {
    addedToCartMessageConfigByCustomizationId
  };
}
