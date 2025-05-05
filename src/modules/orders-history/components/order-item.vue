<template>
  <div class="order-item">
    <div class="_content">
      <div class="_info-container">
        <div class="_image-container desktop-only">
          <BaseImage
            :lazy="false"
            :src="orderItemImage"
            :alt="item.product.name"
            :aspect-ratio="1"
          />
        </div>

        <div class="_base-info-container">
          <order-item-base-info
            :product-name="item.product.name"
            :item-display-id="item.display_id"
            :shipments="item.shipments"
            :estimated-shipment-date="item.estimated_shipment_date"
          >
            <template #image>
              <BaseImage
                class="_mobile-image mobile-only"
                :lazy="false"
                :src="orderItemImage"
                :alt="item.product.name"
                :aspect-ratio="1"
              />
            </template>
          </order-item-base-info>

          <order-item-progress-tracker
            :progress-tracker="item.progress_tracker"
            v-if="showProgressTracker"
          />

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
import { PropType, defineComponent, computed, ref, inject } from '@vue/composition-api';
import { SfChevron } from '@storefront-ui/vue';

import { BaseImage } from 'src/modules/budsies';
import { getCustomizationSystemThumbnail } from 'src/modules/customization-system';
import { ImageHandlerService } from 'src/modules/file-storage';

import { OrderItem } from '../types/order-item';

import OrderItemBaseInfo from './order-item-base-info.vue';
import OrderItemExtendedInfo from './order-item-extended-info.vue';
import OrderItemProgressTracker from './order-item-progress-tracker.vue';
import OrderItemActions from './order-item-actions.vue';

export default defineComponent({
  name: 'OrderItem',
  components: {
    BaseImage,
    OrderItemActions,
    OrderItemBaseInfo,
    OrderItemExtendedInfo,
    OrderItemProgressTracker,
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
    const showProgressTracker = computed<boolean>(() => {
      return props.item.available_actions.every(
        (item) => {
          return !item.blocking_progress;
        }
      );
    });
    const showActions = computed<boolean>(() => {
      return props.item.available_actions.length > 0;
    });
    const isExtendedInfoAvailable = computed<boolean>(() => {
      return !!props.item.extension_attributes && !!Object.keys(props.item.extension_attributes).length;
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

    return {
      isExtendedInfoAvailable,
      orderItemImage,
      showActions,
      showExtendedInfo,
      showProgressTracker,
      toggleExtendedInfo
    }
  }
})
</script>

<style lang="scss" scoped>
.order-item {
  display: flex;
  border: 1px solid var(--c-secondary);
  padding: var(--spacer-sm) 0 var(--spacer-sm) var(--spacer-xs);

  ._content {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  ._info-container {
    display: flex;
    column-gap: var(--spacer-sm);
  }

  ._image-container {
    display: flex;
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

  @media (min-width: 426px) {
    padding: var(--spacer-sm) 0 var(--spacer-sm) var(--spacer-sm);
  }
}
</style>
