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
        v-for="group in inlineGroups"
        :key="group.customizationId"
        class="collected-product__properties"
      >
        <span class="_customization-name">{{ group.customizationName }}:</span>

        <span>
          {{ group.properties[0].value }}
        </span>

        <span
          v-if="group.properties[0].qty"
          class="_quantity"
        >
          {{ group.properties[0].qty }}
        </span>
      </div>

      <div
        v-for="group in listGroups"
        :key="group.customizationId"
        class="collected-product__properties -list"
      >
        <span class="_customization-name">{{ group.customizationName }}:</span>

        <ul class="_customization-values-list">
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
          </li>
        </ul>
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
import { SfIcon, SfProperty } from '@storefront-ui/vue';
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
import { useMobileObserver } from 'src/modules/shared';

interface CustomizableProperty {
  id: string,
  value: string,
  isTextValue: boolean,
  sn: number,
  qty: string
}

interface CustomizationGroup {
  customizationId: string,
  customizationName: string,
  isList: boolean,
  sn: number,
  properties: CustomizableProperty[]
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
  setup (props) {
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

        const ensureGroup = (): CustomizationGroup => {
          if (!groupMap[customizationStateItem.customization_id]) {
            groupMap[customizationStateItem.customization_id] = {
              customizationId: customizationStateItem.customization_id,
              customizationName: relatedCustomization.name,
              isList,
              sn: relatedCustomization.sn,
              properties: []
            };
          }

          return groupMap[customizationStateItem.customization_id];
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
            isTextValue: true,
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

          ensureGroup().properties.push({
            id: getCustomizablePropertyComposedId(
              selectedOptionValue.name,
              customizationStateItem.customization_id
            ),
            value: selectedOptionValue.name,
            sn: relatedCustomization.sn,
            isTextValue: false,
            qty: quantityText
          });
        }
      }

      return Object.values(groupMap).sort((a, b) => a.sn - b.sn);
    });

    const inlineGroups = computed<CustomizationGroup[]>(() => {
      return customizationGroups.value.filter((group) => !group.isList);
    });

    const listGroups = computed<CustomizationGroup[]>(() => {
      return customizationGroups.value.filter((group) => group.isList);
    });

    const hasCustomizableProperties = computed<boolean>(() => {
      return customizationGroups.value.length > 0;
    });

    return {
      ...useEstimatedShipment(toRef(props, 'estimatedShipment')),
      inlineGroups,
      listGroups,
      hasCustomizableProperties
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
    display: block;

    &.-list {
      gap: var(--spacer-xs);
      flex-direction: column;
      display: flex;
    }
  }

  ._customization-values-list {
    padding: 0;
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
}
</style>
