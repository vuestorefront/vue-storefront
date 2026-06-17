<template>
  <div
    v-if="shipmentPromiseText || offerExpirationDateText"
    class="cart-item-shipment-promise"
  >
    <div
      class="_shipment-promise"
      v-html="shipmentPromiseText"
      v-if="shipmentPromiseText"
    />

    <div
      class="_offer-expiration-date-text"
      v-if="offerExpirationDateText"
    >
      {{ offerExpirationDateText }}
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  toRef
} from '@vue/composition-api';

import { useEstimatedShipment } from '../composables/use-estimated-shipment';
import { EstimatedShipment } from '../types/estimated-shipment.interface';

export default defineComponent({
  name: 'CartItemShipmentPromise',
  props: {
    estimatedShipment: {
      type: Object as PropType<EstimatedShipment | undefined>,
      default: undefined
    }
  },
  setup (props) {
    return {
      ...useEstimatedShipment(toRef(props, 'estimatedShipment'))
    };
  }
});
</script>

<style lang="scss" scoped>
.cart-item-shipment-promise {
  display: inline-block;

  ._shipment-promise,
  ._offer-expiration-date-text {
    font-size: var(--font-xs);
    line-height: 1.4;
    margin-bottom: var(--spacer-2xs);

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
