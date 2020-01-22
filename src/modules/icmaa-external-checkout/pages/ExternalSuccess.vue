<template>
  <div class="t-container t-p-4">
    <h1 class="t-font-bold t-text-1xl" v-text="$t('Thank you for your purchase!')" />
    <h2 class="t-text-xl t-text-base-tone t-mb-4" v-text="$t('Your order has been received.')" />
    <div class="t-text-sm">
      <div class="t-mb-2">
        {{ $t('You will receive an order confirmation email with details of your order and a link to track its progress.') }}
      </div>
      <div v-if="lastOrder">
        {{ $t('Your order-number is:') }}
        <router-link class="t-font-mono t-text-base-tone lg:t-pl-2" :to="localizedRoute(`/my-account/orders/${lastOrder.id}`)">
          #{{ lastOrder.increment_id }}
        </router-link>
      </div>
      <google-customer-review type="batch" />
      <google-customer-review type="popup" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Composite from '@vue-storefront/core/mixins/composite'

import GoogleCustomerReview from 'icmaa-google-tag-manager/components/GoogleCustomerReview'
import CheckoutSuccessGtmMixin from 'icmaa-google-tag-manager/mixins/checkoutSuccessGtm'

export default {
  name: 'ExternalThankYouPage',
  components: {
    GoogleCustomerReview
  },
  mixins: [ Composite, CheckoutSuccessGtmMixin ],
  computed: {
    ...mapGetters({ orderHistory: 'user/getOrdersHistory' }),
    lastOrder () {
      return this.orderHistory.length > 0 ? this.orderHistory[0] : false
    }
  },
  async beforeMount () {
    await this.$store.dispatch('user/refreshOrdersHistory', { resolvedFromCache: false })
    this.$bus.$emit('checkout-success-last-order-loaded', this.lastOrder)
    this.$bus.$on('application-after-loaded', (payload) => {
      this.clearTheCart()
    })
  },
  methods: {
    clearTheCart () {
      if (this.getNumberOfItemsInCart() > 0) {
        this.$store.dispatch('cart/clear', {})
        this.$store.dispatch('cart/serverCreate', { guestCart: false })
      }
    },
    getNumberOfItemsInCart () {
      return this.$store.state.cart.cartItems.length
    }
  }
}
</script>
