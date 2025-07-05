<template>
  <div class="orders-history-list">
    <div v-if="showOrdersHistoryList" class="_list">
      <order-view
        v-for="order in ordersList"
        :key="order.entity_id"
        :order="order"
        class="_order"
      />
    </div>

    <div v-else-if="showLoadingIndicator" class="_loading-indicator">
      <SfLoader class="_sf-loader" :loading="true" />
    </div>

    <div v-else-if="showEmptyOrdersHistoryMessage" class="_empty">
      {{ $t('Your order history is empty') }}
    </div>

    <div v-else-if="isError" class="_error">
      {{ $t('Error loading orders') }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from '@vue/composition-api';
import { SfLoader } from '@storefront-ui/vue';

import { Logger } from '@vue-storefront/core/lib/logger';

import { Order } from '../types/order';
import { STORE_NAME } from '../store/store-name';
import { GET_ORDERS_HISTORY } from '../types/store/getters';
import { FETCH_ORDERS_HISTORY } from '../types/store/actions';

import OrderView from './order-view.vue';
import { OrderItemAvailableActionCode } from '../types/order-item-available-action.code';

export default defineComponent({
  name: 'OrdersHistoryList',
  components: {
    OrderView,
    SfLoader
  },
  setup (_, { root }) {
    const isLoading = ref<boolean>(false);
    const isError = ref<boolean>(false);

    const ordersList = computed<Order[]>(() => {
      // return root.$store.getters[`${STORE_NAME}/${GET_ORDERS_HISTORY}`];

      // TODO: mock
      return root.$store.getters[`${STORE_NAME}/${GET_ORDERS_HISTORY}`].map((order: Order) => {
        if (order.items.length > 1) {
          return order;
        }

        const firstItem = order.items[0];

        if (firstItem.product.sku !== 'ForeversDog_bundle') {
          return order;
        }

        order.items[0].available_actions.push({
          code: OrderItemAvailableActionCode.AWAITING_CUSTOMIZATION,
          name: 'Awaiting customization',
          message: `We're waiting for your decisions. Please complete the customization.`,
          blocking_progress: true,
          url: null
        });

        return order;
      });
    });

    const showLoadingIndicator = computed<boolean>(() => {
      return isLoading.value && !isError.value;
    });
    const showEmptyOrdersHistoryMessage = computed<boolean>(() => {
      return !showLoadingIndicator.value && !isError.value && ordersList.value.length === 0;
    });
    const showOrdersHistoryList = computed<boolean>(() => {
      return !isLoading.value && !isError.value && !showEmptyOrdersHistoryMessage.value;
    });

    async function loadOrders () {
      if (isLoading.value) {
        return;
      }

      isLoading.value = true;
      isError.value = false;

      try {
        await root.$store.dispatch(`${STORE_NAME}/${FETCH_ORDERS_HISTORY}`);
      } catch (error) {
        isError.value = true;
        Logger.error(`Error loading orders: ${error}`);
      } finally {
        isLoading.value = false;
      }
    }

    void loadOrders();

    return {
      isError,
      isLoading,
      ordersList,
      showEmptyOrdersHistoryMessage,
      showLoadingIndicator,
      showOrdersHistoryList
    }
  }
});
</script>

<style lang="scss" scoped>
.orders-history-list {
  ._list {
    display: flex;
    flex-direction: column;
    row-gap: var(--spacer-xl);
  }

  ._loading-indicator {
    padding: var(--spacer-lg);
  }
}
</style>
