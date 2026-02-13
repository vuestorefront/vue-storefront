import { AvailabilityRules } from '../types/availability-rules.interface';

export function isItemAvailable (
  itemWithAvailabilityRules: {
    availabilityRules?: AvailabilityRules | undefined
  },
  selectedOptionValuesIds: string[],
  extraSelectedOptionValueIds: string[] = []
) {
  const forActivatedOptionValueIds = itemWithAvailabilityRules.availabilityRules?.forActivatedOptionValueIds;

  if (
    !forActivatedOptionValueIds ||
    !forActivatedOptionValueIds.length
  ) {
    return true;
  }

  const selectedOptionValueIdsSet = new Set(selectedOptionValuesIds);
  const extraSelectedOptionValueIdsSet = new Set(extraSelectedOptionValueIds);

  return forActivatedOptionValueIds.some((id) => {
    return selectedOptionValueIdsSet.has(id) || extraSelectedOptionValueIdsSet.has(id);
  });
}
