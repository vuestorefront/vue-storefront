<template>
  <div
    class="order-item"
    :class="{ '-extendable': isExtendedInfoAvailable }"
  >
    <div class="_content">
      <div class="_info-container">
        <div class="_image-container">
          <BaseImage
            :lazy="false"
            :src="orderItemImage"
            :alt="item.product.name"
            :aspect-ratio="1"
          />
        </div>

        <div class="_base-info-container">
          <span class="_product-name">
            {{ item.display_id }} - {{ item.product.name }}
          </span>

          <order-item-progress-tracker
            :active-status="progressTrackerActiveStatus"
            :is-vertical="canShowExtendedProgressTracker && showExtendedInfo"
            :filtered-statuses-list="progressTrackerFilteredStatusesList"
            :max-statuses-to-display-horizontal="PROGRESS_TRACKER_MAX_HORIZONTAL_STATUSES_TO_DISPLAY_COUNT"
            v-if="canShowProgressTracker"
          />

          <order-item-shipment-info
            :shipments="item.shipments"
            :estimated-shipment-date="item.estimated_shipment_date"
            v-if="showShipmentInfo"
          />

          <div class="_cancelled" v-if="isOrderCancelledOrOnHold">
            {{ isOrderCancelled ? $t('Order is Cancelled') : $t('Order is On Hold') }}
          </div>

          <order-item-actions
            :actions-list="item.available_actions"
            v-if="showActions"
          />
        </div>
      </div>

      <div
        class="_extended-info"
        v-if="isExtendedInfoAvailable"
      >
        <template>
          <order-item-extended-info
            :extension-attributes="item.extension_attributes"
            v-show="showExtendedInfo"
          />
        </template>
      </div>
    </div>

    <div
      class="_toggle-extended-info"
      v-if="isExtendedInfoAvailable"
      @click="toggleExtendedInfo"
    >
      <SfChevron :class="{'-expanded': showExtendedInfo}" />
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, computed, ref, inject, toRef } from '@vue/composition-api';
import { SfChevron } from '@storefront-ui/vue';

import { BaseImage } from 'src/modules/budsies';
import { getCustomizationSystemThumbnail } from 'src/modules/customization-system';
import { ImageHandlerService } from 'src/modules/file-storage';

import { useOrderItemProgressTracker } from '../composables/use-order-item-progress-tracker';
import { OrderItem } from '../types/order-item';

import OrderItemActions from './order-item-actions.vue';
import OrderItemExtendedInfo from './order-item-extended-info.vue';
import OrderItemProgressTracker from './order-item-progress-tracker.vue';
import OrderItemShipmentInfo from './order-item-shipment-info.vue';

const PROGRESS_TRACKER_MAX_HORIZONTAL_STATUSES_TO_DISPLAY_COUNT = 3;

export default defineComponent({
  name: 'OrderItem',
  components: {
    BaseImage,
    OrderItemActions,
    OrderItemExtendedInfo,
    OrderItemProgressTracker,
    OrderItemShipmentInfo,
    SfChevron
  },
  props: {
    item: {
      type: Object as PropType<OrderItem>,
      required: true
    }
  },
  setup (props) {
    const imageHandlerService = inject<ImageHandlerService>('ImageHandlerService');

    const showExtendedInfo = ref<boolean>(false);
    const showActions = computed<boolean>(() => {
      return props.item.available_actions.length > 0;
    });
    const orderItemImage = computed<string>(() => {
      const defaultImage = props.item.product.thumbnail;

      if (!imageHandlerService) {
        return defaultImage;
      }

      const customizationSystemThumbnail = getCustomizationSystemThumbnail(
        props.item.extension_attributes?.customizations,
        props.item.extension_attributes?.customization_states,
        imageHandlerService
      );

      if (!customizationSystemThumbnail) {
        return defaultImage;
      }

      return customizationSystemThumbnail;
    });

    function toggleExtendedInfo () {
      showExtendedInfo.value = !showExtendedInfo.value;
    }

    const {
      activeStatus: progressTrackerActiveStatus,
      canShowExtendedProgressTracker,
      canShowProgressTracker,
      filteredStatusesList: progressTrackerFilteredStatusesList,
      isOrderCancelled,
      isOrderCancelledOrOnHold
    } = useOrderItemProgressTracker(
      toRef(props, 'item'),
      PROGRESS_TRACKER_MAX_HORIZONTAL_STATUSES_TO_DISPLAY_COUNT
    );

    const isExtendedInfoAvailable = computed<boolean>(() => {
      if (canShowExtendedProgressTracker.value) {
        return true;
      }

      return !!props.item.extension_attributes && !!Object.keys(props.item.extension_attributes).length;
    });

    const showShipmentInfo = computed<boolean>(() => {
      return props.item.shipments.length > 0 || props.item.estimated_shipment_date;
    });

    return {
      canShowExtendedProgressTracker,
      canShowProgressTracker,
      isExtendedInfoAvailable,
      isOrderCancelled,
      isOrderCancelledOrOnHold,
      orderItemImage,
      progressTrackerActiveStatus,
      progressTrackerFilteredStatusesList,
      showActions,
      showExtendedInfo,
      showShipmentInfo,
      toggleExtendedInfo,
      PROGRESS_TRACKER_MAX_HORIZONTAL_STATUSES_TO_DISPLAY_COUNT
    }
  }
})
</script>

<style lang="scss" scoped>
.order-item {
  display: flex;
  border: 1px solid var(--c-secondary);
  padding: var(--spacer-sm) var(--spacer-xs);

  &.-extendable {
    padding-right: 0;
  }

  ._content {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  ._info-container {
    display: flex;
    column-gap: var(--spacer-sm);
  }

  ._product-name {
    font-weight: bold;
  }

  ._image-container {
    display: flex;
    align-items: flex-start;
    flex: 1;
  }

  ._base-info-container {
    flex: 4;
    display: flex;
    flex-direction: column;
    row-gap: var(--spacer-sm);
  }

  ._toggle-extended-info {
    width: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  ._mobile-image {
    width: 72px;
  }

  .sf-chevron {
    &.-expanded {
      rotate: 180deg;
    }
  }

  .order-item-extended-info {
    margin-top: var(--spacer-base);
  }

  .order-item-progress-tracker {
    max-width: 370px;
  }

  ._extended-info {
    display: flex;
    flex-direction: column;
    row-gap: var(--spacer-sm);
  }

  @media (min-width: 426px) {
    padding: var(--spacer-sm);
  }
}
</style>
