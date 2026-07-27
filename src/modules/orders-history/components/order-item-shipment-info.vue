<template>
  <div class="order-item-shipment-info">
    <div class="_content">
      <span class="_estimated-shipment-date" v-if="showEstimatedShipmentDate">
        {{ $t('Est. shipment date') + ': ' + formattedEstimatedShipmentDate }}
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
import { PropType, computed, defineComponent } from 'vue';
import { useRootInstance } from 'src/modules/shared';

import { OrderItemShipment } from '../types/order-item-shipment';

export default defineComponent({
  name: 'OrderItemShipmentInfo',
  props: {
    shipments: {
      type: Array as PropType<OrderItemShipment[]>,
      required: true
    },
    estimatedShipmentDate: {
      type: String as PropType<string | null | undefined>,
      default: undefined
    }
  },
  setup (props) {
    const root = useRootInstance();
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

      return root.$t('Shipment date') + ': ' + shipmentDate.toLocaleDateString();
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
.order-item-shipment-info {
  display: flex;
  column-gap: var(--spacer-xs);

  ._content {
    display: flex;
    flex-direction: column;
    row-gap: var(--spacer-xs);
  }

  ._shipments-list {
    list-style: disc;
  }
}
</style>
