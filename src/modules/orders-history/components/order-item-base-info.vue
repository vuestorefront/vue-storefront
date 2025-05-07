<template>
  <div class="order-item-base-info">
    <slot name="image" />

    <div class="_content">
      <span class="_product-name">
        {{ itemDisplayId }} - {{ productName }}
      </span>

      <span class="_estimated-shipment-date" v-if="showEstimatedShipmentDate">
        {{ $t('Estimated shipment date: {date}', { date: formattedEstimatedShipmentDate }) }}
      </span>

      <span class="_shipped-date" v-if="shipmentDate">
        {{ shipmentDate }}
      </span>

      <ul class="_shipments-list" v-if="showShipmentsList">
        <li
          class="_shipment-item"
          v-for="shipment in shipments"
          :key="shipment.tracking_number"
        >
          {{ shipment.carrier_code }} - {{ shipment.tracking_number }}
        </li>
      </ul>
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
    itemDisplayId: {
      type: Number,
      required: true
    },
    shipments: {
      type: Array as PropType<OrderItemShipment[]>,
      required: true
    },
    estimatedShipmentDate: {
      type: String as PropType<string | null | undefined>,
      default: undefined
    }
  },
  setup (props, { root }) {
    const showShipmentsList = computed<boolean>(() => {
      return props.shipments.length > 0;
    });

    const shipmentDate = computed<string | undefined>(() => {
      let shipmentDate: Date | undefined;

      for (const shipment of props.shipments) {
        if (!shipment.shipment_date) {
          continue;
        }

        const date = new Date(shipment.shipment_date);

        if (!shipmentDate || shipmentDate.getTime() > date.getTime()) {
          shipmentDate = date;
        }
      }

      if (!shipmentDate) {
        return;
      }

      return root.$t('Shipment date: {date}', { date: shipmentDate.toLocaleDateString() });
    });

    const formattedEstimatedShipmentDate = computed<string>(() => {
      if (!props.estimatedShipmentDate) {
        return '';
      }

      const date = new Date(props.estimatedShipmentDate);

      return date.toLocaleDateString();
    });

    const showEstimatedShipmentDate = computed<boolean>(() => {
      return !!formattedEstimatedShipmentDate.value && !shipmentDate.value;
    });

    return {
      formattedEstimatedShipmentDate,
      shipmentDate,
      showEstimatedShipmentDate,
      showShipmentsList

    }
  }
})

</script>

<style lang="scss" scoped>
.order-item-base-info {
  display: flex;
  column-gap: var(--spacer-xs);

  ._content {
    display: flex;
    flex-direction: column;
    row-gap: var(--spacer-xs);
  }

  ._product-name {
    font-weight: bold;
  }

  ._shipments-list {
    list-style: disc;
  }
}
</style>
