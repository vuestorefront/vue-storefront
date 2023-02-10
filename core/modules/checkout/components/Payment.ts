import { mapState, mapGetters } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import debounce from 'lodash-es/debounce'

import isAddressesEquals from '../helpers/is-addresses-equals.function'
import isAddressEmpty from '../helpers/is-address-empty.function'

const Countries = require('@vue-storefront/i18n/resource/countries.json')

export const Payment = {
  name: 'Payment',
  props: {
    isActive: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      isFilled: false,
      countries: Countries,
      payment: this.$store.getters['checkout/getPaymentDetails'],
      generateInvoice: false,
      sendToShippingAddress: false,
      sendToBillingAddress: false
    }
  },
  computed: {
    ...mapState({
      currentUser: (state: RootState) => state.user.current,
      shippingDetails: (state: RootState) => state.checkout.shippingDetails
    }),
    ...mapGetters({
      paymentMethods: 'checkout/getPaymentMethods',
      paymentDetails: 'checkout/getPaymentDetails',
      isVirtualCart: 'cart/isVirtualCart'
    }),
    defaultBillingAddress () {
      if (!this.currentUser || !this.currentUser.default_billing) {
        return;
      }

      const address = this.currentUser.addresses.find((address) => {
        return address.id.toString() === this.currentUser.default_billing.toString();
      })

      if (!address) {
        return;
      }

      return {
        firstName: address.firstname,
        lastName: address.lastname,
        country: address.country_id,
        state: address.region.region ? address.region.region : '',
        city: address.city,
        streetAddress: address.street[0],
        apartmentNumber: address.street[1],
        zipCode: address.postcode.toString(),
        phoneNumber: address.telephone.toString()
      }
    }
  },
  created () {
    if (!this.payment.paymentMethod || this.notInMethods(this.payment.paymentMethod)) {
      this.payment.paymentMethod = this.paymentMethods.length > 0 ? this.paymentMethods[0].code : 'cashondelivery'
    }
  },
  beforeMount () {
    this.$bus.$on('checkout-after-load', this.onCheckoutLoad)
  },
  mounted () {
    if (this.payment.company) {
      this.generateInvoice = true
    }

    this.changePaymentMethod();

    this.fillFormData();
  },
  beforeDestroy () {
    this.$bus.$off('checkout-after-load', this.onCheckoutLoad)
  },
  watch: {
    shippingDetails: {
      handler () {
        if (this.sendToShippingAddress) {
          this.copyShippingToBillingAddress()
        }
      },
      deep: true
    },
    sendToShippingAddress: {
      handler () {
        this.useShippingAddress()
      }
    },
    sendToBillingAddress: {
      handler () {
        this.useBillingAddress()
      }
    },
    generateInvoice: {
      handler () {
        this.useGenerateInvoice()
      }
    },
    paymentMethods: {
      handler: debounce(function () {
        this.changePaymentMethod()
      }, 500)
    }
  },
  methods: {
    sendDataToCheckout () {
      this.$bus.$emit('checkout-after-paymentDetails', this.payment, this.$v)
      this.isFilled = true
    },
    edit () {
      if (this.isFilled) {
        this.$bus.$emit('checkout-before-edit', 'payment')
      }
    },
    hasBillingData () {
      if (this.currentUser) {
        if (this.currentUser.hasOwnProperty('default_billing')) {
          return true
        }
      }
      return false
    },
    useShippingAddress () {
      if (this.isVirtualCart) {
        this.sendToShippingAddress = false;
      }

      if (this.sendToShippingAddress) {
        this.copyShippingToBillingAddress()
        this.sendToBillingAddress = false
      }

      if (!this.sendToBillingAddress && !this.sendToShippingAddress) {
        this.payment = this.paymentDetails
      }
    },
    copyShippingToBillingAddress () {
      this.payment = {
        firstName: this.shippingDetails.firstName,
        lastName: this.shippingDetails.lastName,
        country: this.shippingDetails.country,
        state: this.shippingDetails.state,
        city: this.shippingDetails.city,
        streetAddress: this.shippingDetails.streetAddress,
        apartmentNumber: this.shippingDetails.apartmentNumber,
        zipCode: this.shippingDetails.zipCode,
        phoneNumber: this.shippingDetails.phoneNumber,
        paymentMethod: this.paymentMethods.length > 0 ? this.paymentMethods[0].code : ''
      }
    },
    useBillingAddress () {
      if (this.sendToBillingAddress) {
        this.payment = {
          ...this.defaultBillingAddress,
          paymentMethod: this.paymentMethods.length > 0 ? this.paymentMethods[0].code : ''
        }

        this.generateInvoice = true;
        this.sendToShippingAddress = false
      }

      if (!this.sendToBillingAddress && !this.sendToShippingAddress) {
        this.payment = this.paymentDetails
        this.generateInvoice = false
      }
    },
    useGenerateInvoice () {
      if (!this.generateInvoice) {
        this.payment.company = ''
        this.payment.taxId = ''
      }
    },
    getCountryName () {
      for (let i = 0; i < this.countries.length; i++) {
        if (this.countries[i].code === this.payment.country) {
          return this.countries[i].name
        }
      }
      return ''
    },
    getPaymentMethod () {
      for (let i = 0; i < this.paymentMethods.length; i++) {
        if (this.paymentMethods[i].code === this.payment.paymentMethod) {
          return {
            title: this.paymentMethods[i].title ? this.paymentMethods[i].title : this.paymentMethods[i].name
          }
        }
      }
      return {
        name: ''
      }
    },
    notInMethods (method) {
      let availableMethods = this.paymentMethods
      if (availableMethods.find(item => item.code === method)) {
        return false
      }
      return true
    },
    changePaymentMethod () {
      // reset the additional payment method component container if exists.
      if (document.getElementById('checkout-order-review-additional-container')) {
        document.getElementById('checkout-order-review-additional-container').innerHTML = '<div id="checkout-order-review-additional">&nbsp;</div>' // reset
      }

      // Let anyone listening know that we've changed payment method, usually a payment extension.
      if (this.payment.paymentMethod) {
        this.$bus.$emit('checkout-payment-method-changed', this.payment.paymentMethod)
      }
    },
    changeCountry () {
      this.$store.dispatch('checkout/updatePaymentDetails', { country: this.payment.country })
      this.$store.dispatch('cart/syncPaymentMethods', { forceServerSync: true })
    },
    onCheckoutLoad () {
      this.fillFormData();
    },
    fillFormData () {
      this.payment = this.$store.getters['checkout/getPaymentDetails'];

      this.updateCheckboxesFlags();
    },
    updateCheckboxesFlags () {
      this.sendToBillingAddress = false;
      this.sendToShippingAddress = false;

      if (
        !!this.defaultBillingAddress &&
         (isAddressEmpty(this.payment, ['country']) ||
         isAddressesEquals(this.payment, this.defaultBillingAddress))
      ) {
        this.sendToBillingAddress = true;
        return;
      }

      if (isAddressEmpty(this.payment, ['country']) ||
        isAddressesEquals(this.payment, this.shippingDetails)
      ) {
        this.sendToShippingAddress = true;
      }
    }
  }
}
