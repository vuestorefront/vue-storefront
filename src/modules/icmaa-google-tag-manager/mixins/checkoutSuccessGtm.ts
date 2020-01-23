import Vue from 'vue'
import VueGtm from 'vue-gtm'
import { mapGetters } from 'vuex'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { googleTagManager } from 'config'
import AbstractMixin from './abstractMixin'

export default {
  mixins: [ AbstractMixin ],
  computed: {
    ...mapGetters({
      ordersHistory: 'user/getOrdersHistory',
      gtmLastOrderId: 'icmaaGoogleTagManager/getLastOrderId'
    }),
    order () {
      return this.ordersHistory.length > 0 ? this.ordersHistory[0] : false
    },
    orderId () {
      return this.order.id
    },
    orderStoreName () {
      return this.order.store_name
    },
    orderGrandTotal () {
      return this.order.grand_total
    },
    orderTaxAmount () {
      return this.order.tax_amount
    },
    orderShippingDescription () {
      return this.order.shipping_description
    },
    paymentMethod () {
      return this.order.payment.additional_information[0]
    },
    couponCode () {
      return this.order.coupon_code
    },
    couponCodeRule () {
      return this.order.coupon_rule_name
    },
    singleOrderItems () {
      return this.order.products
        .map(p => this.getGTMProductDTO(p, googleTagManager.categoryAttributes))
    }
  },
  methods: {
    checkoutSuccessGtm () {
      if (!this.enabled || !this.order || this.gtmLastOrderId === this.order.id) {
        return
      }

      const GTM: VueGtm = (Vue as any).gtm

      const storeView = currentStoreView()
      const currencyCode = storeView.i18n.currencyCode

      GTM.trackEvent({
        event: 'icmaa-checkout-success-view',
        ecommerce: {
          currencyCode: currencyCode,
          purchase: {
            actionField: {
              id: this.orderId,
              affiliation: this.orderStoreName,
              revenue: this.orderGrandTotal,
              tax: this.orderTaxAmount,
              shipping: this.orderShippingDescription,
              payment: this.paymentMethod,
              coupon: this.couponCode,
              couponrule: this.couponCodeRule
            },
            products: this.singleOrderItems
          }
        }
      })

      this.$store.dispatch('icmaaGoogleTagManager/setLastOrderId', this.orderId)
    }
  },
  beforeMount () {
    this.$bus.$on('checkout-success-last-order-loaded', this.checkoutSuccessGtm)
  },
  beforeDestroy () {
    this.$bus.$off('checkout-success-last-order-loaded', this.checkoutSuccessGtm)
  }
}
