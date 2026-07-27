import { computed, Ref } from 'vue';
import { CustomizationType } from '../types/customization-type';

import { Customization } from '../types/customization.interface';

export function useCustomizationsGroups (
  availableCustomizations: Ref<Customization[]>,
  customizationsDictionary: Ref<Record<string, Customization>>
) {
  function getRootParentGroupId (
    customization: Customization
  ): string | undefined {
    const parentId = customization.parentId;

    if (!parentId) {
      return;
    }

    let parentCustomization: Customization | undefined = customizationsDictionary.value[parentId];

    while (parentCustomization) {
      if (!parentCustomization.parentId) {
        return parentCustomization.id;
      }

      parentCustomization = customizationsDictionary.value[parentCustomization.parentId];
    }

    return parentId;
  }

  const customizationRootGroupCustomizations = computed<Record<string, Customization[]>>(() => {
    const dictionary: Record<string, Customization[]> = {};

    for (const availableCustomization of availableCustomizations.value) {
      if (availableCustomization.type !== CustomizationType.OPTION) {
        continue;
      }

      const rootParentGroupId = getRootParentGroupId(availableCustomization);

      if (!rootParentGroupId) {
        continue;
      }

      if (!dictionary[rootParentGroupId]) {
        dictionary[rootParentGroupId] = [];
      }

      dictionary[rootParentGroupId].push(availableCustomization);
    }

    return dictionary;
  });

  const customizationRootGroups = computed<Customization[]>(() => {
    return availableCustomizations.value.filter(
      (customization) => {
        if (
          customization.type !== CustomizationType.OPTIONS_GROUP ||
          !!customization.parentId ||
          customization.isHidden
        ) {
          return false;
        }

        return customizationRootGroupCustomizations.value[customization.id]?.length > 0;
      }
    ).sort((a, b) => a.sn - b.sn);
  });

  function isLastGroup (index: number): boolean {
    return index === customizationRootGroups.value.length - 1;
  }

  return {
    customizationRootGroupCustomizations,
    customizationRootGroups,
    isLastGroup
  }
}
