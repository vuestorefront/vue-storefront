<template>
  <div class="cart-item-configuration">
    <div class="_shipment">
      <div
        class="collected-product__properties _shipment-promise"
        v-html="shipmentPromiseText"
        v-if="shipmentPromiseText"
      />

      <div
        class="collected-product__properties _offer-expiration-date-text"
        v-if="offerExpirationDateText"
      >
        {{ offerExpirationDateText }}
      </div>
    </div>

    <template v-if="hasCustomizableProperties">
      <div
        v-for="group in customizationGroups"
        :key="group.customizationId"
        :class="[
          'collected-product__properties',
          { '-list': group.isList }
        ]"
      >
        <span class="_customization-name">{{ group.customizationName }}:</span>

        <ul
          v-if="group.isList"
          class="_customization-values-list"
        >
          <li
            v-for="property in group.properties"
            :key="property.id"
            class="collected-product__properties"
          >
            <SfIcon
              icon="check"
              size="xxs"
              class="collected-product__properties__icon"
            />

            {{ property.value }}

            <span
              v-if="property.qty"
              class="_quantity"
            >
              {{ property.qty }}
            </span>
            <SfPrice
              v-if="property.regularPrice"
              class="_option-price"
              :regular="property.regularPrice"
              :special="property.specialPrice"
            />
          </li>
        </ul>

        <template v-else>
          <span>
            {{ group.properties[0].value }}
          </span>

          <span
            v-if="group.properties[0].qty"
            class="_quantity"
          >
            {{ group.properties[0].qty }}
          </span>

          <SfPrice
            v-if="group.properties[0].regularPrice"
            class="_option-price"
            :regular="group.properties[0].regularPrice"
            :special="group.properties[0].specialPrice"
          />
        </template>
      </div>
    </template>

    <template v-else>
      <div
        v-for="option in productOptions"
        :key="option.label"
        class="collected-product__properties"
      >
        <SfProperty
          v-if="option.isCustom"
          :name="option.label"
          :value="option.value"
        />

        <div v-else>
          {{ truncate(option.value) }}
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { SfIcon, SfPrice, SfProperty } from '@storefront-ui/vue';
import {
  computed,
  defineComponent,
  PropType,
  toRef
} from '@vue/composition-api';

import {
  Customization,
  CustomizationStateItem,
  EstimatedShipment,
  getCustomizationValueIdFieldKey,
  isFileUploadValue,
  useEstimatedShipment
} from 'src/modules/customization-system';
import { PriceHelper, useMobileObserver } from 'src/modules/shared';
import { GET_ACTIVE_CURRENCY } from 'src/modules/currency';
import { PRODUCT_LOCALIZED_PRICE_DICTIONARY } from '@vue-storefront/core/modules/catalog';
import { getOptionValuePrice } from '../helpers/get-option-value-price';

interface CustomizableProperty {
  id: string,
  value: string,
  sn: number,
  qty: string,
  regularPrice?: string,
  specialPrice?: string | null
}

interface CustomizationGroup {
  customizationId: string,
  customizationName: string,
  isList: boolean,
  sn: number,
  properties: CustomizableProperty[]
}

function sortCustomizationGroups (
  groups: CustomizationGroup[]
): CustomizationGroup[] {
  return groups.sort((leftGroup, rightGroup) => {
    if (leftGroup.sn === rightGroup.sn) {
      return leftGroup.customizationName.localeCompare(rightGroup.customizationName);
    }

    return leftGroup.sn - rightGroup.sn;
  });
}

function sortCustomizableProperties (
  properties: CustomizableProperty[]
): CustomizableProperty[] {
  return properties.sort((leftProperty, rightProperty) => {
    if (leftProperty.sn === rightProperty.sn) {
      return leftProperty.value.localeCompare(rightProperty.value);
    }

    return leftProperty.sn - rightProperty.sn;
  });
}

function getCustomizablePropertyComposedId (
  optionValue: string,
  customizationId: string
): string {
  return `${customizationId}-${optionValue}`;
}

export default defineComponent({
  name: 'CartItemConfiguration',
  components: {
    SfIcon,
    SfPrice,
    SfProperty
  },
  props: {
    customizations: {
      type: Array as PropType<Customization[]>,
      default: () => []
    },
    customizationState: {
      type: Array as PropType<CustomizationStateItem[]>,
      default: () => []
    },
    estimatedShipment: {
      type: Object as PropType<EstimatedShipment | undefined>,
      default: undefined
    },
    productOptions: {
      type: Array as PropType<
      { value: string, label: string, isCustom?: boolean }[]
      >,
      default: () => []
    }
  },
  setup (props, { root }) {
    const { isMobile } = useMobileObserver();

    const customizationDictionary = computed<Record<string, Customization>>(
      () => {
        const dictionary: Record<string, Customization> = {};

        for (const customization of props.customizations) {
          dictionary[customization.id] = customization;
        }

        return dictionary;
      }
    );

    function truncate (text: string, desktopLength = 75, mobileLength = 50) {
      const maxLength = isMobile.value ? mobileLength : desktopLength;

      if (text.length <= maxLength) {
        return text;
      }

      return text.substring(0, maxLength) + '...';
    }

    const customizationGroups = computed<CustomizationGroup[]>(() => {
      const productBySkuDictionary = root.$store.getters['product/getProductBySkuDictionary'];
      const productPriceDictionary = root.$store.getters[PRODUCT_LOCALIZED_PRICE_DICTIONARY];
      const currency = root.$store.getters[GET_ACTIVE_CURRENCY];
      const groupMap: Record<string, CustomizationGroup> = {};

      for (const customizationStateItem of props.customizationState) {
        if (isFileUploadValue(customizationStateItem.value)) {
          continue;
        }

        const relatedCustomization =
          customizationDictionary.value[customizationStateItem.customization_id];

        if (
          !relatedCustomization?.showInCart ||
          !relatedCustomization.optionData
        ) {
          continue;
        }

        const quantityText = customizationStateItem.quantity && customizationStateItem.quantity > 1
          ? `x${customizationStateItem.quantity}`
          : '';

        const isList = !relatedCustomization.optionData.maxValuesCount ||
          relatedCustomization.optionData.maxValuesCount > 1;
        const groupKey = relatedCustomization.name;

        const ensureGroup = (): CustomizationGroup => {
          if (!groupMap[groupKey]) {
            groupMap[groupKey] = {
              customizationId: groupKey,
              customizationName: relatedCustomization.name,
              isList,
              sn: relatedCustomization.sn,
              properties: []
            };
          } else {
            groupMap[groupKey].isList = groupMap[groupKey].isList || isList;
            groupMap[groupKey].sn = Math.min(
              groupMap[groupKey].sn,
              relatedCustomization.sn
            );
          }

          return groupMap[groupKey];
        };

        if (!relatedCustomization.optionData.values?.length) {
          const value = Array.isArray(customizationStateItem.value)
            ? customizationStateItem.value.join(',')
            : customizationStateItem.value;

          ensureGroup().properties.push({
            id: getCustomizablePropertyComposedId(
              value,
              customizationStateItem.customization_id
            ),
            value: truncate(value),
            sn: relatedCustomization.sn,
            qty: quantityText
          });

          continue;
        }

        const selectedValues = Array.isArray(customizationStateItem.value)
          ? customizationStateItem.value
          : [customizationStateItem.value];
        const optionValueKey = getCustomizationValueIdFieldKey(
          relatedCustomization.optionData
        );

        const selectedOptionValues =
          relatedCustomization.optionData.values.filter((optionValue) => {
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

          const optionPrice = getOptionValuePrice(
            selectedOptionValue,
            productBySkuDictionary,
            productPriceDictionary
          );

          ensureGroup().properties.push({
            id: getCustomizablePropertyComposedId(
              selectedOptionValue.name,
              customizationStateItem.customization_id
            ),
            value: selectedOptionValue.name,
            sn: relatedCustomization.sn,
            qty: quantityText,
            regularPrice: optionPrice?.regular
              ? PriceHelper.formatPrice(optionPrice.regular, currency.symbol)
              : undefined,
            specialPrice: optionPrice?.regular && optionPrice.special !== null
              ? PriceHelper.formatPrice(optionPrice.special, currency.symbol)
              : null
          });
        }
      }

      const groups = Object.values(groupMap).map((group) => ({
        ...group,
        isList: group.isList || group.properties.length > 1,
        properties: sortCustomizableProperties(group.properties)
      }));

      return sortCustomizationGroups(groups);
    });

    const hasCustomizableProperties = computed<boolean>(() => {
      return customizationGroups.value.length > 0;
    });

    return {
      ...useEstimatedShipment(toRef(props, 'estimatedShipment')),
      customizationGroups,
      hasCustomizableProperties,
      truncate
    };
  }
});
</script>

<style lang="scss" scoped>
.cart-item-configuration {
  --property-name-font-size: var(--font-xs);
  --property-value-font-size: var(--font-xs);

  .collected-product__properties {
    font-size: var(--cart-item-configuration-font-size, var(--font-xs));
    margin-bottom: var(--spacer-xs);
    display: flex;
    align-items: center;
    gap: var(--spacer-xs);

    &.-list {
      gap: var(--spacer-xs);
      flex-direction: column;
      align-items: flex-start;
      display: flex;
    }
  }

  ._customization-values-list {
    padding: 0;
    width: 100%;

    li {
      display: flex;
      align-items: center;
      width: 100%;
    }
  }

  ._customization-value {
    list-style: none;
    margin-bottom: var(--spacer-xs);
  }

  .collected-product__properties__icon {
    display: inline-block;

    --icon-color: var(--cart-item-configuration-checkmark-color, var(--c-primary));
  }

  ._shipment {
    margin-bottom: var(--spacer-xs);
  }

  ._shipment-promise,
  ._offer-expiration-date-text {
    margin-bottom: 0;
  }

  ._customization-name,
  ._quantity {
    font-weight: var(--font-bold);
  }

  ._option-price {
    display: inline-block;
    margin-left: auto;
    --price-regular-font-size: var(--cart-item-configuration-font-size, var(--font-xs));
    --price-special-font-size: var(--cart-item-configuration-font-size, var(--font-xs));
    --price-old-font-size: var(--cart-item-configuration-font-size, var(--font-xs));
  }
}
</style>
