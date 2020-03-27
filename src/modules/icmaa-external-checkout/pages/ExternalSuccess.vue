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
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

import GoogleCustomerReview from 'icmaa-google-tag-manager/components/GoogleCustomerReview'
import CheckoutSuccessGtmMixin from 'icmaa-google-tag-manager/mixins/checkoutSuccessGtm'

export default {
  name: 'ExternalThankYouPage',
  components: {
    GoogleCustomerReview
  },
  mixins: [ CheckoutSuccessGtmMixin ],
  computed: {
    ...mapGetters({
      cartItems: 'cart/getCartItems',
      orderHistory: 'user/getOrdersHistory',
      isLoggedIn: 'user/isLoggedIn'
    }),
    lastOrder () {
      return this.orderHistory.length > 0 ? this.orderHistory[0] : false
    },
    cartIsNotEmpty () {
      return this.cartItems.length > 0
    }
  },
  async beforeMount () {
    await this.onLogin()
    this.clearCart()
  },
  watch: {
    /**
     * We need to call the `onLogin` method using a watcher because it's possible that the user isn't already
     * logged in when the beforeMount event hook is called. Otherwise the `checkout-success-last-order-loaded`
     * event won't ever be fired on first request because `isLoggedIn` is false.
     */
    isLoggedIn (isLoggedIn) {
      this.onLogin(isLoggedIn)
    }
  },
  methods: {
    clearCart () {
      if (this.cartIsNotEmpty) {
        this.$store.dispatch('cart/clear', {})
        this.$store.dispatch('cart/serverCreate', { guestCart: false })
      }
    },
    async onLogin (value) {
      if (value || this.isLoggedIn) {
        await this.$store.dispatch('user/refreshOrdersHistory', { resolvedFromCache: false })
        this.$bus.$emit('checkout-success-last-order-loaded', this.lastOrder)
      }
    }
  }
}
</script>
