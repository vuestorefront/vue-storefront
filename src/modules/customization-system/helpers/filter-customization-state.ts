import { CustomizationStateItem } from '../types/customization-state-item.interface';
import { isFileUploadValue } from '../types/is-file-upload-value.typeguard';
import { PRODUCTION_TIME_SELECTOR_STANDARD_OPTION_VALUE_ID } from '../types/production-time-selector-standard-option-value-id';

const valuesForFilter = [PRODUCTION_TIME_SELECTOR_STANDARD_OPTION_VALUE_ID];

export function filterCustomizationState (customizationState: CustomizationStateItem[]): CustomizationStateItem[] {
  const filteredState: CustomizationStateItem[] = [];

  for (const stateItem of customizationState) {
    const itemToAdd = { ...stateItem };

    if (itemToAdd.qty && itemToAdd.qty === 1) {
      delete itemToAdd.qty;
    }

    if (isFileUploadValue(itemToAdd.value)) {
      filteredState.push(itemToAdd);
      continue;
    }

    if (
      !Array.isArray(itemToAdd.value) &&
      !valuesForFilter.includes(itemToAdd.value)
    ) {
      filteredState.push(itemToAdd);
      continue;
    }

    if (Array.isArray(itemToAdd.value)) {
      const filteredValues = itemToAdd.value.filter((value) => {
        return !valuesForFilter.includes(value);
      });

      const data: CustomizationStateItem = {
        customization_id: stateItem.customization_id,
        value: filteredValues
      }

      if (stateItem.qty && stateItem.qty !== 1) {
        data.qty = stateItem.qty;
      }

      filteredState.push(data);
    }
  }

  return filteredState;
}
