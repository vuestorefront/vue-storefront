import { Ref, computed } from '@vue/composition-api';

import { OptionValue } from '..';

export function useValuesSort (values: Ref<OptionValue[]>) {
  const sortedValues = computed<OptionValue[]>(() => {
    return [...values.value].sort((a, b) => {
      if (a.sn !== b.sn) {
        return a.sn - b.sn;
      }

      return a.id.localeCompare(b.id);
    })
  });

  return { sortedValues }
}
