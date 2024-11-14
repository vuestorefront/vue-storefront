import { Ref, watch } from '@vue/composition-api';
import { canSelectMultipleOptionValues } from '../helpers/can-select-multiple-option-values';

import { getDefaultValue } from '../helpers/get-default-option-value';
import { CustomizationOptionValue } from '../types/customization-option-value';
import { Customization } from '../types/customization.interface';
import { isFileUploadValue } from '../types/is-file-upload-value.typeguard';
import { OptionValue } from '../types/option-value.interface';

export function useCustomizationsOptionsDefaultValue (
  availableCustomizations: Ref<Customization[]>,
  customizationAvailableOptionValues: Ref<Record<string, OptionValue[]>>,
  customizationOptionValue: Ref<Record<string, CustomizationOptionValue>>,
  updateCustomizationOptionValue: (payload: {
    customizationId: string,
    value: CustomizationOptionValue
  }) => void
) {
  function setDefaultValues (): void {
    for (const customization of availableCustomizations.value) {
      const selectedOptionValue = customizationOptionValue.value[customization.id];
      const optionValues = customizationAvailableOptionValues.value[customization.id];

      if (!optionValues || isFileUploadValue(selectedOptionValue)) {
        continue;
      }

      const defaultValue = getDefaultValue(
        optionValues,
        selectedOptionValue,
        canSelectMultipleOptionValues(customization),
        !!customization.optionData?.isRequired
      );

      if (!defaultValue) {
        continue;
      }

      updateCustomizationOptionValue({
        customizationId: customization.id,
        value: defaultValue
      });
    }
  }

  watch(
    customizationAvailableOptionValues,
    setDefaultValues,
    {
      immediate: true
    }
  );

  return {
    setDefaultValues
  }
}
