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

    <div v-else-if="showLoadingIndicator" class="_loading-indicator" />

    <div v-else-if="isError" class="_error">
      <p>{{ $t('Error loading orders') }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from '@vue/composition-api';

import { Logger } from '@vue-storefront/core/lib/logger';

import OrderView from './order-view.vue';

import { Order } from '../types/order';
import { STORE_NAME } from '../store/store-name';
import { GET_ORDERS_HISTORY } from '../types/store/getters';
import { FETCH_ORDERS_HISTORY } from '../types/store/actions';

export default defineComponent({
  name: 'OrdersHistoryList',
  components: {
    OrderView
  },
  setup (_, { root }) {
    const isLoading = ref<boolean>(false);
    const isError = ref<boolean>(false);

    const ordersList = computed<Order[]>(() => {
      return root.$store.getters[`${STORE_NAME}/${GET_ORDERS_HISTORY}`];
    });

    const showLoadingIndicator = computed<boolean>(() => {
      return isLoading.value && !isError.value;
    });
    const showOrdersHistoryList = computed<boolean>(() => {
      return !isLoading.value && !isError.value;
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
}
</style>
