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
        <SfTableRow v-for="order in orders" :key="getOrderNumber(order)">
          <SfTableData>{{ getOrderNumber(order) }}</SfTableData>
          <SfTableData>{{ getOrderDate(order) }}</SfTableData>
          <SfTableData>{{ getOrderTotal(order) }}</SfTableData>
          <SfTableData>
            <span :class="getStatusTextClass(order)">{{ getOrderStatus(order) }}</span>
          </SfTableData>
          <SfTableData class="orders__view">
            <SfButton class="sf-button--text mobile-only">Download</SfButton>
            <SfButton class="sf-button--text desktop-only">VIEW</SfButton>
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

import { useUserOrders } from '<%= options.composables %>';
import {
  getOrderDate,
  getOrderNumber,
  getOrderTotal,
  getOrderStatus
} from '<%= options.helpers %>';
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
      const status = getOrderStatus(order);
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
      orders: computed(() => orders ? orders.data.value : []),
      getOrderNumber,
      getOrderDate,
      getOrderTotal,
      getOrderStatus,
      getStatusTextClass
    };
  }
};
</script>

<style lang='scss' scoped>
@import '~@storefront-ui/vue/styles';
@mixin for-mobile {
  @media screen and (max-width: $desktop-min) {
    @content;
  }
}
@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}
.message {
  margin: 0 0 var(--spacer-extra-big) 0;
  font-size: var(--font-size-regular-mobile);
  font-family: var(--body-font-family-primary);
  font-weight: var(--body-font-weight-primary);
  line-height: 1.6;
  @include for-desktop {
    font-size: var(--font-size-regular-desktop);
  }
}
.no-orders {
  &__title,
  &__content {
    font-family: var(--body-font-family-secondary);
    font-size: var(--font-size-regular-mobile);
    line-height: 1.6;
    @include for-desktop {
      font-size: var(--font-size-regular-desktop);
    }
  }
  &__title {
    margin: 0 0 var(--spacer-big) 0;
    font-weight: 500;
  }
  &__content {
    margin: 0 0 var(--spacer-extra-big) 0;
    font-weight: 300;
  }
  &__button {
    width: 100%;
    @include for-desktop {
      width: auto;
    }
  }
}
.orders {
  &__download-all {
    padding: 10px 1.25rem;
    font-size: 0.75rem;
    white-space: nowrap;
  }
  &__view {
    @include for-desktop {
      text-align: center;
    }
  }
  ::v-deep .sf-table {
    &__row,
    &__heading {
      margin: 0 -#{var(--spacer-big)};
    }
    &__row:last-child {
      @include for-mobile {
        border-bottom: 0;
      }
    }
  }
}
</style>
