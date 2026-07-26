import { ComputedRef } from 'vue';

import { getCustomizationIdByOptionValueId } from '../helpers/get-customization-id-by-option-value-id';
import { getCustomizationSelectedValues } from '../helpers/get-customization-selected-values';
import { CustomizationOptionValue } from '../types/customization-option-value';

import { Customization } from '../types/customization.interface';
import { OptionValue } from '../types/option-value.interface';

export function useOptionValueActions (
  productCustomizations: ComputedRef<Customization[]>,
  productCustomization: ComputedRef<Record<string, Customization>>,
  customizationAvailableOptionValues: ComputedRef<Record<string, OptionValue[]>>,
  updateCustomizationOptionValue: (
    payload: {
      customizationId: string,
      value: CustomizationOptionValue
    }
  ) => void,
  removeCustomizationOptionValue: (optionValueId: string) => void,
  addCustomizationOptionValue: (customizationId: string, optionValueId: string) => void
) {
  function deactivateOptionIds (ids?: string[]) {
    if (!ids) {
      return;
    }

    for (const id of ids) {
      updateCustomizationOptionValue({ customizationId: id, value: undefined });
    }
  }

  function deactivateOptionValues (ids?: string[]) {
    if (!ids) {
      return;
    }

    for (const id of ids) {
      removeCustomizationOptionValue(id)
    }
  }

  function activateOptionValues (ids?: string[]) {
    if (!ids) {
      return;
    }

    for (const id of ids) {
      const customizationId = getCustomizationIdByOptionValueId(productCustomizations.value, id);

      if (!customizationId) {
        continue;
      }

      const availableOptionValues = customizationAvailableOptionValues.value[customizationId];

      if (!availableOptionValues) {
        continue;
      }

      if (!availableOptionValues.find((optionValue) => optionValue.id === id)) {
        return;
      }

      addCustomizationOptionValue(customizationId, id);
    }
  }

  function executeActionsByCustomizationIdAndCustomizationOptionValue (
    {
      customizationId,
      value
    }: {
      customizationId: string,
      value: CustomizationOptionValue
    }
  ) {
    const relatedCustomization = productCustomization.value[customizationId];

    if (!relatedCustomization) {
      return;
    }

    const selectedOptionValues = getCustomizationSelectedValues(relatedCustomization, value);

    if (!selectedOptionValues) {
      return;
    }

    for (const selectedOptionValue of selectedOptionValues) {
      if (!selectedOptionValue.actions || !selectedOptionValue.actions.activated) {
        continue;
      }

      deactivateOptionIds(selectedOptionValue.actions.activated.deactivateOptionIds);
      deactivateOptionValues(selectedOptionValue.actions.activated.deactivateOptionValueIds);
      activateOptionValues(selectedOptionValue.actions.activated.activateOptionValueIds);
    }
  }

  return {
    executeActionsByCustomizationIdAndCustomizationOptionValue
  }
}
