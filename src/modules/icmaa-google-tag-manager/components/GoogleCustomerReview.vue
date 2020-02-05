<template>
  <div v-if="type === 'batch'" ref="batch" class="t-w-full lg:t-w-1/3 t-mt-4">
    <!-- <g:ratingbadge :merchant_id="merchantId" /> -->
  </div>
</template>

<script>
import Vue from 'vue'
import { icmaa } from 'config'
import { mapGetters } from 'vuex'
import { isServer } from '@vue-storefront/core/helpers'
import { toDayjsDate } from 'icmaa-config/helpers/datetime'

/**
 * Add GoogleReview from Google Merchant Center:
 * @see https://support.google.com/merchants/answer/7105655?hl=de
 */

/**
 * Ignore the custom HTML element to prevent error
 */
Vue.config.ignoredElements = ['g:ratingbadge']

export default {
  name: 'GoogleCustomerReview',
  props: {
    type: {
      type: String,
      default: 'popup',
      validator: (value) => ['popup', 'batch'].includes(value)
    }
  },
  computed: {
    ...mapGetters({
      enabled: 'icmaaGoogleTagManager/enabled',
      orderHistory: 'user/getOrdersHistory'
    }),
    merchantId () {
      return icmaa.googleCustomerReview.merchantId
    },
    order () {
      return this.orderHistory.length > 0 ? this.orderHistory[0] : false
    },
    shippingAddress () {
      return this.order && this.order.extension_attributes.shipping_assignments[0].shipping.address
    },
    deliveryDate () {
      return toDayjsDate(this.order.created_at)
        .add(icmaa.googleCustomerReview.shippingOffset, 'd')
        .format('YYYY-MM-DD')
    },
    orderDTO () {
      return {
        'merchant_id': this.merchantId,
        'order_id': this.order.increment_id,
        'delivery_country': this.shippingAddress.country_id,
        'estimated_delivery_date': this.deliveryDate
      }
    }
  },
  methods: {
    async loadScript () {
      return new Promise(resolve => {
        if (!this.hasScript()) {
          const script = document.createElement('script')
          script.async = true
          script.src = `https://apis.google.com/js/platform.js`
          script.onload = () => { resolve() }
          document.body.appendChild(script)
        } else if (this.hasScript() && window) {
          resolve()
        }
      })
    },
    hasScript () {
      const scriptInDOM = Array
        .from(document.getElementsByTagName('script'))
        .some(script => script.src.includes('apis.google.com/js/platform.js'))

      return scriptInDOM && window !== undefined && window.gapi !== undefined
    },
    renderOptIn () {
      window.renderOptIn = this.renderOptIn
      window.gapi.load('surveyoptin', () => {
        window.gapi.surveyoptin.render(this.orderDTO)
      })
    },
    renderBadge () {
      var ratingBadgeContainer = this.$refs.batch
      window.gapi.load('ratingbadge', () => {
        window.gapi.ratingbadge.render(
          ratingBadgeContainer, {
            'merchant_id': this.merchantId,
            'position': 'INLINE'
          })
      })
    },
    async onCheckoutSuccessLastOrderLoaded () {
      await this.loadScript()
      this.renderOptIn()

      this.$bus.$off(
        'checkout-success-last-order-loaded',
        this.onCheckoutSuccessLastOrderLoaded
      )
    }
  },
  async mounted () {
    if (!isServer && this.enabled) {
      switch (this.type) {
        case 'batch':
          await this.loadScript()
          this.renderBadge()
          break
        case 'popup':
          this.$bus.$on(
            'checkout-success-last-order-loaded',
            this.onCheckoutSuccessLastOrderLoaded
          )
          break
      }
    }
  },
  beforeDestroy () {
    this.$bus.$off(
      'checkout-success-last-order-loaded',
      this.onCheckoutSuccessLastOrderLoaded
    )
  }
}
</script>

<style lang="scss">

#___ratingbadge_0 {
  position: static !important;
  border: none !important;
  box-shadow: none !important;
  height: 54px !important;

  iframe {
    position: static !important;
    width: 100% !important;
    height: 54px !important;
  }
}

</style>
