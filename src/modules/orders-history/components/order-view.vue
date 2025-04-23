<template>
  <div class="order-view">
    <div class="_header">
      <span class="_created-date">
        {{ createdDate }}
      </span>

      <h4 class="_order-number">
        #{{ orderNumber }}
      </h4>
    </div>

    <div class="_content">
      <order-item
        v-for="item in orderItems"
        :key="item.display_id"
        :item="item"
        class="_order-item"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api';

import { Order } from '../types/order';

import OrderItem from './order-item.vue';

export default defineComponent({
  name: 'OrderView',
  components: {
    OrderItem
  },
  props: {
    order: {
      type: Object as PropType<Order>,
      required: true
    }
  },
  setup (props) {
    const createdDate = computed(() => {
      return new Date(props.order.created_at).toLocaleDateString();
    });

    const orderNumber = computed(() => {
      return props.order.increment_id;
    });

    const orderItems = computed(() => {
      return props.order.items;
    });

    return {
      createdDate,
      orderItems,
      orderNumber
    };
  }

});
</script>

<style lang="scss" scoped>
.order-view {
  display: flex;
  flex-direction: column;

  ._header {
    display: flex;
    column-gap: var(--spacer-sm);

    ._created-date,
    ._order-number {
      font-weight: bold;
      margin: 0;
    }

    ._created-date {
      flex: 1;
      text-align: center;
    }

    ._order-number {
      flex: 4;
    }
  }

  ._content {
    display: flex;
    flex-direction: column;
    row-gap: var(--spacer-sm);
    margin-top: var(--spacer-xs);
  }
}
</style>
