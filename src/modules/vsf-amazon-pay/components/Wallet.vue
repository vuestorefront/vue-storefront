<template>
  <div :id="id" :class="{loaded}" />
</template>

<script>
import i18n from '@vue-storefront/i18n'
import config from 'config'
import { KEY } from '../index'
import * as states from '../store/order-states'

// TODO: add integration without the AddressBook widget

export default {
  name: 'AmazonPayWallet',
  props: {
    designMode: {
      type: String,
      required: false,
      default: 'responsive',
      validator: function (value) {
        return ['responsive', 'smartphoneCollapsible'].indexOf(value) !== -1
      }
    }
  },
  data () {
    return {
      id: 'amazon-pay-wallet',
      isSet: false,
      loaded: false
    }
  },
  computed: {
    amazonPaymentsReady () {
      return this.$store.state[KEY].amazonPaymentsReady
    },
    orderReferenceId () {
      return this.$store.state[KEY].orderReferenceId
    },
    orderState () {
      return this.$store.state[KEY].orderState
    },
    readOnly () {
      return !!this.orderState &&
        this.orderState !== states.NEW &&
        this.orderState !== states.DRAFT &&
        this.orderState !== states.SUSPENDED
    }
  },
  watch: {
    readOnly: function (newVal, oldVal) {
      this.setupWidget(true)
    }
  },
  beforeMount () {
    this.$bus.$on('amazon-order-constraints', this.onOrderConstraints)
    this.$bus.$on('amazon-invalid-payment-method', this.onInvalidPaymentMethod)
  },
  beforeDestroy () {
    this.$bus.$off('amazon-order-constraints', this.onOrderConstraints)
    this.$bus.$off('amazon-invalid-payment-method', this.onInvalidPaymentMethod)
  },
  mounted () {
    if (config.amazonPay) {
      if (this.amazonPaymentsReady && this.orderReferenceId) {
        this.setupWidget()
      } else {
        this.$bus.$on('amazon-order-reference-created', this.setupWidget)
      }
    }
  },
  methods: {
    setupWidget (force = false) {
      if (force || !this.isSet) {
        this.isSet = true
        this.loaded = false
        new window.OffAmazonPayments.Widgets.Wallet({
          sellerId: config.amazonPay.merchantId,
          design: {
            designMode: this.designMode
          },
          amazonOrderReferenceId: this.orderReferenceId,
          onPaymentSelect: this.onPaymentSelect,
          onReady: this.onReady,
          onError: this.onError,
          displayMode: this.readOnly ? 'Read' : 'Edit'
        }).bind(this.id)
      }
    },
    onPaymentSelect (orderReference) {
      if (!this.readOnly) {
        // Replace this code with the action that you want to perform
        // after the payment method is chosen.

        // Ideally this would enable the next action for the buyer
        // including either a "Continue" or "Place Order" button.
        this.$bus.$emit('amazon-payment-selected', orderReference)
      }
    },
    onReady (orderReference) {
      this.loaded = true
      this.$bus.$emit('amazon-wallet-ready', orderReference)
    },
    onError (error) {
      console.error(error.getErrorCode(), error.getErrorMessage())
      if (error.getErrorCode() === 'BuyerSessionExpired') {
        this.isSet = false
        // TODO: session expired - render button component
      }
    },
    onOrderConstraints (constraints) {
      this.setupWidget(true)
      for (let i = 0; i < constraints.length; i++) {
        const constraint = constraints[i].Constraint

        this.$store.dispatch('notification/spawnNotification', {
          type: 'error',
          message: i18n.t(constraint.Description),
          action1: { label: i18n.t('OK') }
        })
      }
    },
    onInvalidPaymentMethod () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: i18n.t('That payment method was not accepted for this transaction. Please choose another.'),
        action1: { label: i18n.t('OK') }
      })
    }
  }
}
</script>

<style scoped>
#amazon-pay-wallet.loaded {
  min-width: 300px;
  max-width: 600px;
  min-height: 228px;
  max-height: 400px;
}

/* Mobile optimized and small window */
#amazon-pay-wallet.loaded {
  width: 100%;
  height: 228px;
}
</style>
