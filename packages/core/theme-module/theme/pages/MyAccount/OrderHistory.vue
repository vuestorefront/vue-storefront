<template>
  <SfTabs :open-tab="1">
    <SfTab title="My orders">
      <p class="message">
        Check the details and status of your orders in the online store. You can
        also cancel your order or request a return.
      </p>
      <div v-if="orders.length === 0" class="no-orders">
        <p class="no-orders__title">You currently have no orders</p>
        <p class="no-orders__content">Best get shopping pronto...</p>
        <SfButton class="no-orders__button">Start shopping</SfButton>
      </div>
      <SfTable v-else class="orders">
        <SfTableHeading>
          <SfTableHeader
            v-for="tableHeader in tableHeaders"
            :key="tableHeader"
            >{{ tableHeader }}</SfTableHeader>
          <SfTableHeader>
            <span class="mobile-only">Download</span>
            <SfButton class="desktop-only orders__download-all">Download all</SfButton>
          </SfTableHeader>
        </SfTableHeading>
        <SfTableRow v-for="order in orders" :key="orderGetters.getId(order)">
          <SfTableData>{{ orderGetters.getId(order) }}</SfTableData>
          <SfTableData>{{ orderGetters.getDate(order) }}</SfTableData>
          <SfTableData>{{ orderGetters.getPrice(order).regular }}</SfTableData>
          <SfTableData>
            <span :class="getStatusTextClass(order)">{{ orderGetters.getStatus(order) }}</span>
          </SfTableData>
          <SfTableData class="orders__view">
            <SfButton class="sf-button--text color-secondary mobile-only">Download</SfButton>
            <SfButton class="sf-button--text color-secondary desktop-only">VIEW</SfButton>
          </SfTableData>
        </SfTableRow>
      </SfTable>
    </SfTab>
    <SfTab title="Returns">
      <p class="message">
        This feature is not implemented yet! Please take a look at<br />
        <a href="#">https://github.com/DivanteLtd/vue-storefront/issues for our Roadmap!</a>
      </p>
    </SfTab>
  </SfTabs>
</template>

<script>
import {
  SfTabs,
  SfTable,
  SfButton
} from '@storefront-ui/vue';
import { computed } from '@vue/composition-api';

import { useUserOrders, orderGetters } from '<%= options.composables %>';
import { AgnosticOrderStatus } from '@vue-storefront/interfaces';

export default {
  name: 'PersonalDetails',
  components: {
    SfTabs,
    SfTable,
    SfButton
  },
  setup() {
    const { orders, searchOrders } = useUserOrders();

    searchOrders();

    const tableHeaders = [
      'Order ID',
      'Payment date',
      'Amount',
      'Status'
    ];

    const getStatusTextClass = (order) => {
      const status = orderGetters.getStatus(order);
      switch (status) {
        case AgnosticOrderStatus.Open:
          return 'text-warning';
        case AgnosticOrderStatus.Complete:
          return 'text-success';
        default:
          return '';
      }
    };

    return {
      tableHeaders,
      orders: computed(() => orders ? orders.value : []),
      getStatusTextClass,
      orderGetters
    };
  }
};
</script>

<style lang='scss' scoped>
@import "~@storefront-ui/vue/styles";

.no-orders {
  &__title {
    margin: 0 0 var(--spacer-big) 0;
    font: 500 var(--font-size-regular) / 1.6 var(--body-font-family-secondary);
  }
  &__content {
    font: 300 var(--font-size-regular) / 1.6 var(--body-font-family-secondary);
  }
  &__button {
    --button-width: 100%;
    @include for-desktop {
      --button-width: auto;
    }
  }
}
.orders {
  &__download-all {
    --button-padding: 0.625rem var(--spacer-big);
    --button-font-size: var(--font-size-extra-small);
    white-space: nowrap;
  }
  &__view {
    @include for-desktop {
      text-align: center;
    }
  }
}
.message {
  margin: 0 0 var(--spacer-extra-big) 0;
  font: 300 var(--font-size-regular) / 1.6 var(--body-font-family-secondary);
  &__label {
    font-weight: 500;
  }
}
a {
  color: var(--c-text-muted);
  text-decoration: none;
  &:hover {
    color: var(--c-text);
  }
}
</style>
