import { computed, Ref, ref, watch } from 'vue';

import { SelectedBundleOption } from '@vue-storefront/core/modules/catalog/types/BundleOption';

import { CustomizationOptionValue } from '../types/customization-option-value';
import { Customization } from '../types/customization.interface';
import { isFileUploadValue } from '../types/is-file-upload-value.typeguard';
import { OptionValue } from '../types/option-value.interface';

export function useCustomizationsBundleOptions (
  customizations: Ref<Customization[]>,
  customizationOptionValue: Ref<Record<string, CustomizationOptionValue>>,
  availableOptionValues: Ref<OptionValue[]>,
  customizationQuantity?: Ref<Record<string, number>>
) {
  const bundleOptions: Ref<Record<number, SelectedBundleOption>> = ref({});

  const customizationsWithBundleOptions = computed<Customization[]>(() => {
    return customizations.value.filter((customization) => !!customization.bundleOptionId);
  });

  const customizationsBundleOptionsIds = computed<number[]>(() => {
    return customizationsWithBundleOptions.value.map((customization) => customization.bundleOptionId as number);
  });

  const bundleOptionsCustomizationOptionValue = computed<Record<string, CustomizationOptionValue>>(() => {
    const dictionary: Record<string, CustomizationOptionValue> = {};

    for (const customization of customizationsWithBundleOptions.value) {
      const selectedValue = customizationOptionValue.value[customization.id];

      if (!selectedValue) {
        continue;
      }

      dictionary[customization.id] = selectedValue;
    }

    return dictionary;
  });

  const selectedBundleOptionsIds = computed<number[]>(() => {
    const ids: number[] = [];

    for (const key in bundleOptions.value) {
      ids.push(Number(key));
    }

    return ids;
  });

  function setBundleOptionValue (
    optionId: number,
    optionQty: number,
    optionSelections: number[]
  ): void {
    bundleOptions.value = {
      ...bundleOptions.value,
      [optionId]: {
        option_id: optionId,
        option_qty: optionQty,
        option_selections: optionSelections
      }
    };
  }

  function removeBundleOption (optionId: number): void {
    const newOptions = { ...bundleOptions.value };
    delete newOptions[optionId];
    bundleOptions.value = newOptions;
  }

  function updateBundleOptionValue (
    customization: Customization,
    value?: CustomizationOptionValue
  ): void {
    if (!customization.bundleOptionId) {
      return;
    }

    if (isFileUploadValue(value)) {
      return;
    }

    let selectedValueIds: string[]

    if (!value) {
      selectedValueIds = [];
    } else {
      selectedValueIds = Array.isArray(value) ? value : [value];
    }

    const bundleOptionItemIds: number[] = [];

    selectedValueIds.forEach((id) => {
      const value = availableOptionValues.value.find((item) => item.id === id);

      if (value && value.bundleOptionItemId) {
        bundleOptionItemIds.push(value.bundleOptionItemId)
      }
    })

    setBundleOptionValue(
      customization.bundleOptionId,
      customizationQuantity?.value[customization.id] || 1,
      bundleOptionItemIds
    )
  }

  function removeUnavailableSelectedBundleOptions (
    availableBundleOptionsIds: number[],
    selectedBundleOptionsIds: number[]
  ): void {
    for (const id of selectedBundleOptionsIds) {
      if (!availableBundleOptionsIds.includes(id)) {
        removeBundleOption(id);
      }
    }
  }

  function updateBundleOptionValues (): void {
    for (const customization of customizationsWithBundleOptions.value) {
      const value = bundleOptionsCustomizationOptionValue.value[customization.id];

      updateBundleOptionValue(
        customization,
        value
      );
    }
  }

  watch(
    customizationsBundleOptionsIds,
    () => {
      removeUnavailableSelectedBundleOptions(
        customizationsBundleOptionsIds.value,
        selectedBundleOptionsIds.value
      );
    },
    { immediate: true }
  );

  watch(
    bundleOptionsCustomizationOptionValue,
    updateBundleOptionValues,
    { immediate: true }
  );

  if (customizationQuantity) {
    watch(
      customizationQuantity,
      updateBundleOptionValues,
      { immediate: true, deep: true }
    );
  }

  return {
    bundleOptions
  };
}
