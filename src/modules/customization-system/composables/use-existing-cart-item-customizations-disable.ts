import { computed, ComputedRef } from '@vue/composition-api';

import { CustomizationOptionValue } from '../types/customization-option-value';
import { Customization } from '../types/customization.interface';
import { isFileUploadValue } from '../types/is-file-upload-value.typeguard';

export interface CustomizationDisableConfig {
  isDisabled: boolean,
  message: string,
  disabledOptionValuesIds: string[]
}

export function useExistingCartItemCustomizationsDisable (
  availableCustomizations: ComputedRef<Customization[]>,
  existingCartItemCustomizationOptionValue: ComputedRef<Record<string, CustomizationOptionValue>>,
  disabledMessage: string
) {
  const customizationDisableConfigById: ComputedRef<Record<string, CustomizationDisableConfig>> = computed(() => {
    const result: Record<string, CustomizationDisableConfig> = {};
    const _existingCartItemCustomizationOptionValue = existingCartItemCustomizationOptionValue.value;

    for (const customization of availableCustomizations.value) {
      result[customization.id] = {
        isDisabled: false,
        message: disabledMessage,
        disabledOptionValuesIds: []
      };

      const customizationOptionValue = _existingCartItemCustomizationOptionValue[customization.id];
      if (!customizationOptionValue || isFileUploadValue(customizationOptionValue)) {
        continue;
      }

      if (Array.isArray(customizationOptionValue)) {
        result[customization.id].disabledOptionValuesIds = customizationOptionValue;
        continue;
      }

      result[customization.id].isDisabled = !!customizationOptionValue;
    }

    return result;
  });

  return {
    customizationDisableConfigById
  }
}
