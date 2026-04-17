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
        class="collected-product__properties"
        v-for="textProperty in textProperties"
        :key="textProperty.id"
      >
        {{ truncate(textProperty.value) }}
      </div>

      <div
        class="collected-product__properties"
        v-for="optionValueProperty in optionValueProperties"
        :key="optionValueProperty.id"
      >
        <SfIcon
          icon="check"
          size="xxs"
          class="collected-product__properties__icon"
        />
        {{ optionValueProperty.value }}
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
  sn: number
}

function getCustomizablePropertyComposedId (
  optionValue: string,
  customizationId: string
): string {
  return `${customizationId}-${optionValue}`;
}

function formatOptionValueName (name: string, quantity?: number): string {
  if (!quantity || quantity <= 1) {
    return name;
  }

  return `${name} x${quantity}`;
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

    const customizableProperties = computed<CustomizableProperty[]>(() => {
      const properties: CustomizableProperty[] = [];

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

        if (!relatedCustomization.optionData.values?.length) {
          const value = Array.isArray(customizationStateItem.value)
            ? customizationStateItem.value.join(',')
            : customizationStateItem.value;

          properties.push({
            id: getCustomizablePropertyComposedId(
              value,
              customizationStateItem.customization_id
            ),
            value,
            sn: relatedCustomization.sn,
            isTextValue: true
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

          const value = formatOptionValueName(
            selectedOptionValue.name,
            customizationStateItem.qty
          );

          properties.push({
            id: getCustomizablePropertyComposedId(
              value,
              customizationStateItem.customization_id
            ),
            value,
            sn: relatedCustomization.sn,
            isTextValue: false
          });
        }
      }

      properties.sort((a, b) => a.sn - b.sn);

      return properties;
    });

    const hasCustomizableProperties = computed<boolean>(() => {
      return customizableProperties.value.length > 0;
    });

    const textProperties = computed<CustomizableProperty[]>(() => {
      return customizableProperties.value.filter(
        ({ isTextValue }) => isTextValue
      );
    });

    const optionValueProperties = computed<CustomizableProperty[]>(() => {
      return customizableProperties.value.filter(
        ({ isTextValue }) => !isTextValue
      );
    });

    function truncate (text: string, desktopLength = 75, mobileLength = 50) {
      const maxLength = isMobile.value ? mobileLength : desktopLength;

      if (text.length <= maxLength) {
        return text;
      }

      return text.substring(0, maxLength) + '...';
    }

    return {
      ...useEstimatedShipment(toRef(props, 'estimatedShipment')),
      customizableProperties,
      hasCustomizableProperties,
      optionValueProperties,
      textProperties,
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
    flex-direction: row;
    align-items: center;
    gap: var(--spacer-xs);
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
}
</style>
