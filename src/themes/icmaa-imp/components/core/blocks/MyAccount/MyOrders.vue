<template>
  <div>
    <div class="t-p-4 t-bg-white t-mb-3">
      <headline icon="local_mall">
        {{ $t('My orders') }}
      </headline>
      <p v-if="!isHistoryEmpty" class="t-text-sm">
        {{ $t('These are your recent orders. Click for more details and options.') }}
      </p>
      <p v-else class="t-text-sm">
        {{ $t('Sorry, but you don\'t have any orders yet.') }}
      </p>
    </div>
    <template v-if="!isHistoryEmpty">
      <router-link tag="div" v-for="order in ordersHistory" :key="order.entity_id" class="t-flex t-items-center t-p-4 t-mt-1 t-bg-white t-text-sm t-text-base-tone t-cursor-pointer" :to="localizedRoute(`/my-account/orders/${order.id}`)">
        <div class="t-flex t-flex-grow t-flex-wrap t-items-center t-justify-between">
          <div class="t-w-1/2 lg:t-w-1/4 lg:t-order-4 t-mb-2 lg:t-mb-0">
            <status-icon :status="order.status" />
          </div>
          <div class="t-w-1/2 lg:t-w-1/4 lg:t-order-3 t-text-2xl t-text-base-darkest t-mb-2 lg:t-mb-0">
            {{ order.grand_total | round | price }}
          </div>
          <div class="t-w-1/2 lg:t-w-1/4 lg:t-order-1">
            <div class="t-font-bold t-mb-1 t-text-base-lighter t-text-xxs t-uppercase">
              {{ $t('Date') }}
            </div>
            {{ order.created_at | date }}
          </div>
          <div class="t-w-1/2 lg:t-w-1/4 lg:t-order-2">
            <div class="t-font-bold t-mb-1 t-text-base-lighter t-text-xxs t-uppercase">
              {{ $t('Order number') }}
            </div>
            #{{ order.increment_id }}
          </div>
        </div>
        <router-link :to="localizedRoute(`/my-account/orders/${order.id}`)" class="t-hidden sm:t-block t-flex-fix">
          <material-icon icon="chevron_right" size="lg" class="t-align-middle" />
        </router-link>
      </router-link>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Headline from 'theme/components/core/blocks/MyAccount/Headline'
import UserOrder from '@vue-storefront/core/modules/order/components/UserOrdersHistory'
import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'
import StatusIcon from 'theme/components/core/blocks/MyAccount/MyOrders/StatusIcon'

export default {
  mixins: [UserOrder],
  components: {
    Headline,
    MaterialIcon,
    StatusIcon
  }
}
</script>
