import { Ref, ComputedRef, computed, watch } from '@vue/composition-api';

import { Customization, CustomizationOptionValue, isFileUploadValue, OptionValue } from '..';
import { isItemAvailable } from '../helpers/is-item-available';
import { CustomizationType } from '../types/customization-type';
import { WidgetType } from '../types/widget-type';

const ignoreAvailableOptionsCheckFor = [
  WidgetType.CHECKBOX,
  WidgetType.SEARCH_FIELD,
  WidgetType.EMAIL_INPUT,
  WidgetType.IMAGE_UPLOAD,
  WidgetType.TEXT_AREA,
  WidgetType.TEXT_INPUT
];

export function useAvailableCustomizations (
  customizations: Ref<Customization[]>,
  selectedOptionValuesIds: ComputedRef<string[]>,
  customizationOptionValue: Ref<Record<string, CustomizationOptionValue>>,
  updateCustomizationOptionValue: (payload: { customizationId: string, value: CustomizationOptionValue }) => void
) {
  const customizationAvailableOptionValues = computed<Record<string, OptionValue[]>>(
    () => {
      const dictionary: Record<string, OptionValue[]> = {};
      const _selectedOptionValuesIds = selectedOptionValuesIds.value;

      for (const customization of customizations.value) {
        dictionary[customization.id] =
          customization.optionData?.values?.filter(
            (value) => {
              if (!value.isEnabled) {
                return false;
              }

              return isItemAvailable(
                value,
                _selectedOptionValuesIds
              );
            }
          ) || [];
      }

      return dictionary;
    }
  );
  const availableOptionValues = computed<OptionValue[]>(() => {
    const optionValues: OptionValue[] = [];

    for (const values of Object.values(customizationAvailableOptionValues.value)) {
      optionValues.push(...values);
    }

    return optionValues;
  });

  const availableOptionValuesIds = computed<string>(() => {
    let ids = '';

    for (const availableOptionValues of Object.values(customizationAvailableOptionValues.value)) {
      for (const optionValue of availableOptionValues) {
        ids += optionValue.id;
      }
    }

    return ids;
  });

  const availableCustomizations = computed<Customization[]>(() => {
    const filteredCustomizations: Customization[] = customizations.value.filter(
      (customization: Customization) => {
        if (!customization.isEnabled) {
          return false;
        }

        const hasAvailableOptionValues =
          customizationAvailableOptionValues.value[customization.id].length > 0 ||
          !customization.optionData ||
          ignoreAvailableOptionsCheckFor.includes(customization.optionData.displayWidget);

        return isItemAvailable(customization, selectedOptionValuesIds.value) &&
          hasAvailableOptionValues;
      }
    );

    return filteredCustomizations.sort((a, b) => {
      return a.sn > b.sn ? 1 : -1;
    });
  });
  // TODO rename to make it more obvious
  const availableCustomization = computed<Record<string, Customization>>(() => {
    const dictionary: Record<string, Customization> = {};

    for (const customization of availableCustomizations.value) {
      dictionary[customization.id] = customization;
    }

    return dictionary;
  });

  const availableOptionCustomizations = computed<Customization[]>(() => {
    return availableCustomizations.value.filter(
      (customization) => customization.type === CustomizationType.OPTION
    );
  });

  const availableCustomizationsIds = computed<string>(() => {
    let ids = '';

    for (const customization of availableCustomizations.value) {
      ids += customization.id;
    }

    return ids;
  });

  function removeUnavailableOptionValues () {
    // Remove option values that became unavailable from customization state
    for (const key of Object.keys(customizationOptionValue.value)) {
      const customization = availableCustomization.value[key]
      const optionValue = customizationOptionValue.value[key];

      if (!customization) {
        updateCustomizationOptionValue({ customizationId: key, value: undefined });
        continue;
      }

      const availableOptionValues = customizationAvailableOptionValues.value[customization.id];

      if (
        !customization.optionData ||
        ignoreAvailableOptionsCheckFor.includes(customization.optionData.displayWidget) ||
        !optionValue ||
        isFileUploadValue(optionValue)
      ) {
        continue;
      }

      if (typeof optionValue === 'string') {
        if (customization.optionData.displayWidget === WidgetType.SEARCH_FIELD) {
          continue;
        }

        if (!availableOptionValues.find((item) => item.id === optionValue)) {
          updateCustomizationOptionValue({ customizationId: key, value: undefined });
        }

        continue;
      }

      const availableSelectedOptionValues = optionValue.filter((valueId) => !!availableOptionValues.find((item) => item.id === valueId));
      updateCustomizationOptionValue({ customizationId: key, value: availableSelectedOptionValues });
    }
  }

  watch(
    [
      availableOptionValuesIds, availableCustomizationsIds
    ],
    removeUnavailableOptionValues
  );

  return {
    availableCustomization,
    availableCustomizations,
    availableOptionCustomizations,
    availableOptionValues,
    customizationAvailableOptionValues,
    removeUnavailableOptionValues
  }
}
