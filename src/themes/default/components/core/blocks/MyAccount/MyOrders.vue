<template>
  <div class="my-orders mb35">
    <!-- My orders header -->
    <div class="row mb15">
      <div class="col-xs-12" :class="{ 'cl-accent' : !isActive }">
        <h3 class="m0 mb5">
          {{ $t('My orders') }}
        </h3>
      </div>
    </div>
    <!-- My orders body -->
    <div class="row mt30">
      <div class="col-xs-12">
        <table class="brdr-1 brdr-cl-bg-secondary">
          <thead>
            <tr>
              <th class="serif lh20">Order ID</th>
              <th class="serif lh20">Date and time</th>
              <th class="serif lh20">Author</th>
              <th class="serif lh20">Value</th>
              <th class="serif lh20">Type</th>
              <th colspan="2" class="p20 serif lh20">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr class="brdr-top-1 brdr-cl-bg-secondary" v-for="order in ordersHistory" :key="order.entity_id">
              <td class="fs-medium lh25">{{ order.entity_id }}</td>
              <td class="fs-medium lh25">{{ order.created_at }}</td>
              <td class="fs-medium lh25">{{ order.customer_firstname }} {{ order.customer_lastname }}</td>
              <td class="fs-medium lh25">{{ order.order_currency_code }} {{ order.grand_total }}</td>
              <td class="fs-medium lh25">{{ order.state }}</td>
              <td class="fs-medium lh25">{{ order.status }}</td>
              <td class="fs-medium lh25">
                <span class="more relative">
                  <i class="material-icons cl-secondary pointer">more_horiz</i>
                  <div class="text absolute px20 py10 h5 bg-cl-th-accent cl-white">
                    <a href="#" class="py5 cl-secondary cl-secondary-hover">View order</a>
                    <a href="#" class="py5 cl-secondary cl-secondary-hover">Remake order</a>
                  </div>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script>
import { coreComponent } from 'core/lib/themes'

export default {
  mixins: [coreComponent('blocks/MyAccount/MyOrders')]
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-border: color(accent);
$color-hover: color(gainsboro);

table {
  border-collapse: collapse;
  width: 100%;

  th, td {
    text-align: left;
    padding: 20px;
    @media (max-width: 1199px) {
      padding: 10px;
    }

  }

  i {
    vertical-align: middle;
  }

}

.more {

  &:hover .text {
    display: block;
  }

  .text {
    display: none;
    left: 50%;
    transform: translateX(-50%);
    top: 30px;
    box-sizing: border-box;
    width: 150px;
    z-index: 0;

    &:before {
      content: '';
      display: block;
      width: 0;
      height: 0;
      position: absolute;
      border: 10px solid transparent;
      border-bottom: 10px solid $color-border;
      left: 50%;
      transform: translateX(-50%);
      top: -20px;
    }

    a {
      display: block;

      &:hover {
        color: $color-hover;
      }

    }

  }

}
</style>
