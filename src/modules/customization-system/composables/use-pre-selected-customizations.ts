import { computed, Ref } from '@vue/composition-api';

import { Customization, CustomizationOptionValue, CustomizationStateItem, OptionValue } from 'src/modules/customization-system';
import { CustomizableProductFlowType } from 'src/modules/customization-system/types/customizable-product-flow.type';

export function usePreSelectedCustomizations (
  initialCustomizationState: Ref<CustomizationStateItem[]>,
  customizations: Ref<Customization[]>,
  flow: Ref<CustomizableProductFlowType>,
  updateCustomizationOptionValue: (payload: {
    customizationId: string,
    value: CustomizationOptionValue
  }) => void

) {
  const preSelectedCustomization = computed<Record<string, CustomizationOptionValue>>(() => {
    const set: Record<string, CustomizationOptionValue> = {}

    initialCustomizationState.value.forEach((item) => {
      set[item.customization_id] = item.value;
    });

    return set;
  });

  const preSelectedCustomizations = computed<Customization[]>(() => {
    if (!initialCustomizationState.value.length) {
      return [];
    }

    const _preSelectedCustomization = preSelectedCustomization.value;

    return customizations.value.filter((customization) => {
      return _preSelectedCustomization[customization.id];
    });
  });

  function fillInitialCustomizationState (): void {
    for (const initialCustomizationStateItem of initialCustomizationState.value) {
      updateCustomizationOptionValue({
        customizationId: initialCustomizationStateItem.customization_id,
        value: initialCustomizationStateItem.value
      });
    }
  }

  function customizationsFilter (customization: Customization): boolean {
    if (flow.value !== CustomizableProductFlowType.CUSTOMIZE) {
      return true;
    }

    return !preSelectedCustomization.value[customization.id];
  }

  function optionValuesFilter (customizationId: string, optionValue: OptionValue): boolean {
    const _preSelectedCustomization = preSelectedCustomization.value;

    if (!_preSelectedCustomization[customizationId]) {
      return true;
    }

    return optionValue.id === _preSelectedCustomization[customizationId];
  }

  fillInitialCustomizationState();

  return {
    preSelectedCustomizations,
    customizationsFilter,
    optionValuesFilter
  };
}
