import { computed, ComputedRef, del, ref, Ref, set } from '@vue/composition-api';

import { CustomizationOptionValue } from '../types/customization-option-value';
import { CustomizationStateItem } from '../types/customization-state-item.interface';
import { isFileUploadValue } from '../types/is-file-upload-value.typeguard';
import { FileUploadValue } from '../types/file-upload-value';

export interface RemovedCustomizationOptionNode {
  customizationId: string,
  optionValueId: string,
  parentRemovedOptionValueId?: string,
  removedChildrenOptionValueIds: string[]
}

function mergeRestorableOptionValue (
  currentValue: CustomizationOptionValue,
  optionValueId: string
): CustomizationOptionValue {
  if (!currentValue || isFileUploadValue(currentValue)) {
    return optionValueId;
  }

  if (Array.isArray(currentValue)) {
    if (currentValue.includes(optionValueId)) {
      return currentValue;
    }

    return [...currentValue, optionValueId];
  }

  if (currentValue === optionValueId) {
    return currentValue;
  }

  return [currentValue, optionValueId];
}

function getOptionValueIds (
  value: CustomizationOptionValue
): string[] {
  if (!value || isFileUploadValue(value)) {
    return [];
  }

  return Array.isArray(value)
    ? value
    : [value];
}

export function useRestorableCustomizationState (
  customizationState: ComputedRef<CustomizationStateItem[]>,
  customizationQuantity: Ref<Record<string, number>>,
  addCustomizationOptionValue: (customizationId: string, optionValueId: string) => void,
  removeCustomizationOptionValue: (optionValueId: string) => void,
  removeUnavailableOptionValues: () => Record<string, CustomizationOptionValue>
) {
  const removedOptions: Ref<Record<string, RemovedCustomizationOptionNode>> = ref({});

  const configurationDisplayState: ComputedRef<CustomizationStateItem[]> = computed(() => {
    const stateByCustomizationId: Record<string, CustomizationStateItem> = {};

    for (const stateItem of customizationState.value) {
      stateByCustomizationId[stateItem.customization_id] = {
        customization_id: stateItem.customization_id,
        quantity: stateItem.quantity,
        value: Array.isArray(stateItem.value)
          ? [...stateItem.value] as string[] | FileUploadValue[]
          : stateItem.value
      };
    }

    for (const item of Object.values(removedOptions.value)) {
      const removedOptionNode = item as RemovedCustomizationOptionNode;
      const currentStateItem = stateByCustomizationId[removedOptionNode.customizationId];
      const currentValue = currentStateItem?.value;
      const mergedValue = mergeRestorableOptionValue(
        currentValue,
        removedOptionNode.optionValueId
      );

      stateByCustomizationId[removedOptionNode.customizationId] = {
        customization_id: removedOptionNode.customizationId,
        quantity: currentStateItem?.quantity || customizationQuantity.value[removedOptionNode.customizationId] || 1,
        value: mergedValue
      };
    }

    return Object.values(stateByCustomizationId);
  });

  const removedOptionIds = computed<Record<string, boolean>>(() => {
    const dictionary: Record<string, boolean> = {};

    for (const optionValueId of Object.keys(removedOptions.value)) {
      dictionary[optionValueId] = true;
    }

    return dictionary;
  });

  function ensureRemovedOptionNode (
    optionValueId: string,
    customizationId: string,
    parentRemovedOptionValueId?: string
  ): RemovedCustomizationOptionNode {
    const existingNode = removedOptions.value[optionValueId];

    if (existingNode) {
      return existingNode;
    }

    const node: RemovedCustomizationOptionNode = {
      customizationId,
      optionValueId,
      parentRemovedOptionValueId,
      removedChildrenOptionValueIds: []
    };

    set(removedOptions.value, optionValueId, node);

    return node;
  }

  function appendRemovedChildOptionValueId (
    parentOptionValueId: string,
    childOptionValueId: string
  ): void {
    const parentNode = removedOptions.value[parentOptionValueId];

    if (!parentNode || parentNode.removedChildrenOptionValueIds.includes(childOptionValueId)) {
      return;
    }

    parentNode.removedChildrenOptionValueIds.push(childOptionValueId);
  }

  function restoreRemovedChildren (optionValueId: string): void {
    const removedOptionNode = removedOptions.value[optionValueId];

    if (!removedOptionNode) {
      return;
    }

    const removedChildrenOptionValueIds = [...removedOptionNode.removedChildrenOptionValueIds];

    for (const removedChildOptionValueId of removedChildrenOptionValueIds) {
      const removedChildNode = removedOptions.value[removedChildOptionValueId];

      if (!removedChildNode) {
        continue;
      }

      addCustomizationOptionValue(
        removedChildNode.customizationId,
        removedChildNode.optionValueId
      );
      restoreRemovedChildren(removedChildOptionValueId);
      del(removedOptions.value, removedChildOptionValueId);
    }

    removedOptionNode.removedChildrenOptionValueIds = [];
  }

  function removeOptionValue (customizationId: string, optionValueId: string): void {
    removeCustomizationOptionValue(optionValueId);
    ensureRemovedOptionNode(optionValueId, customizationId);

    const removedOptionValues = removeUnavailableOptionValues();

    for (const removedCustomizationId of Object.keys(removedOptionValues)) {
      for (const removedOptionValueId of getOptionValueIds(removedOptionValues[removedCustomizationId])) {
        ensureRemovedOptionNode(
          removedOptionValueId,
          removedCustomizationId,
          optionValueId
        );
        appendRemovedChildOptionValueId(optionValueId, removedOptionValueId);
      }
    }
  }

  function restoreOptionValue (
    {
      customizationId,
      optionValueId
    }: {
      customizationId: string,
      optionValueId: string
    }
  ): void {
    addCustomizationOptionValue(customizationId, optionValueId);
    restoreRemovedChildren(optionValueId);

    const parentRemovedOptionValueId = removedOptions.value[optionValueId]?.parentRemovedOptionValueId;

    if (parentRemovedOptionValueId) {
      const parentNode = removedOptions.value[parentRemovedOptionValueId];

      if (parentNode) {
        parentNode.removedChildrenOptionValueIds =
          parentNode.removedChildrenOptionValueIds.filter(
            (removedChildOptionValueId) => removedChildOptionValueId !== optionValueId
          );
      }
    }

    del(removedOptions.value, optionValueId);
  }

  return {
    configurationDisplayState,
    removedOptionIds,
    removedOptions,
    removeOptionValue,
    restoreOptionValue
  }
}
