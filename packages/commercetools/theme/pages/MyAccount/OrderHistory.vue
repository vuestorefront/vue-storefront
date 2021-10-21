<template>
  <SfTabs :open-tab="1">
    <SfTab title="My orders">
      <div v-if="currentOrder">
        <SfButton class="sf-button--text all-orders" @click="currentOrder = null">All Orders</SfButton>
        <div
          v-e2e="'order-details'"
          class="highlighted highlighted--total"
        >
          <SfProperty
            name="Order ID"
            :value="orderGetters.getId(currentOrder)"
            class="sf-property--full-width property"
          />
          <SfProperty
            name="Date"
            :value="orderGetters.getDate(currentOrder)"
            class="sf-property--full-width property"
          />
          <SfProperty
            name="Status"
            :value="orderGetters.getStatus(currentOrder)"
            class="sf-property--full-width property"
          />
          <SfProperty
            name="Total"
            :value="$n(orderGetters.getPrice(currentOrder), 'currency')"
            class="sf-property--full-width property"
          />
        </div>
        <SfTable class="products">
          <SfTableHeading>
            <SfTableHeader class="products__name">{{ $t('Product') }}</SfTableHeader>
            <SfTableHeader>{{ $t('Quantity') }}</SfTableHeader>
            <SfTableHeader>{{ $t('Price') }}</SfTableHeader>
          </SfTableHeading>
          <SfTableRow v-for="(item, i) in orderGetters.getItems(currentOrder)" :key="i">
            <SfTableData class="products__name">
              <nuxt-link :to="'/p/'+orderGetters.getItemSku(item)+'/'+orderGetters.getItemSku(item)">
                {{ orderGetters.getItemName(item) }}
              </nuxt-link>
            </SfTableData>
            <SfTableData>{{ orderGetters.getItemQty(item) }}</SfTableData>
            <SfTableData>{{ $n(orderGetters.getItemPrice(item), 'currency') }}</SfTableData>
          </SfTableRow>
        </SfTable>
      </div>
      <div v-else>
        <p class="message">
          {{ $t('Details and status orders') }}
        </p>
        <div v-if="orders.length === 0" class="no-orders">
          <p class="no-orders__title">{{ $t('You currently have no orders') }}</p>
          <SfButton class="no-orders__button">{{ $t('Start shopping') }}</SfButton>
        </div>
        <SfTable v-else class="orders">
          <SfTableHeading>
            <SfTableHeader
              v-for="tableHeader in tableHeaders"
              :key="tableHeader"
            >{{ tableHeader }}</SfTableHeader>
            <SfTableHeader class="orders__element--right" />
          </SfTableHeading>
          <SfTableRow v-for="order in orders" :key="orderGetters.getId(order)">
            <SfTableData v-e2e="'order-number'">{{ orderGetters.getId(order) }}</SfTableData>
            <SfTableData v-e2e="'order-date'">{{ orderGetters.getDate(order) }}</SfTableData>
            <SfTableData v-e2e="'order-amount'">{{ $n(orderGetters.getPrice(order), 'currency') }}</SfTableData>
            <SfTableData v-e2e="'order-status'">
              <span :class="getStatusTextClass(order)">{{ orderGetters.getStatus(order) }}</span>
            </SfTableData>
            <SfTableData class="orders__view orders__element--right">
              <SfButton class="sf-button--text desktop-only" @click="currentOrder = order">
                {{ $t('View details') }}
              </SfButton>
            </SfTableData>
          </SfTableRow>
        </SfTable>
        <div
          v-e2e="'order-history-pagination'"
          class="pagination"
          v-if="orders.length < totalOrders"
        >
          <SfArrow
            aria-label="prev"
            class="sf-arrow--left sf-arrow--transparent"
            :disabled="offset === 0"
            @click="goPrev(offset)"
          />
          <div
            v-e2e="'order-history-pagination-count'"
            class="pagination-count"
          >
            {{ orders.length > 1 ? `${offset + 1} - ` : "" }} {{ offset + orders.length }}
            <strong>of</strong> {{ totalOrders }}
          </div>
          <SfArrow
            aria-label="next"
            class="sf-arrow--right sf-arrow--transparent"
            :disabled="(offset + orders.length) === totalOrders"
            @click="goNext(offset)"
          />
        </div>
      </div>
    </SfTab>
    <SfTab title="Returns">
      <p class="message">
        This feature is not implemented yet! Please take a look at
        <br />
        <SfLink class="message__link" href="#">https://github.com/DivanteLtd/vue-storefront/issues</SfLink>
        for our Roadmap!
      </p>
    </SfTab>
  </SfTabs>
</template>

<script>
import {
  SfTabs,
  SfTable,
  SfButton,
  SfProperty,
  SfLink,
  SfArrow
} from '@storefront-ui/vue';
import { computed, ref } from '@nuxtjs/composition-api';
import { useUserOrder, orderGetters } from '@vue-storefront/commercetools';
import { AgnosticOrderStatus } from '@vue-storefront/core';
import { onSSR } from '@vue-storefront/core';

export default {
  name: 'PersonalDetails',
  components: {
    SfTabs,
    SfTable,
    SfButton,
    SfProperty,
    SfLink,
    SfArrow
  },
  setup() {
    const limit = 10;
    const { orders, search } = useUserOrder();
    const currentOrder = ref(null);

    onSSR(async () => {
      await search({ limit, offset: 0, sort: 'createdAt desc' });
    });

    const goNext = (offset) => {
      search({ limit, offset: offset + limit, sort: 'createdAt desc' });
    };

    const goPrev = (offset) => {
      search({ limit, offset: offset - limit, sort: 'createdAt desc' });
    };

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
      orders: computed(() => orders.value?.results ?? []),
      offset: computed(() => orders.value?.offset ?? 0),
      totalOrders: computed(() => orderGetters.getOrdersTotal(orders.value)),
      getStatusTextClass,
      goNext,
      goPrev,
      orderGetters,
      currentOrder
    };
  }
};
</script>

<style lang='scss' scoped>
.pagination {
  padding-top: var(--spacer-base);
  display: flex;
  align-items: center;
  justify-content: center;
}
.pagination-count {
  padding: 0 var(--spacer-base);
}
.no-orders {
  &__title {
    margin: 0 0 var(--spacer-lg) 0;
    font: var(--font-weight--normal) var(--font-size--base) / 1.6 var(--font-family--primary);
  }
  &__button {
    --button-width: 100%;
    @include for-desktop {
      --button-width: 17,5rem;
    }
  }
}
.orders {
  @include for-desktop {
    &__element {
      &--right {
        --table-column-flex: 1;
        text-align: right;
      }
    }
  }
}
.all-orders {
  --button-padding: var(--spacer-base) 0;
}
.message {
  margin: 0 0 var(--spacer-xl) 0;
  font: var(--font-weight--light) var(--font-size--base) / 1.6 var(--font-family--primary);
  &__link {
    color: var(--c-primary);
    font-weight: var(--font-weight--medium);
    font-family: var(--font-family--primary);
    font-size: var(--font-size--base);
    text-decoration: none;
    &:hover {
      color: var(--c-text);
    }
  }
}
.product {
  &__properties {
    margin: var(--spacer-xl) 0 0 0;
  }
  &__property,
  &__action {
    font-size: var(--font-size--sm);
  }
  &__action {
    color: var(--c-gray-variant);
    font-size: var(--font-size--sm);
    margin: 0 0 var(--spacer-sm) 0;
    &:last-child {
      margin: 0;
    }
  }
  &__qty {
    color: var(--c-text);
  }
}
.products {
  --table-column-flex: 1;
  &__name {
    margin-right: var(--spacer-sm);
    @include for-desktop {
      --table-column-flex: 2;
    }
  }
}
.highlighted {
  box-sizing: border-box;
  width: 100%;
  background-color: var(--c-light);
  padding: var(--spacer-sm);
  --property-value-font-size: var(--font-size--base);
  --property-name-font-size: var(--font-size--base);
  &:last-child {
    margin-bottom: 0;
  }
  ::v-deep .sf-property__name {
    white-space: nowrap;
  }
  ::v-deep .sf-property__value {
    text-align: right;
  }
  &--total {
    margin-bottom: var(--spacer-sm);
  }
  @include for-desktop {
    padding: var(--spacer-xl);
    --property-name-font-size: var(--font-size--lg);
    --property-name-font-weight: var(--font-weight--medium);
    --property-value-font-size: var(--font-size--lg);
    --property-value-font-weight: var(--font-weight--semibold);
  }
}

</style>
