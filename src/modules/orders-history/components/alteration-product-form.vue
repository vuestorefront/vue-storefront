<template>
  <div
    class="alteration-product-form"
    v-if="showBlock"
  >
    <div class="_heading-container">
      <SfHeading
        class="_heading"
        :level="5"
        :title="$t('Upgrade Your Plush')"
      />

      <template v-if="collapsedViewItems.length > 0">
        <SfButton
          v-if="!isExpanded"
          class="sf-button--text"
          @click="onShowDetailsClick"
        >
          {{ $t('Show More') }}
        </SfButton>

        <SfButton
          v-else
          class="sf-button--text"
          @click="onHideDetailsClick"
        >
          {{ $t('Show Less') }}
        </SfButton>
      </template>
    </div>

    <div
      class="_collapsed-preview"
      :class="{ '-hidden': isExpanded || collapsedViewItems.length == 0 }"
    >
      <div class="_products">
        <o-product-card
          v-for="item in collapsedViewItems"
          :key="item.id"
          :product="item"
          :wishlist-icon="false"
          :image-width="144"
          :image-height="144"
          class="_product"
          @click.native.prevent="onShowDetailsClick"
        />
      </div>
    </div>

    <div
      class="_content"
      :class="{ '-expanded': isExpanded || collapsedViewItems.length == 0 }"
      :style="contentStyle"
      @transitionend="onTransitionEnd"
      ref="contentBlock"
    >
      <validation-observer
        v-slot="{ errors: formErrors }"
        tag="form"
        ref="validationObserver"
        @submit.prevent.native="onAddToCart"
      >
        <div
          class="_customization"
          v-for="customization in filteredCustomizations"
          :key="customization.id"
        >
          <customization-option
            class="_customization-option"
            ref="customizationOption"
            :customization="customization"
            :is-disabled="isSomeEntityBusy || isSubmitting || customizationDisableConfigById[customization.id].isDisabled"
            :option-values="filteredOptionValues[customization.id]"
            :product-id="Number(alterationProduct.id)"
            :value="customizationOptionValue[customization.id]"
            :disable-validation="false"
            :customization-disable-config="customizationDisableConfigById[customization.id]"
            @input="onCustomizationOptionInput"
            @customization-option-busy-state-changed="onEntityBusyChanged"
          >
            <template #label="{label, isFieldRequired}">
              <label
                class="_option-label"
                :class="{ '-required': isFieldRequired && !customizationDisableConfigById[customization.id].isDisabled}"
              >
                {{ label }}

                <span
                  class="_disabled-hint"
                  v-if="customizationDisableConfigById[customization.id].isDisabled"
                >
                  {{ customizationDisableConfigById[customization.id].message }}
                </span>
              </label>
            </template>
          </customization-option>
        </div>

        <m-form-errors
          class="_form-errors"
          :form-errors="formErrors"
          @item-click="goToFieldByName"
        />

        <div class="_buttons">
          <SfButton
            class="_add-to-cart color-primary"
            type="submit"
            :disabled="!canAddToCart || isSubmitting"
          >
            {{ $t('Add to Cart') }}
          </SfButton>
        </div>
      </validation-observer>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  Ref,
  ref,
  toRefs
} from '@vue/composition-api';
import { SfButton, SfHeading } from '@storefront-ui/vue';
import { ValidationObserver } from 'vee-validate';
import Product from '@vue-storefront/core/modules/catalog/types/Product';

import {
  Customization,
  CustomizationOptionValue,
  isFileUploadValue,
  requiredCustomizationsFilter,
  useAvailableCustomizations,
  useAvailableOptionsValuesFilter,
  useCustomizationsBundleOptions,
  useCollapsedCustomizationsView,
  useCustomizationsFilter,
  useCustomizationsOptionsDefaultValue,
  useCustomizationState,
  useEntityBusyState,
  useExistingcartItemCustomizationsDisable,
  useOptionValueActions
} from 'src/modules/customization-system';

import { useAddToCart } from 'theme/helpers/use-add-to-cart';
import { useExistingCartItem } from 'theme/helpers/use-existing-cart-item';
import { useFormValidation } from 'theme/helpers/use-form-validation';
import CustomizationOption from 'theme/components/customization-system/customization-option.vue';
import MFormErrors from 'theme/components/molecules/m-form-errors.vue';
import OProductCard from 'theme/components/organisms/o-product-card.vue';

import { useAlterationProductCustomizations } from '../composables/use-alteration-product-customizations';
import { canOrderItemHaveUpgrades } from '../helpers/can-order-item-have-upgrades';
import { OrderItem } from '../types/order-item';

function getAllFormRefs (
  refs: Record<string, Vue | Element | Vue[] | Element[]>
): Record<string, Vue | Element | Vue[] | Element[]> {
  let refsDictionary: Record<string, Vue | Element | Vue[] | Element[]> = {};
  const customizationOptions = refs['customizationOption'] as InstanceType<
    typeof CustomizationOption
  >[];

  for (const customizationOption of customizationOptions) {
    for (const key in customizationOption.$refs) {
      refsDictionary[key] = customizationOption.$refs[key];
    }
  }

  return refsDictionary;
}

export default defineComponent({
  name: 'AlterationProductForm',
  components: {
    CustomizationOption,
    MFormErrors,
    OProductCard,
    SfButton,
    SfHeading,
    ValidationObserver
  },
  props: {
    orderItem: {
      type: Object as PropType<OrderItem>,
      required: true
    },
    alterationProduct: {
      type: Object as PropType<Product | undefined>,
      default: undefined
    }
  },
  setup (props, context) {
    const { orderItem, alterationProduct } = toRefs(props);
    const isExpanded = ref(false);
    const contentBlock: Ref<HTMLElement | null> = ref(null);
    const validationObserver: Ref<InstanceType<typeof ValidationObserver> | null> = ref(null);
    const contentStyle: Ref<Record<string, string>> = ref({
      '--content-max-height': '0px',
      '--content-max-height-collapsed': '0px'
    });

    const plushieId = computed<string | undefined>(() => {
      return orderItem.value.plushie_id?.toString();
    });

    const { existingCartItem } = useExistingCartItem(plushieId, context);

    const productCustomizations = computed<Customization[]>(() => {
      return props.alterationProduct?.customizations || [];
    });

    const productCustomization = computed<Record<string, Customization>>(() => {
      const dictionary: Record<string, Customization> = {};

      for (const customization of productCustomizations.value) {
        dictionary[customization.id] = customization;
      }

      return dictionary;
    });

    const {
      addCustomizationOptionValue,
      customizationOptionValue,
      customizationState,
      existingCartItemCustomizationOptionValue,
      removeCustomizationOptionValue,
      selectedOptionValuesIds,
      updateCustomizationOptionValue
    } = useCustomizationState(existingCartItem);

    const {
      availableCustomizations,
      availableOptionValues,
      customizationAvailableOptionValues
    } = useAvailableCustomizations(
      productCustomizations,
      selectedOptionValuesIds,
      customizationOptionValue,
      updateCustomizationOptionValue
    );

    const {
      customizationsFilter: alterationProductCustomizationsFilter,
      optionValuesFilter
    } = useAlterationProductCustomizations(
      orderItem,
      alterationProduct,
      existingCartItem
    );

    const { customizationDisableConfigById } = useExistingcartItemCustomizationsDisable(
      availableCustomizations,
      existingCartItemCustomizationOptionValue,
      context.root.$t('Added to Cart').toString()
    );

    const { executeActionsByCustomizationIdAndCustomizationOptionValue } =
      useOptionValueActions(
        productCustomizations,
        productCustomization,
        customizationAvailableOptionValues,
        updateCustomizationOptionValue,
        removeCustomizationOptionValue,
        addCustomizationOptionValue
      );

    const { isSomeEntityBusy, onEntityBusyChanged } = useEntityBusyState();

    const formValidation = useFormValidation(validationObserver, () =>
      getAllFormRefs(context.refs)
    );

    function onCustomizationOptionInput (payload: {
      customizationId: string,
      value: CustomizationOptionValue
    }) {
      updateCustomizationOptionValue(payload);
      executeActionsByCustomizationIdAndCustomizationOptionValue(payload);
    }

    useCustomizationsOptionsDefaultValue(
      availableCustomizations,
      customizationAvailableOptionValues,
      customizationOptionValue,
      onCustomizationOptionInput
    );

    const { filteredOptionValues, filteredOptionValuesIdsByCustomizationId } = useAvailableOptionsValuesFilter(
      customizationAvailableOptionValues,
      [optionValuesFilter]
    );

    const { filteredCustomizations } = useCustomizationsFilter(
      availableCustomizations,
      customizationAvailableOptionValues,
      [requiredCustomizationsFilter, alterationProductCustomizationsFilter]
    );

    const { bundleOptions } = useCustomizationsBundleOptions(
      productCustomizations,
      customizationOptionValue,
      availableOptionValues
    );

    const quantity = ref(1);

    const { addToCartHandler, isSubmitting } = useAddToCart(
      alterationProduct,
      quantity,
      customizationState,
      bundleOptions,
      existingCartItem,
      context,
      plushieId.value
    );

    const canAddToCart = computed<boolean>(() => {
      if (selectedOptionValuesIds.value.length === 0) {
        return false;
      }

      const existingCartItemCustomizationState = existingCartItem.value?.extension_attributes?.customization_state || [];
      const existingCartItemOptionValuesId: Record<string, boolean> = {};

      for (const item of existingCartItemCustomizationState) {
        if (isFileUploadValue(item.value)) {
          continue;
        }

        if (Array.isArray(item.value)) {
          for (const value of item.value) {
            existingCartItemOptionValuesId[value] = true;
          }
          continue;
        }

        existingCartItemOptionValuesId[item.value] = true;
      }

      if (Object.keys(existingCartItemOptionValuesId).length === 0) {
        return selectedOptionValuesIds.value.length > 0;
      }

      return selectedOptionValuesIds.value.some((id) => !existingCartItemOptionValuesId[id]);
    });

    const hasAvailableUpgrades = computed<boolean>(() => {
      return filteredCustomizations.value.length > 0;
    });

    const showBlock = computed<boolean>(() => {
      if (!alterationProduct.value) {
        return false;
      }

      if (!canOrderItemHaveUpgrades(orderItem.value)) {
        return false;
      }

      return hasAvailableUpgrades.value;
    });

    const { collapsedViewItems } = useCollapsedCustomizationsView(
      filteredCustomizations,
      existingCartItemCustomizationOptionValue,
      filteredOptionValuesIdsByCustomizationId,
      context
    );

    function onTransitionEnd () {
      contentStyle.value = {
        '--content-max-height': 'auto',
        '--content-max-height-collapsed': '0px'
      };
    }

    function onShowDetailsClick () {
      isExpanded.value = true;

      if (contentBlock.value) {
        const scrollHeight = contentBlock.value.scrollHeight;
        contentStyle.value = {
          '--content-max-height': `${scrollHeight}px`,
          '--content-max-height-collapsed': '0px'
        };
      }
    }

    function onHideDetailsClick () {
      isExpanded.value = false;
    }

    async function onAddToCart () {
      if (!canAddToCart.value || isSubmitting.value) {
        return;
      }

      const isValid = await formValidation.validateAndGoToFirstError();

      if (!isValid) {
        return;
      }

      await addToCartHandler();
    }

    return {
      ...formValidation,
      canAddToCart,
      collapsedViewItems,
      contentStyle,
      contentBlock,
      customizationDisableConfigById,
      filteredOptionValues,
      customizationOptionValue,
      isExpanded,
      isSomeEntityBusy,
      isSubmitting,
      onAddToCart,
      onCustomizationOptionInput,
      onEntityBusyChanged,
      onHideDetailsClick,
      onShowDetailsClick,
      onTransitionEnd,
      showBlock,
      filteredCustomizations,
      validationObserver
    };
  }
});
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.alteration-product-form {
  ._heading-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: var(--spacer-sm);
  }

  ._heading {
    --heading-title-font-size: var(--font-base);
    --heading-title-font-weight: var(--font-semibold);
    --heading-title-margin: 0;
    --heading-padding: 0;

    text-align: left;
  }

  ._collapsed-preview {
    display: flex;
    flex-direction: column;

    &.-hidden {
      display: none;
    }
  }

  ._products {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin-top: var(--spacer-sm);
    column-gap: var(--spacer-sm);
  }

  ._product {
    --o-product-card-badge-size: 48px;
    --product-card-title-font-size: var(--font-size-base);
    --price-regular-font-size: var(--font-size-base);
    --price-special-font-size: var(--font-size-base);
    --price-old-font-size: var(--font-size-base);
    --product-card-title-font-line-height: 1.2;

    max-width: 160px;

    ::v-deep {
      .sf-product-card {
        --product-card-padding: var(--spacer-xs);
      }

      .sf-badge {
        z-index: 2;
      }

      .base-image {
        width: 100%;
      }

      .sf-price {
        flex-wrap: wrap;
      }
    }
  }

  ._disabled-hint {
    color: var(--c-accent);
    font-size: var(--font-base);
  }

  ._content {
    display: flex;
    flex-direction: column;
    row-gap: var(--spacer-base);
    max-height: var(--content-max-height-collapsed);
    overflow: hidden;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 24px;
      box-shadow: inset 0 -12px 12px 4px var(--c-white);
    }

    &.-expanded {
      max-height: var(--content-max-height);
      will-change: max-height;
      transition: max-height 0.3s ease;

      &::after {
        display: none;
      }
    }
  }

  ._customization,
  ._form-errors {
    margin-top: var(--spacer-base);
  }

  ._buttons {
    display: flex;
    justify-content: flex-end;
    gap: var(--spacer-sm);
    margin-top: var(--spacer-base);
  }

  ._customization-option {
    --customization-option-align-items: flex-start;
    --customization-option-label-align: left;
    --customization-option-label-weight: var(--font-medium);
    --customization-option-label-size: var(--font-base);
    --customization-option-description-align: left;
    --customization-option-hint-align: left;

    --customization-option-hint-display: none;
    --customization-option-description-display: none;

    &.-widget-CardsListWidget {
      width: 100%;

      ::v-deep {
        ._widget {
          width: 100%;
        }
      }
    }
  }

  @media (max-width: $mobile-max) {
    ._products {
      grid-template-columns: repeat(3, 1fr);
      column-gap: var(--spacer-xs);
    }

    ._product:nth-child(n+4) {
      display: none;
    }
  }
}
</style>
