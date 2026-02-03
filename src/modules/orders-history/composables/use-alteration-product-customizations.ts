import { computed, Ref } from '@vue/composition-api';

import CartItem from '@vue-storefront/core/modules/cart/types/CartItem';
import Product from '@vue-storefront/core/modules/catalog/types/Product';

import {
  Customization,
  CustomizationOptionValue,
  CustomizationStateItem,
  isFileUploadValue,
  OptionValue
} from 'src/modules/customization-system';

import { OrderItem } from '../types/order-item';

export function useAlterationProductCustomizations (
  orderItem: Ref<OrderItem>,
  alterationProduct: Ref<Product | undefined>,
  existingCartItem: Ref<CartItem | undefined>
) {
  const orderItemCustomizationNameByIdDictionary = computed<Record<string, string>>(() => {
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

  const orderItemOptionValueNameByIdAndCustomizaitionId = computed<Record<string, Record<string, string> | undefined>>(() => {
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

  const alterationProductOptionValueIdByNameAndCustomizaitionId = computed<Record<string, Record<string, OptionValue> | undefined>>(() => {
    const result: Record<string, Record<string, OptionValue>> = {};

    if (!alterationProduct.value?.customizations) {
      return result;
    }

    for (const customization of alterationProduct.value.customizations) {
      result[customization.id] = {};

      if (!customization.optionData?.values) {
        continue;
      }

      for (const optionValue of customization.optionData.values) {
        if (!optionValue.name) {
          continue;
        }

        result[customization.id][optionValue.name.toLowerCase()] = optionValue;
      }
    }

    return result;
  });

  const alterationProductCustomizationsByName = computed<Record<string, Customization>>(() => {
    const result: Record<string, Customization> = {};
    const product = alterationProduct.value;

    if (!product || !product.customizations) {
      return result;
    }

    for (const customization of product.customizations as Customization[]) {
      result[customization.name] = customization;
    }

    return result;
  });

  const orderItemOptionValue = computed<Record<string, CustomizationOptionValue>>(() => {
    const result: Record<string, CustomizationOptionValue> = {};
    const extensionAttributes = orderItem.value.extension_attributes;
    const _orderItemCustomizationNameByIdDictionary = orderItemCustomizationNameByIdDictionary.value;
    const _orderItemOptionValueNameByIdAndCustomizaitionId = orderItemOptionValueNameByIdAndCustomizaitionId.value;
    const _alterationProductCustomizationsByName = alterationProductCustomizationsByName.value;
    const _alterationProductOptionValueIdByNameAndCustomizaitionId = alterationProductOptionValueIdByNameAndCustomizaitionId.value;
    const alterationProductCustomizations = alterationProduct.value?.customizations;

    if (!extensionAttributes || !alterationProductCustomizations) {
      return result;
    }

    for (const item of extensionAttributes.customization_states) {
      if (isFileUploadValue(item.value)) {
        continue;
      }

      const customizationName = _orderItemCustomizationNameByIdDictionary[item.customization_id];

      if (!customizationName) {
        continue;
      }

      const alterationProductCustomization = _alterationProductCustomizationsByName[customizationName];

      if (!alterationProductCustomization) {
        continue;
      }

      const optionValueNameDictionary = _orderItemOptionValueNameByIdAndCustomizaitionId[item.customization_id];

      if (!optionValueNameDictionary) {
        continue;
      }

      if (typeof item.value === 'string') {
        const optionValueName = optionValueNameDictionary[item.value]

        if (!optionValueName) {
          continue;
        }

        const optionValueDictionary = _alterationProductOptionValueIdByNameAndCustomizaitionId[alterationProductCustomization.id];

        if (!optionValueDictionary) {
          continue;
        }

        const optionValue = optionValueDictionary[optionValueName];

        if (!optionValue) {
          continue;
        }

        result[alterationProductCustomization.id] = optionValue.id;
        continue;
      }
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

  function optionValuesFilter (customizationId: string, optionValue: OptionValue): boolean {
    const value = orderItemOptionValue.value[customizationId];

    if (isFileUploadValue(value)) {
      return true;
    }

    if (!value) {
      return true;
    }

    return Array.isArray(value) ? !value.includes(optionValue.id) : !value;
  }

  return {
    inCartOptionValueIds,
    optionValuesFilter
  };
}
