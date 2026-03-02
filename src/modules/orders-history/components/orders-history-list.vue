<template>
  <div class="orders-history-list">
    <SfHeading :level="3" :title="title" class="_title" />

    <div class="_list">
      <order-view
        v-for="order in orders"
        :key="order.entity_id"
        :order="order"
        :alteration-products="alterationProducts"
        class="_order"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { SfHeading } from '@storefront-ui/vue';

import Product from '@vue-storefront/core/modules/catalog/types/Product';

import { Order } from '../types/order';

import OrderView from './order-view.vue';

export default defineComponent({
  name: 'OrdersHistoryList',
  components: {
    OrderView,
    SfHeading
  },
  props: {
    orders: {
      type: Array as PropType<Order[]>,
      required: true
    },
    alterationProducts: {
      type: Object as PropType<Record<number, Product>>,
      default: () => ({})
    },
    title: {
      type: String,
      required: true
    }
  }
});
</script>

<style lang="scss" scoped>
.orders-history-list {
  ._title {
    --heading-title-font-size: var(--font-lg);

    text-align: left;
  }

  ._list {
    display: flex;
    flex-direction: column;
    row-gap: var(--spacer-xl);
    margin-top: var(--spacer-sm);
  }
}
</style>
