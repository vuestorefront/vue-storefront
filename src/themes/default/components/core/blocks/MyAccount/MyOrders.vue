<template>
  <div class="mb35">
    <!-- My orders header -->
    <div class="row mb15">
      <div class="col-xs-12 col-sm-6">
        <h3 class="m0 mb5">
          {{ $t('My orders') }}
        </h3>
      </div>
    </div>
    <!-- My orders body -->
    <div class="row">
      <div class="col-xs-12" v-show="!isHistoryEmpty">
        <table class="brdr-1 brdr-cl-bg-secondary">
          <thead>
            <tr>
              <th class="p20 serif lh20">
                {{ $t('Order ID') }}
              </th>
              <th class="p20 serif lh20 hide-on-xs">
                {{ $t('Date and time') }}
              </th>
              <th class="p20 serif lh20 hide-on-xs">
                {{ $t('Author') }}
              </th>
              <th class="p20 serif lh20 hide-on-xs">
                {{ $t('Value') }}
              </th>
              <th class="p20 serif lh20 hide-on-xs">
                {{ $t('Type') }}
              </th>
              <th class="p20 serif lh20 hide-on-xs">
                {{ $t('Status') }}
              </th>
              <th class="p20 serif lh20">
&nbsp;
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="brdr-top-1 brdr-cl-bg-secondary" v-for="order in ordersHistory" :key="order.entity_id">
              <td class="fs-medium lh25">
                #{{ order.increment_id }}
              </td>
              <td class="fs-medium lh25 hide-on-xs">
                {{ order.created_at | date(null, storeView) }}
              </td>
              <td class="fs-medium lh25 hide-on-xs">
                {{ order.customer_firstname }} {{ order.customer_lastname }}
              </td>
              <td class="fs-medium lh25 hide-on-xs">
                {{ order.grand_total | price(storeView) }}
              </td>
              <td class="fs-medium lh25 hide-on-xs">
                {{ $t('Purchase') }}
              </td>
              <td class="fs-medium lh25 hide-on-xs">
                {{ order.status | capitalize }}
              </td>
              <td class="fs-medium lh25">
                <span class="relative dropdown">
                  <i class="material-icons cl-secondary pointer">more_horiz</i>
                  <div class="dropdown-content bg-cl-primary align-left sans-serif lh20 weight-400 fs-medium-small py5">
                    <router-link class="no-underline block py10 px15" :to="localizedRoute(`/my-account/orders/${order.entity_id}`)">
                      {{ $t('View order') }}
                    </router-link>
                    <a href="#" class="no-underline block py10 px15" @click.prevent="remakeOrder(skipGrouped(order.items))">{{ $t('Remake order') }}</a>
                  </div>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-xs-12 h4" v-show="isHistoryEmpty">
        <p>{{ $t('No orders yet') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import UserOrder from '@vue-storefront/core/modules/order/components/UserOrdersHistory'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

export default {
  mixins: [UserOrder],
  computed: {
    storeView () {
      return currentStoreView()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/base/global_vars';
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-icon-hover: color(secondary, $colors-background);

table {
  border-collapse: collapse;
  width: 100%;

  th, td {
    text-align: left;
    padding: 20px;

    @media (max-width: 1199px) {
      padding: 10px;
    }

    @media (max-width: 767px) {
      text-align: center;
    }

    &.hide-on-xs {

      @media (max-width: 767px) {
        display: none;
      }

    }

  }

  i {
    vertical-align: middle;
  }

}

.dropdown {
  display: block;
  margin: -20px;
  padding: 20px;

  @media (max-width: 1199px) {
    margin: -10px;
    padding: 10px;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    right: 0;
    top: 100%;
    width: 160px;
    z-index: 1;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
  }

  a {
    opacity: .6;

    &:hover,
    &:focus {
      background-color: $color-icon-hover;
      opacity: 1;
    }

  }

  &:hover .dropdown-content {
    display: block;
  }

}

</style>
