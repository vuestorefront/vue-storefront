<template>
  <div :id="id" :class="{loaded}" />
</template>

<script>
import config from 'config'
import { KEY } from '../index'
import * as types from '../store/mutation-types'
import * as states from '../store/order-states'

export default {
  name: 'AmazonPayAddressBook',
  props: {
    designMode: {
      type: String,
      required: false,
      default: 'responsive',
      validator: function (value) {
        return ['responsive', 'smartphoneCollapsible'].indexOf(value) !== -1
      }
    },
    savePaymentDetails: {
      type: Boolean,
      required: false,
      default: false
    },
    saveShippingDetails: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      id: 'amazon-pay-address-book',
      isSet: false,
      loaded: false
    }
  },
  computed: {
    checkoutPaymentDetails () {
      return this.$store.state.checkout.paymentDetails
    },
    checkoutShippingDetails () {
      return this.$store.state.checkout.shippingDetails
    },
    amazonPaymentsReady () {
      return this.$store.state[KEY].amazonPaymentsReady
    },
    userToken () {
      return this.$store.state[KEY].userToken
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
        this.orderState !== states.DRAFT
    }
  },
  watch: {
    readOnly: function (newVal, oldVal) {
      this.setupWidget(true)
    }
  },
  beforeMount () {
    this.$bus.$on('amazon-order-constraints', this.onOrderConstraints)
  },
  beforeDestroy () {
    this.$bus.$off('amazon-order-constraints', this.onOrderConstraints)
  },
  mounted () {
    if (config.amazonPay) {
      if (this.amazonPaymentsReady) {
        if (this.userToken) {
          this.setupWidget()
        } else {
          this.$store.dispatch(KEY + '/loadUserToken').then(token => {
            this.setupWidget()
          }).catch(() => {
            this.$bus.$on('amazon-authorized', this.setupWidget)
            // TODO: if no token saved - render button component instead
          })
        }
      } else {
        this.$bus.$on('amazon-authorized', this.setupWidget)
      }
    }
  },
  methods: {
    setupWidget (force = false) {
      if (force || !this.isSet) {
        this.isSet = true
        this.loaded = false
        new window.OffAmazonPayments.Widgets.AddressBook({
          sellerId: config.amazonPay.merchantId,
          design: {
            designMode: this.designMode
          },
          amazonOrderReferenceId: this.orderReferenceId,
          onOrderReferenceCreate: this.onOrderReferenceCreate,
          onAddressSelect: this.onAddressSelect,
          onReady: this.onReady,
          onError: this.onError,
          displayMode: this.readOnly ? 'Read' : 'Edit'
        }).bind(this.id)
      }
    },
    onOrderReferenceCreate (orderReference) {
      if (!this.readOnly) {
        this.$store.commit(KEY + '/' + types.SET_ORDER_REFERENCE_ID, orderReference.getAmazonOrderReferenceId())
        this.$store.commit(KEY + '/' + types.SET_ORDER_STATE, states.NEW)
        this.$bus.$emit('amazon-order-reference-created', orderReference.getAmazonOrderReferenceId())
      }
    },
    onAddressSelect () {
      if (!this.readOnly) {
        this.$bus.$emit('amazon-address-selected')
        this.$store.dispatch(KEY + '/getOrderReferenceDetails').then(response => {
          this.$bus.$emit('amazon-address-available', response.result.Destination)

          if (response.result.Destination.DestinationType === 'Physical') {
            let name = response.result.Destination.PhysicalDestination.Name.split(' ', 2)
            let address = {
              firstName: name[0],
              lastName: name.length > 1 ? name[1] : '',
              country: response.result.Destination.PhysicalDestination.CountryCode,
              state: response.result.Destination.PhysicalDestination.StateOrRegion,
              city: response.result.Destination.PhysicalDestination.City,
              streetAddress: response.result.Destination.PhysicalDestination.AddressLine1,
              apartmentNumber: response.result.Destination.PhysicalDestination.AddressLine2,
              zipCode: response.result.Destination.PhysicalDestination.PostalCode,
              phoneNumber: response.result.Destination.PhysicalDestination.Phone
            }

            if (this.savePaymentDetails) {
              let payment = {
                ...address,
                paymentMethod: this.checkoutPaymentDetails.paymentMethod,
                paymentMethodAdditional: this.checkoutPaymentDetails.paymentMethodAdditional
              }
              this.$store.dispatch('checkout/savePaymentDetails', payment)
            }

            if (this.saveShippingDetails) {
              let shipping = {
                ...address,
                shippingMethod: this.checkoutShippingDetails.shippingMethod,
                shippingCarrier: this.checkoutShippingDetails.shippingCarrier
              }
              this.$store.dispatch('checkout/saveShippingDetails', shipping)
            }
          }
        })
      }
    },
    onReady (orderReference) {
      this.loaded = true
      this.$bus.$emit('amazon-address-book-ready', orderReference)
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
    }
  }
}
</script>

<style scoped>
#amazon-pay-address-book.loaded {
  min-width: 300px;
  max-width: 600px;
  min-height: 228px;
  max-height: 400px;
}

/* Mobile optimized and small window */
#amazon-pay-address-book.loaded {
  width: 100%;
  height: 228px;
}
</style>
