import { computed, Ref, SetupContext, watch } from '@vue/composition-api';

import { PRODUCT_REMOVE_BUNDLE_OPTION, PRODUCT_SET_BUNDLE_OPTION } from '@vue-storefront/core/modules/catalog/store/product/mutation-types';

import { CustomizationOptionValue } from '../types/customization-option-value';
import { Customization } from '../types/customization.interface';
import { isFileUploadValue } from '../types/is-file-upload-value.typeguard';
import { OptionValue } from '../types/option-value.interface';

export function useCustomizationsBundleOptions (
  customizations: Ref<Customization[]>,
  customizationOptionValue: Ref<Record<string, CustomizationOptionValue>>,
  availableOptionValues: Ref<OptionValue[]>,
  { root }: SetupContext
) {
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
    const selectedBundleOptions = root.$store.getters['product/getCurrentBundleOptions'];
    const ids: number[] = [];

    for (const key in selectedBundleOptions) {
      ids.push(Number(key));
    }

    return ids;
  });

  function setBundleOptionValue (
    optionId: number,
    optionQty: number,
    optionSelections: number[]
  ): void {
    root.$store.commit(
      `product/${PRODUCT_SET_BUNDLE_OPTION}`,
      { optionId, optionQty, optionSelections }
    )
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
      1,
      bundleOptionItemIds
    )
  }

  function removeUnavailableSelectedBundleOptions (
    availableBundleOptionsIds: number[],
    selectedBundleOptionsIds: number[]
  ): void {
    for (const id of selectedBundleOptionsIds) {
      if (!availableBundleOptionsIds.includes(id)) {
        root.$store.commit(`product/${PRODUCT_REMOVE_BUNDLE_OPTION}`, id);
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
}
