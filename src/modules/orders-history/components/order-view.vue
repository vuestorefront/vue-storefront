<template>
  <div class="order-view">
    <div class="_header-container">
      <div class="_header">
        <span class="_created-date">
          {{ createdDate }}
        </span>

        <h4 class="_order-number">
          Order #{{ orderNumber }}
        </h4>
      </div>

      <router-link
        v-if="hasBulkCustomizableOrderItems"
        :to="bulkCustomizationRoute"
        class="_customize-link sf-button"
      >
        {{ $t('Customize items') }}
      </router-link>
    </div>

    <div class="_content">
      <order-item
        v-for="item in orderItems"
        :key="item.display_id"
        :item="item"
        :order-id="order.entity_id"
        class="_order-item"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api';

import { Order } from '../types/order';

import OrderItem from './order-item.vue';
import { useBulkCustomizableOrderItems } from '../composables/use-bulk-customizable-order-items';

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
      ...useBulkCustomizableOrderItems(orderItems),
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

  ._header-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  ._header {
    display: flex;
    column-gap: var(--spacer-sm);

    ._created-date,
    ._order-number {
      font-weight: bold;
      margin: 0;
    }

    ._created-date {
      text-align: left;
    }
  }

  ._content {
    display: flex;
    flex-direction: column;
    row-gap: var(--spacer-sm);
    margin-top: var(--spacer-xs);
  }

  ._customize-link {
    --button-font-size: var(--font-xs);
    --button-padding: var(--spacer-xs) var(--spacer-sm);

    &:hover {
      color: var(--c-white);
    }
  }
}
</style>
