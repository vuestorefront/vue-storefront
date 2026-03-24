import { computed, Ref } from '@vue/composition-api';

import { Customization, CustomizationOptionValue, isFileUploadValue, OptionValue } from 'src/modules/customization-system';
import { ProductCustomizationMode } from 'src/modules/customization-system/types/customizable-product-flow.type';

export enum FilterType {
  ALL = 'all',
  UNSELECTED = 'unselected'
}

export function useLockedCustomizations (
  customizationOptionValueDictionary: Ref<Record<string, CustomizationOptionValue>>,
  customizations: Ref<Customization[]>,
  customizationMode: Ref<ProductCustomizationMode>,
  filterType: FilterType = FilterType.ALL
) {
  const lockedCustomizationDictionary = computed<Record<string, Customization>>(() => {
    const set: Record<string, Customization> = {};

    if (customizationMode.value !== ProductCustomizationMode.CUSTOMIZE) {
      return set;
    }

    for (const customization of customizations.value) {
      if (customization.isHidden || !customization.isLocked) {
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

  const selectedLockedCustomizationDictionary = computed<Record<string, Customization>>(() => {
    const dictionary: Record<string, Customization> = {};

    for (const customization of selectedLockedCustomizations.value) {
      dictionary[customization.id] = customization;
    }

    return dictionary;
  });

  function customizationsFilter (customization: Customization): boolean {
    if (customizationMode.value !== ProductCustomizationMode.CUSTOMIZE) {
      return true;
    }

    if (filterType === FilterType.ALL) {
      return !lockedCustomizationDictionary.value[customization.id];
    }

    return !!selectedLockedCustomizationDictionary.value[customization.id] || !lockedCustomizationDictionary.value[customization.id];
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
    optionValuesFilter,
    lockedCustomizationDictionary
  };
}
