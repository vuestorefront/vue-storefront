import { ref, computed, del, set, Ref, onMounted, ComputedRef } from '@vue/composition-api';

import CartItem from '@vue-storefront/core/modules/cart/types/CartItem';

import { CustomizationOptionValue, CustomizationStateItem } from '..';
import { isFileUploadValue } from '../types/is-file-upload-value.typeguard';

export function useCustomizationState (
  existingCartItem?: Ref<CartItem | undefined>,
  initialCustomizationState?: Ref<CustomizationStateItem[] | undefined>
) {
  const customizationOptionValue: Ref<Record<string, CustomizationOptionValue>> = ref({});
  const customizationQuantity: Ref<Record<string, number>> = ref({});

  const existingCartItemCustomizationOptionValue: ComputedRef<Record<string, CustomizationOptionValue>> = computed(() => {
    if (!existingCartItem?.value?.extension_attributes?.customization_state) {
      return {};
    }

    const customizationOptionValueDictionary: Record<string, CustomizationOptionValue> = {};

    existingCartItem.value.extension_attributes.customization_state.forEach((item) => {
      customizationOptionValueDictionary[item.customization_id] = item.value;
    });

    return customizationOptionValueDictionary;
  });

  const customizationState = computed<CustomizationStateItem[]>(() => {
    const items: CustomizationStateItem[] = [];

    for (const customizationId of Object.keys(customizationOptionValue.value)) {
      const value = customizationOptionValue.value[customizationId];

      if (!value) {
        continue;
      }

      items.push({
        customization_id: customizationId,
        qty: customizationQuantity.value[customizationId] || 1,
        value
      });
    }

    return items;
  });
  const selectedOptionValuesIds = computed<string[]>(() => {
    const selectedValues: string[] = [];

    customizationState.value.forEach((state) => {
      if (isFileUploadValue(state.value)) {
        return;
      }

      if (Array.isArray(state.value)) {
        selectedValues.push(...state.value);
      } else {
        selectedValues.push(state.value);
      }
    });

    return selectedValues;
  });

  function updateCustomizationOptionValue (
    {
      customizationId,
      value
    }: {
      customizationId: string,
      value: CustomizationOptionValue
    }
  ): void {
    const isOptionValueEmptyArray = Array.isArray(value) && value.length === 0;

    if (!value || isOptionValueEmptyArray) {
      del(customizationOptionValue.value, customizationId);
      return;
    }

    set(customizationOptionValue.value, customizationId, value);
  }

  function mergeCustomizationState (
    state: CustomizationStateItem[]
  ): void {
    const customizationOptionValueForMerge: Record<string, CustomizationOptionValue> = {};

    for (const customizationStateItem of state) {
      customizationOptionValueForMerge[customizationStateItem.customization_id] = customizationStateItem.value;

      customizationQuantity.value[customizationStateItem.customization_id] = customizationStateItem.qty || 1;
    }

    customizationOptionValue.value = {
      ...customizationOptionValue.value,
      ...customizationOptionValueForMerge
    };
  }

  function addCustomizationOptionValue (customizationId: string, optionValueId: string) {
    const value = customizationOptionValue.value[customizationId];

    if (isFileUploadValue(value)) {
      return;
    }

    if (!value || !Array.isArray(value)) {
      customizationOptionValue.value[customizationId] = optionValueId;
      return;
    }

    value.push(optionValueId)
    set(customizationOptionValue.value, customizationId, value);
  }

  function removeCustomizationOptionValue (
    optionValueId: string
  ): void {
    if (!selectedOptionValuesIds.value.includes(optionValueId)) {
      return;
    }

    for (const customizationId in customizationOptionValue.value) {
      const value = customizationOptionValue.value[customizationId];

      if (!value || isFileUploadValue(value)) {
        continue;
      }

      if (!Array.isArray(value)) {
        del(customizationOptionValue, customizationId);
        continue;
      }

      if (!value.includes(optionValueId)) {
        continue;
      }

      set(customizationOptionValue, customizationId, value.filter((id) => id !== optionValueId));
    }
  }

  function resetCustomizationState () {
    customizationOptionValue.value = {};
    customizationQuantity.value = {};
  }

  function fillCustomizationStateFromExistingCartItem (cartItem: CartItem) {
    if (!cartItem.extension_attributes?.customization_state) {
      return;
    }

    const customizationOptionValueDictionary: Record<string, CustomizationOptionValue> = {};

    cartItem.extension_attributes?.customization_state.forEach((item) => {
      customizationOptionValueDictionary[item.customization_id] = item.value;

      customizationQuantity.value[item.customization_id] = item.qty || 1;
    });

    customizationOptionValue.value = customizationOptionValueDictionary;
  }

  function fillInitialCustomizationState (customizationState: CustomizationStateItem[]): void {
    for (const initialCustomizationStateItem of customizationState) {
      updateCustomizationOptionValue({
        customizationId: initialCustomizationStateItem.customization_id,
        value: initialCustomizationStateItem.value
      });
    }
  }

  // Need to wait hydration before fill customization state
  // Otherwise it may lead to nodes mismatch
  // Because on SSR there is no cart items data
  // So some of customizations may be hidden on SSR
  // But became available after fill customization state
  onMounted(() => {
    if (existingCartItem && existingCartItem.value) {
      return fillCustomizationStateFromExistingCartItem(existingCartItem.value);
    }

    if (initialCustomizationState && initialCustomizationState.value) {
      fillInitialCustomizationState(initialCustomizationState.value);
    }
  });

  return {
    addCustomizationOptionValue,
    customizationQuantity,
    customizationOptionValue,
    customizationState,
    existingCartItemCustomizationOptionValue,
    removeCustomizationOptionValue,
    mergeCustomizationState,
    resetCustomizationState,
    selectedOptionValuesIds,
    updateCustomizationOptionValue
  }
}
