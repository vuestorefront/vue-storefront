<template>
  <div class="order-item-extended-info">
    <div
      class="_section"
      v-if="canShowProgressTracker"
    >
      <div class="_heading-container">
        <SfHeading class="_heading" :title="$t('Progress Tracker')" :level="5" />
      </div>

      <order-item-progress-tracker
        class="_section-content"
        :active-status="activeStatus"
        :is-vertical="true"
        :filtered-statuses-list="filteredStatusesList"
      />
    </div>

    <div
      class="_section"
      v-if="showShipmentInfo"
    >
      <div class="_heading-container">
        <SfHeading class="_heading" :title="$t('Shipment information')" :level="5" />
      </div>

      <order-item-shipment-info
        :shipments="item.shipments"
        :estimated-shipment-date="item.estimated_shipment_date"
        class="_section-content"
      />
    </div>

    <div class="_section">
      <div
        class="_heading-container"
        v-if="showShipmentInfo"
      >
        <SfHeading class="_heading" :title="$t('Item details')" :level="5" />
      </div>

      <div class="_section-content">
        <div class="_quantity">
          {{ $t('Quantity') + ': ' + item.quantity }}
        </div>

        <cart-item-configuration
          :customizations="customizations"
          :customization-state="customizationState"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from '@vue-storefront/core/application-services';
import { PropType, computed, defineComponent, toRef, ComputedRef } from 'vue';
import { SfHeading } from '@storefront-ui/vue';

import Product from '@vue-storefront/core/modules/catalog/types/Product';
import { CartItemConfiguration, CustomizationStateItem, Customization } from 'src/modules/customization-system';

import { OrderItem } from '../types/order-item';

import OrderItemShipmentInfo from './order-item-shipment-info.vue';
import { useOrderItemProgressTracker } from '../composables/use-order-item-progress-tracker';
import OrderItemProgressTracker from './order-item-progress-tracker.vue';

export default defineComponent({
  name: 'OrderItemExtendedInfo',
  components: {
    CartItemConfiguration,
    OrderItemShipmentInfo,
    OrderItemProgressTracker,
    SfHeading
  },
  props: {
    item: {
      type: Object as PropType<OrderItem>,
      required: true
    }
  },
  setup (props) {
    const applicationStore = useStore();
    const customizationState = computed<CustomizationStateItem[]>(() => {
      return (props.item.extension_attributes && props.item.extension_attributes.customization_states) || [];
    });

    const productBySkuDictionary: ComputedRef<Record<string, Product>> = computed(() => {
      return applicationStore.getters['product/getProductBySkuDictionary'] || {};
    });

    const customizations = computed<Customization[]>(() => {
      const productCustomizations = (props.item.extension_attributes && props.item.extension_attributes.customizations) || [];

      const alterationProductData = props.item.extension_attributes?.alteration_product;
      const extraChargesProductData = props.item.extension_attributes?.manufacturing_extra_charge_product;

      const alterationProduct = alterationProductData?.sku ? productBySkuDictionary.value[alterationProductData.sku] : undefined;
      const extraChargesProduct = extraChargesProductData?.sku ? productBySkuDictionary.value[extraChargesProductData.sku] : undefined;

      return [...productCustomizations, ...(alterationProduct?.customizations || []), ...(extraChargesProduct?.customizations || [])];
    });

    const {
      activeStatus,
      filteredStatusesList,
      canShowProgressTracker
    } = useOrderItemProgressTracker(toRef(props, 'item'), 0);

    const showShipmentInfo = computed<boolean>(() => {
      return canShowProgressTracker.value && (props.item.shipments.length > 0 || Boolean(props.item.estimated_shipment_date));
    });

    return {
      customizations,
      customizationState,
      activeStatus,
      filteredStatusesList,
      canShowProgressTracker,
      showShipmentInfo
    }
  }
})

</script>

<style lang="scss" scoped>
.order-item-extended-info {
  ._section {
    margin-top: var(--spacer-base);

    &:first-child {
      margin-top: 0;
    }
  }

  ._heading-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  ._heading {
    --heading-padding: 0;
    --heading-title-font-size: var(--font-size-base);
    text-align: start;
  }

  ._section-content {
    margin-top: var(--spacer-xs);
  }

  .cart-item-configuration {
    --cart-item-configuration-font-size: var(--font-size-base);
  }
}
</style>
