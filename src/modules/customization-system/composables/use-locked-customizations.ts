import { computed, Ref } from '@vue/composition-api';

import { Customization, CustomizationOptionValue, isFileUploadValue, OptionValue } from 'src/modules/customization-system';
import { CustomizableProductFlowType } from 'src/modules/customization-system/types/customizable-product-flow.type';

export function useLockedCustomizations (
  customizationOptionValueDictionary: Ref<Record<string, CustomizationOptionValue>>,
  customizations: Ref<Customization[]>,
  flow: Ref<CustomizableProductFlowType>
) {
  const lockedCustomizationDictionary = computed<Record<string, Customization>>(() => {
    const set: Record<string, Customization> = {};

    for (const customization of customizations.value) {
      if (!customization.isLocked) {
        continue;
      }

      set[customization.id] = customization;
    }

    return set;
  });

  const lockedCustomizations = computed<Customization[]>(() => {
    return Object.values(lockedCustomizationDictionary.value);
  });

  const selectedLockedCustomizations = computed<Customization[]>(() => {
    return lockedCustomizations.value.filter((customization) => {
      const selectedOptions = customizationOptionValueDictionary.value[customization.id];

      if (Array.isArray(selectedOptions)) {
        return selectedOptions.length > 0;
      }

      return !!selectedOptions;
    });
  });

  function customizationsFilter (customization: Customization): boolean {
    if (flow.value !== CustomizableProductFlowType.CUSTOMIZE) {
      return true;
    }

    return !lockedCustomizationDictionary.value[customization.id];
  }

  function optionValuesFilter (customizationId: string, optionValue: OptionValue): boolean {
    const _lockedCustomizationDictionary = lockedCustomizationDictionary.value;

    if (!_lockedCustomizationDictionary[customizationId]) {
      return true;
    }

    const selectedOptionValue = customizationOptionValueDictionary.value[customizationId];

    if (isFileUploadValue(selectedOptionValue)) {
      return true;
    }

    if (Array.isArray(selectedOptionValue)) {
      return selectedOptionValue.includes(optionValue.id);
    }

    return optionValue.id === selectedOptionValue;
  }

  return {
    selectedLockedCustomizations,
    customizationsFilter,
    optionValuesFilter
  };
}
