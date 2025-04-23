<template>
  <div class="order-item-base-info">
    <span class="_product-name">
      {{ productName }}
    </span>

    <span class="_estimated-shipment-date" v-if="showEstimatedShipmentDate">
      {{ $t('Estimated shipment date: {date}', {date: formattedEstimatedShipmentDate}) }}
    </span>

    <span class="_shipped-date" v-if="shippedDate">
      {{ shippedDate }}
    </span>

    <div class="_shipments-list" v-if="showShipmentsList">
      <span
        class="_shipment-item"
        v-for="shipment in shipments"
        :key="shipment.tracking_number"
      >
        {{ shipment.tracking_number }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, computed, defineComponent } from '@vue/composition-api';

import { OrderItemShipment } from '../types/order-item-shipment';

export default defineComponent({
  name: 'OrderItemBaseInfo',
  props: {
    productName: {
      type: String,
      required: true
    },
    shipments: {
      type: Array as PropType<OrderItemShipment[]>,
      required: true
    },
    estimatedShipmentDate: {
      type: String as PropType<string | null | undefined>,
      default: undefined
    },
    shippedDate: {
      type: String as PropType<string | null | undefined>,
      default: undefined
    }
  },
  setup (props, { root }) {
    const showShipmentsList = computed<boolean>(() => {
      return props.shipments.length > 0;
    });

    const formattedEstimatedShipmentDate = computed<string>(() => {
      if (!props.estimatedShipmentDate) {
        return '';
      }

      const date = new Date(props.estimatedShipmentDate);

      return date.toLocaleDateString();
    });

    const showEstimatedShipmentDate = computed<boolean>(() => {
      return !!formattedEstimatedShipmentDate.value && !props.shippedDate;
    });

    return {
      formattedEstimatedShipmentDate,
      showEstimatedShipmentDate,
      showShipmentsList
    }
  }
})

</script>

<style lang="scss" scoped>
.order-item-base-info {
  display: flex;
  flex-direction: column;
  row-gap: var(--spacer-xs);

  ._product-name {
    font-weight: bold;
  }
}
</style>
