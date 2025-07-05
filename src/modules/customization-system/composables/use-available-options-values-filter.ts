import { computed, Ref } from '@vue/composition-api';

import { OptionValue } from 'src/modules/customization-system';

export function useAvailableOptionsValuesFilter (
  customizationAvailableOptionValues: Ref<Record<string, OptionValue[]>>,
  filters: ((customizationId: string, optionValue: OptionValue) => boolean)[]
) {
  const filteredOptionValues = computed<Record<string, OptionValue[]>>(() => {
    const optionValues: Record<string, OptionValue[]> = {};

    for (const customizationId of Object.keys(customizationAvailableOptionValues.value)) {
      const availableOptionValues = customizationAvailableOptionValues.value[customizationId];
      optionValues[customizationId] = [];

      for (const optionValue of availableOptionValues) {
        let shouldFilter = false;

        for (const filter of filters) {
          if (!filter(customizationId, optionValue)) {
            shouldFilter = true;
            break;
          }
        }

        if (!shouldFilter) {
          optionValues[customizationId].push(optionValue);
        }
      }
    }

    return optionValues;
  });

  return {
    filteredOptionValues
  };
}
