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

import { EstimatedShipment, useEstimatedShipment } from 'src/modules/customization-system';

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
    background: var(--c-secondary-lighten);
    padding: var(--spacer-xs);
    display: inline-block;
    border-left: var(--c-primary) solid 4px;

  ._shipment-promise,
  ._offer-expiration-date-text {
    font-size:  var(--font-xs);
    margin-bottom: var(--spacer-xs);

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
