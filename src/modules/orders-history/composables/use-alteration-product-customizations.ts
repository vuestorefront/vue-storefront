import { computed, Ref } from '@vue/composition-api';

import CartItem from '@vue-storefront/core/modules/cart/types/CartItem';
import Product from '@vue-storefront/core/modules/catalog/types/Product';

import {
  Customization,
  CustomizationOptionValue,
  isFileUploadValue,
  OptionValue
} from 'src/modules/customization-system';

import { OrderItem } from '../types/order-item';

export function useAlterationProductCustomizations (
  orderItem: Ref<OrderItem>,
  alterationProduct: Ref<Product | undefined>,
  existingCartItem: Ref<CartItem | undefined>
) {
  const orderItemCustomizationNameById = computed<Record<string, string>>(() => {
    const result: Record<string, string> = {};
    const extensionAttributes = orderItem.value.extension_attributes;

    if (!extensionAttributes?.customizations) {
      return result;
    }

    for (const customization of extensionAttributes.customizations) {
      result[customization.id] = customization.name.toLowerCase();
    }

    return result;
  });

  const orderItemOptionValueNameByCustomizationAndId = computed<Record<string, Record<string, string> | undefined>>(() => {
    const result: Record<string, Record<string, string>> = {};
    const extensionAttributes = orderItem.value.extension_attributes;

    if (!extensionAttributes?.customizations) {
      return result;
    }

    for (const customization of extensionAttributes.customizations) {
      result[customization.id] = {};

      if (!customization.optionData?.values) {
        continue;
      }

      for (const optionValue of customization.optionData.values) {
        if (!optionValue.name) {
          continue;
        }

        result[customization.id][optionValue.id] = optionValue.name.toLowerCase();
      }
    }

    return result;
  });

  const alterationProductCustomizationIdByName = computed<Record<string, string>>(() => {
    const result: Record<string, string> = {};

    if (!alterationProduct.value?.customizations) {
      return result;
    }

    for (const customization of alterationProduct.value.customizations as Customization[]) {
      result[customization.name.toLowerCase()] = customization.id;
    }

    return result;
  });

  const alterationProductOptionValueIdByCustomizationAndName = computed<Record<string, Record<string, string> | undefined>>(() => {
    const result: Record<string, Record<string, string>> = {};

    if (!alterationProduct.value?.customizations) {
      return result;
    }

    for (const customization of alterationProduct.value.customizations as Customization[]) {
      result[customization.id] = {};

      if (!customization.optionData?.values) {
        continue;
      }

      for (const optionValue of customization.optionData.values) {
        if (!optionValue.name) {
          continue;
        }

        result[customization.id][optionValue.name.toLowerCase()] = optionValue.id;
      }
    }

    return result;
  });

  const purchasedOptionsWithAlterationProductIds = computed<Record<string, CustomizationOptionValue>>(() => {
    const result: Record<string, CustomizationOptionValue> = {};
    const extensionAttributes = orderItem.value.extension_attributes;

    if (!extensionAttributes?.customization_states) {
      return result;
    }

    const customizationNameById = orderItemCustomizationNameById.value;
    const optionValueNameByCustomizationAndId = orderItemOptionValueNameByCustomizationAndId.value;
    const alterationCustomizationIdByName = alterationProductCustomizationIdByName.value;
    const alterationOptionValueIdByCustomizationAndName = alterationProductOptionValueIdByCustomizationAndName.value;

    for (const item of extensionAttributes.customization_states) {
      if (isFileUploadValue(item.value) || (Array.isArray(item.value) && item.value.length > 0 && isFileUploadValue(item.value[0]))) {
        continue;
      }

      const customizationName = customizationNameById[item.customization_id];

      if (!customizationName) {
        continue;
      }

      const alterationCustomizationId = alterationCustomizationIdByName[customizationName];

      if (!alterationCustomizationId) {
        continue;
      }

      const optionValueNameDictionary = optionValueNameByCustomizationAndId[item.customization_id];

      if (!optionValueNameDictionary) {
        continue;
      }

      const alterationOptionValueDictionary = alterationOptionValueIdByCustomizationAndName[alterationCustomizationId];

      if (!alterationOptionValueDictionary) {
        continue;
      }

      const selectedIds = Array.isArray(item.value) ? item.value : [item.value];
      const mappedIds: string[] = [];

      for (const selectedId of selectedIds) {
        if (typeof selectedId !== 'string') {
          continue;
        }

        const optionValueName = optionValueNameDictionary[selectedId];

        if (!optionValueName) {
          continue;
        }

        const alterationOptionValueId = alterationOptionValueDictionary[optionValueName];

        if (alterationOptionValueId) {
          mappedIds.push(alterationOptionValueId);
        }
      }

      if (mappedIds.length > 0) {
        result[alterationCustomizationId] = mappedIds.length === 1 ? mappedIds[0] : mappedIds;
      }
    }

    return result;
  });

  const purchasedOptionValueIds = computed<Record<string, boolean | undefined>>(() => {
    const result: Record<string, boolean | undefined> = {};

    for (const customizationId of Object.keys(purchasedOptionsWithAlterationProductIds.value)) {
      const value = purchasedOptionsWithAlterationProductIds.value[customizationId];

      if (!value) {
        continue;
      }

      const selectedIds = Array.isArray(value) ? value : [value];

      for (const selectedId of selectedIds) {
        if (typeof selectedId === 'string') {
          result[selectedId] = true;
        }
      }
    }

    return result;
  });

  const purchasedCountPerCustomizationId = computed<Record<string, number>>(() => {
    const result: Record<string, number> = {};

    for (const customizationId of Object.keys(purchasedOptionsWithAlterationProductIds.value)) {
      const value = purchasedOptionsWithAlterationProductIds.value[customizationId];

      if (!value) {
        continue;
      }

      const selectedIds = Array.isArray(value) ? value : [value];
      const count = selectedIds.filter((id) => typeof id === 'string').length;

      result[customizationId] = (result[customizationId] || 0) + count;
    }

    return result;
  });

  const inCartOptionValueIds = computed<Record<string, boolean | undefined>>(() => {
    const result: Record<string, boolean | undefined> = {};
    const cartItem = existingCartItem.value;

    if (!cartItem) {
      return result;
    }

    const states = cartItem.extension_attributes?.customization_state || [];

    for (const state of states) {
      const selectedIds = Array.isArray(state.value) ? state.value : [state.value];

      for (const selectedId of selectedIds) {
        if (typeof selectedId === 'string') {
          result[selectedId] = true;
        }
      }
    }

    return result;
  });

  const availableOptionValueIds = computed<Record<string, Record<string, boolean>>>(() => {
    const result: Record<string, Record<string, boolean>> = {};
    const product = alterationProduct.value;

    if (!product || !product.customizations) {
      return result;
    }

    for (const customization of product.customizations as Customization[]) {
      const optionValues = customization.optionData?.values || [];
      result[customization.id] = {};

      for (const optionValue of optionValues) {
        const isPurchased = purchasedOptionValueIds.value[optionValue.id] === true;
        result[customization.id][optionValue.id] = !isPurchased;
      }
    }

    return result;
  });

  function customizationsFilter (customization: Customization): boolean {
    const optionValuesAvailability = availableOptionValueIds.value[customization.id];

    if (!optionValuesAvailability) {
      return false;
    }

    const hasAvailableOptions = Object.values(optionValuesAvailability).some((isAvailable) => isAvailable);

    if (!hasAvailableOptions) {
      return false;
    }

    const maxValuesCount = customization.optionData?.maxValuesCount || 0;

    if (maxValuesCount === 0) {
      return true;
    }

    const purchasedCount = purchasedCountPerCustomizationId.value[customization.id] || 0;

    return purchasedCount < maxValuesCount;
  }

  function optionValuesFilter (customizationId: string, optionValue: OptionValue): boolean {
    if (!availableOptionValueIds.value[customizationId]) {
      return false;
    }

    return availableOptionValueIds.value[customizationId][optionValue.id];
  }

  return {
    customizationsFilter,
    inCartOptionValueIds,
    optionValuesFilter
  };
}
