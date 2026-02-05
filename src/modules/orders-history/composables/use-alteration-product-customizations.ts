import { computed, Ref } from '@vue/composition-api';

import Product from '@vue-storefront/core/modules/catalog/types/Product';

import {
  Customization,
  CustomizationOptionValue,
  isFileUploadValue,
  OptionValue
} from 'src/modules/customization-system';

import { OrderItem } from '../types/order-item';

function mapOrderItemOptionValueIdToAlterationProduct (
  orderItemOptionValueId: string,
  orderItemOptionValueNameById: Record<string, string>,
  alterationProductOptionValueByName: Record<string, OptionValue>
): string | undefined {
  const optionValueName = orderItemOptionValueNameById[orderItemOptionValueId];

  if (!optionValueName) {
    return undefined;
  }

  const optionValue = alterationProductOptionValueByName[optionValueName];

  if (!optionValue) {
    return undefined;
  }

  return optionValue.id;
}

export function useAlterationProductCustomizations (
  orderItem: Ref<OrderItem>,
  alterationProduct: Ref<Product | undefined>
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

  const orderItemOptionValueNameByIdAndCustomizationId = computed<Record<string, Record<string, string> | undefined>>(() => {
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

  const alterationProductOptionValueIdByNameAndCustomizationId = computed<Record<string, Record<string, OptionValue> | undefined>>(() => {
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
      result[customization.name.toLowerCase()] = customization;
    }

    return result;
  });

  const orderItemOptionValue = computed<Record<string, CustomizationOptionValue>>(() => {
    const result: Record<string, CustomizationOptionValue> = {};
    const extensionAttributes = orderItem.value.extension_attributes;
    const _orderItemCustomizationNameByIdDictionary = orderItemCustomizationNameByIdDictionary.value;
    const _orderItemOptionValueNameByIdAndCustomizationId = orderItemOptionValueNameByIdAndCustomizationId.value;
    const _alterationProductCustomizationsByName = alterationProductCustomizationsByName.value;
    const _alterationProductOptionValueIdByNameAndCustomizationId = alterationProductOptionValueIdByNameAndCustomizationId.value;
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

      const optionValueNameDictionary = _orderItemOptionValueNameByIdAndCustomizationId[item.customization_id];

      if (!optionValueNameDictionary) {
        continue;
      }

      const alterationOptionValueDictionary = _alterationProductOptionValueIdByNameAndCustomizationId[alterationProductCustomization.id];

      if (!alterationOptionValueDictionary) {
        continue;
      }

      if (typeof item.value === 'string') {
        const mappedId = mapOrderItemOptionValueIdToAlterationProduct(
          item.value,
          optionValueNameDictionary,
          alterationOptionValueDictionary
        );

        if (mappedId) {
          result[alterationProductCustomization.id] = mappedId;
        }

        continue;
      }

      if (item.value) {
        const mappedIds: string[] = [];

        for (const selectedId of item.value) {
          if (typeof selectedId !== 'string') {
            continue;
          }

          const mappedId = mapOrderItemOptionValueIdToAlterationProduct(
            selectedId,
            optionValueNameDictionary,
            alterationOptionValueDictionary
          );

          if (mappedId) {
            mappedIds.push(mappedId);
          }
        }

        if (mappedIds.length > 0) {
          result[alterationProductCustomization.id] = mappedIds;
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

    return Array.isArray(value) ? !value.includes(optionValue.id) : value !== optionValue.id;
  }

  function customizationsFilter (customization: Customization, availableOptionValues?: OptionValue[]): boolean {
    const value = orderItemOptionValue.value[customization.id];

    if (!value) {
      return true;
    }

    if (isFileUploadValue(value)) {
      return true;
    }

    if (!availableOptionValues?.length) {
      return false;
    }

    const filteredAvailableOptionValues = availableOptionValues.filter((item) => optionValuesFilter(customization.id, item));

    if (filteredAvailableOptionValues.length === 0) {
      return false;
    }

    const maxValuesCount = customization.optionData?.maxValuesCount || 0;
    const totalOptionValuesCount = customization.optionData?.values?.length || 0;
    const purchasedCount = Array.isArray(value) ? value.length : 1;

    if (purchasedCount >= totalOptionValuesCount) {
      return false;
    }

    if (maxValuesCount === 0) {
      return true;
    }

    return purchasedCount < maxValuesCount;
  }

  return {
    customizationsFilter,
    optionValuesFilter
  };
}
