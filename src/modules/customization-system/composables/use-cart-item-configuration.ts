import { computed, ref, Ref, SetupContext } from '@vue/composition-api';

import { useMobileObserver, PriceHelper } from 'src/modules/shared';

import { GET_ACTIVE_CURRENCY } from 'src/modules/currency';
import { PRODUCT_LOCALIZED_PRICE_DICTIONARY } from '@vue-storefront/core/modules/catalog';

import { Customization } from '../types/customization.interface';
import { CustomizationStateItem } from '../types/customization-state-item.interface';
import { getCustomizationValueIdFieldKey } from '../helpers/get-customization-value-id-field-key';
import { isFileUploadValue } from '../types/is-file-upload-value.typeguard';
import { getOptionValuePrice } from '../helpers/get-option-value-price';

import { CartItemConfigurationProperty, CartItemConfigurationGroup } from '../types/cart-item-configuration.types';

const PLUSHIE_NAME_CUSTOMIZATION_NAME = 'name';

function sortGroups (groups: CartItemConfigurationGroup[]): CartItemConfigurationGroup[] {
  return groups.sort((a, b) => {
    if (a.sn === b.sn) {
      return a.customizationName.localeCompare(b.customizationName);
    }

    return a.sn - b.sn;
  });
}

function sortProperties (
  properties: CartItemConfigurationProperty[]
): CartItemConfigurationProperty[] {
  return properties.sort((a, b) => {
    if (a.sn === b.sn) {
      return a.value.localeCompare(b.value);
    }

    return a.sn - b.sn;
  });
}

function getPropertyComposedId (optionValue: string, customizationId: string): string {
  return `${customizationId}-${optionValue}`;
}

export function useCartItemConfiguration (
  customizations: Ref<Customization[]>,
  customizationState: Ref<CustomizationStateItem[]>,
  cartItemPrice: Ref<PriceHelper.ProductPrice | undefined>,
  cartItemQty: Ref<number>,
  showPrices: Ref<boolean>,
  { root }: SetupContext,
  filterOutNameCustomization: Ref<boolean> = ref(false)
) {
  const { isMobile } = useMobileObserver();

  function truncate (text: string, desktopLength = 75, mobileLength = 50): string {
    const maxLength = isMobile.value ? mobileLength : desktopLength;

    if (text.length <= maxLength) {
      return text;
    }

    return text.substring(0, maxLength) + '...';
  }

  const customizationDictionary = computed<Record<string, Customization>>(() => {
    const dictionary: Record<string, Customization> = {};

    for (const customization of customizations.value) {
      dictionary[customization.id] = customization;
    }

    return dictionary;
  });

  const nameCustomizationId = computed<string | undefined>(() =>
    customizations.value.find((c) => c.name.toLowerCase() === PLUSHIE_NAME_CUSTOMIZATION_NAME)?.id
  );

  const plushieName = computed<string>(() => {
    const id = nameCustomizationId.value;

    if (!id) {
      return '';
    }

    const stateItem = customizationState.value.find((item) => item.customization_id === id);

    if (!stateItem || isFileUploadValue(stateItem.value)) {
      return '';
    }

    return Array.isArray(stateItem.value) ? stateItem.value.join(', ') : stateItem.value;
  });

  const customizationGroups = computed<CartItemConfigurationGroup[]>(() => {
    const productBySkuDictionary = showPrices.value
      ? root.$store.getters['product/getProductBySkuDictionary']
      : {};
    const productPriceDictionary = showPrices.value
      ? root.$store.getters[PRODUCT_LOCALIZED_PRICE_DICTIONARY]
      : {};
    const currency = showPrices.value
      ? root.$store.getters[GET_ACTIVE_CURRENCY]
      : null;

    const groupMap: Record<string, CartItemConfigurationGroup> = {};

    for (const stateItem of customizationState.value) {
      if (isFileUploadValue(stateItem.value)) {
        continue;
      }

      const relatedCustomization = customizationDictionary.value[stateItem.customization_id];

      if (!relatedCustomization?.showInCart || !relatedCustomization.optionData) {
        continue;
      }

      const quantityText = stateItem.quantity && stateItem.quantity > 1
        ? `x${stateItem.quantity}`
        : '';

      const isList = !relatedCustomization.optionData.maxValuesCount ||
        relatedCustomization.optionData.maxValuesCount > 1;
      const groupKey = relatedCustomization.name;

      const ensureGroup = (): CartItemConfigurationGroup => {
        if (!groupMap[groupKey]) {
          groupMap[groupKey] = {
            groupKey,
            customizationName: relatedCustomization.name,
            customizationId: relatedCustomization.id,
            isList,
            sn: relatedCustomization.sn,
            properties: []
          };
        } else {
          groupMap[groupKey].isList = groupMap[groupKey].isList || isList;
          groupMap[groupKey].sn = Math.min(groupMap[groupKey].sn, relatedCustomization.sn);
        }

        return groupMap[groupKey];
      };

      if (!relatedCustomization.optionData.values?.length) {
        const value = Array.isArray(stateItem.value)
          ? stateItem.value.join(',')
          : stateItem.value;

        ensureGroup().properties.push({
          id: getPropertyComposedId(value, stateItem.customization_id),
          value: truncate(value),
          sn: relatedCustomization.sn,
          qty: quantityText
        });

        continue;
      }

      const selectedValues = Array.isArray(stateItem.value) ? stateItem.value : [stateItem.value];
      const optionValueKey = getCustomizationValueIdFieldKey(relatedCustomization.optionData);

      const selectedOptionValues = relatedCustomization.optionData.values.filter((optionValue) => {
        const optionValueId = optionValue[optionValueKey];

        if (!optionValueId) {
          return false;
        }

        return selectedValues.includes(optionValueId);
      });

      for (const selectedOptionValue of selectedOptionValues) {
        if (!selectedOptionValue.name) {
          continue;
        }

        let optionPrice = showPrices.value
          ? getOptionValuePrice(selectedOptionValue, productBySkuDictionary, productPriceDictionary)
          : undefined;

        if (optionPrice?.regular === 0) {
          optionPrice = undefined;
        }

        let finalPrice: number | undefined;

        if (optionPrice) {
          const combinedQty = (cartItemQty.value || 1) * (stateItem.quantity || 1);
          finalPrice = PriceHelper.getFinalPrice(optionPrice) * combinedQty;
        }

        ensureGroup().properties.push({
          id: getPropertyComposedId(selectedOptionValue.name, stateItem.customization_id),
          value: selectedOptionValue.name,
          sn: relatedCustomization.sn,
          qty: quantityText,
          finalPriceValue: finalPrice,
          price: finalPrice !== undefined
            ? PriceHelper.formatPrice(finalPrice, currency.symbol)
            : undefined
        });
      }
    }

    const groups = Object.values(groupMap).map((group) => ({
      ...group,
      isList: group.isList || group.properties.length > 1,
      properties: sortProperties(group.properties)
    }));

    const sortedGroups = sortGroups(groups);

    if (cartItemPrice.value) {
      const paidProperties = sortedGroups.reduce<CartItemConfigurationProperty[]>(
        (acc, group) => acc.concat(group.properties.filter((p) => p.finalPriceValue !== undefined)),
        []
      );

      if (paidProperties.length === 1) {
        const cartItemFinalPrice = PriceHelper.getFinalPrice(cartItemPrice.value);

        if (cartItemFinalPrice === paidProperties[0].finalPriceValue) {
          paidProperties[0].price = undefined;
        }
      }
    }

    return sortedGroups;
  });

  const filteredCustomizationGroups = computed<CartItemConfigurationGroup[]>(() => {
    if (!filterOutNameCustomization.value || !nameCustomizationId.value) {
      return customizationGroups.value;
    }

    return customizationGroups.value.filter(
      (group) => group.customizationId !== nameCustomizationId.value
    );
  });

  const hasCustomizableProperties = computed<boolean>(
    () => filteredCustomizationGroups.value.length > 0
  );

  const selectionsCount = computed<number>(() => {
    if (hasCustomizableProperties.value) {
      return filteredCustomizationGroups.value.reduce(
        (total, group) => total + group.properties.length,
        0
      );
    }

    return 0;
  });

  return {
    customizationGroups: filteredCustomizationGroups,
    hasCustomizableProperties,
    nameCustomizationId,
    plushieName,
    selectionsCount,
    truncate
  };
}
