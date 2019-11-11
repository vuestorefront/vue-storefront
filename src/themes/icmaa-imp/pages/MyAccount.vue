<template>
  <div id="my_account" class="t-container">
    <div class="t-flex t-flex-wrap t-px-4 t--mx-2 t-py-4">
      <navigation class="customer-account t-flex t-px-2 t-mb-4 lg:t-mb-0 lg:t-w-1/4" />
      <div class="lg:t-w-3/4 t-px-2">
        <h1>
          {{ $t('My Account') }}
        </h1>
        <no-ssr>
          <component :is="this.$props.activeBlock" />
        </no-ssr>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from 'theme/components/core/blocks/MyAccount/Navigation'
import MyAccount from '@vue-storefront/core/pages/MyAccount'
import MyProfile from '../components/core/blocks/MyAccount/MyProfile'
import MyShippingDetails from '../components/core/blocks/MyAccount/MyShippingDetails'
import MyNewsletter from '../components/core/blocks/MyAccount/MyNewsletter'
import MyOrders from '../components/core/blocks/MyAccount/MyOrders'
import MyOrder from '../components/core/blocks/MyAccount/MyOrder'
import MyRecentlyViewed from '../components/core/blocks/MyAccount/MyRecentlyViewed'
import NoSSR from 'vue-no-ssr'

export default {
  mixins: [ MyAccount ],
  components: {
    MyProfile,
    MyShippingDetails,
    MyNewsletter,
    MyOrders,
    MyOrder,
    MyRecentlyViewed,
    Navigation,
    'no-ssr': NoSSR
  }
}
</script>
