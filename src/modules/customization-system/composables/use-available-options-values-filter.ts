import { computed, ComputedRef, Ref } from '@vue/composition-api';

import { OptionValue } from 'src/modules/customization-system';

export function useAvailableOptionsValuesFilter (
  customizationAvailableOptionValues: Ref<Record<string, OptionValue[]>>,
  filters: ((customizationId: string, optionValue: OptionValue) => boolean)[]
) {
  const filteredOptionValues: ComputedRef<Record<string, OptionValue[]>> = computed<Record<string, OptionValue[]>>(() => {
    const optionValues: Record<string, OptionValue[]> = {};
    const _customizationAvailableOptionValues = customizationAvailableOptionValues.value;

    for (const customizationId of Object.keys(_customizationAvailableOptionValues)) {
      const availableOptionValues = _customizationAvailableOptionValues[customizationId];
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
