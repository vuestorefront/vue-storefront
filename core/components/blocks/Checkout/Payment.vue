<template>
  <div class="payment">
    Core payment
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Countries from 'core/resource/countries.json'

export default {
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
      paymentMethods: this.$store.state.payment.methods,
      countries: Countries,
      payment: this.$store.state.checkout.paymentDetails,
      generateInvoice: false,
      sendToShippingAddress: false,
      sendToBillingAddress: false
    }
  },
  computed: {
    ...mapState({
      currentUser: state => state.user.current
    })
  },
  watch: {
    'payment.paymentMethod': function (code) {
      this.onPaymentMethodChanged(code)
    }
  },
  mounted () {
    if (this.payment.firstName.length === 0) {
      this.initializeBillingAddress()
    } else {
      if (this.payment.company) {
        this.generateInvoice = true
      }
    }
    this.onPaymentMethodChanged(this.payment.paymentMethod)
  },
  methods: {
    sendDataToCheckout () {
      this.$bus.$emit('checkout-after-paymentDetails', this.payment, this.$v)
      this.isFilled = true
    },
    edit () {
      if (this.isFilled) {
        this.$bus.$emit('checkout-before-edit', 'payment')
        this.isFilled = false
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
    initializeBillingAddress () {
      let initialized = false
      if (this.currentUser) {
        if (this.currentUser.hasOwnProperty('default_billing')) {
          let id = this.currentUser.default_billing
          let addresses = this.currentUser.addresses
          for (let i = 0; i < addresses.length; i++) {
            if (addresses[i].id === Number(id)) {
              this.payment = {
                firstName: addresses[i].firstname,
                lastName: addresses[i].lastname,
                company: addresses[i].company,
                country: addresses[i].country_id,
                state: addresses[i].region.region ? addresses[i].region.region : '',
                city: addresses[i].city,
                streetAddress: addresses[i].street[0],
                apartmentNumber: addresses[i].street[1],
                zipCode: addresses[i].postcode,
                taxId: addresses[i].vat_id,
                paymentMethod: 'cashondelivery'
              }
              this.generateInvoice = true
              this.sendToBillingAddress = true
              initialized = true
            }
          }
        }
      }
      if (!initialized) {
        this.payment = {
          firstName: '',
          lastName: '',
          company: '',
          country: '',
          state: '',
          city: '',
          streetAddress: '',
          apartmentNumber: '',
          postcode: '',
          phoneNumber: '',
          taxId: '',
          paymentMethod: 'cashondelivery'
        }
      }
    },
    useShippingAddress () {
      this.sendToShippingAddress = !this.sendToShippingAddress
      if (this.sendToShippingAddress) {
        let shippingDetails = this.$store.state.checkout.shippingDetails
        this.payment = {
          firstName: shippingDetails.firstName,
          lastName: shippingDetails.lastName,
          country: shippingDetails.country,
          state: shippingDetails.state,
          city: shippingDetails.city,
          streetAddress: shippingDetails.streetAddress,
          apartmentNumber: shippingDetails.apartmentNumber,
          zipCode: shippingDetails.zipCode,
          phoneNumber: shippingDetails.phoneNumber,
          paymentMethod: 'cashondelivery'
        }
        this.sendToBillingAddress = false
        this.generateInvoice = false
      } else {
        this.payment = this.$store.state.checkout.paymentDetails
        this.generateInvoice = false
      }
    },
    useBillingAddress () {
      this.sendToBillingAddress = !this.sendToBillingAddress
      if (this.sendToBillingAddress) {
        let id = this.currentUser.default_billing
        let addresses = this.currentUser.addresses
        for (let i = 0; i < addresses.length; i++) {
          if (addresses[i].id === Number(id)) {
            this.payment = {
              firstName: addresses[i].firstname,
              lastName: addresses[i].lastname,
              company: addresses[i].company,
              country: addresses[i].country_id,
              state: addresses[i].region.region ? addresses[i].region.region : '',
              city: addresses[i].city,
              streetAddress: addresses[i].street[0],
              apartmentNumber: addresses[i].street[1],
              zipCode: addresses[i].postcode,
              taxId: addresses[i].vat_id,
              paymentMethod: 'cashondelivery'
            }
            this.generateInvoice = true
          }
        }
        this.sendToShippingAddress = false
      } else {
        this.payment = this.$store.state.checkout.paymentDetails
        this.generateInvoice = false
      }
    },
    useGenerateInvoice () {
      this.generateInvoice = !this.generateInvoice
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
            name: this.paymentMethods[i].name
          }
        }
      }
      return {
        name: ''
      }
    },
    onPaymentMethodChanged (code) {
      // reset the additional payment method component container if exists.
      if (document.getElementById('checkout-order-review-additional-container')) {
        document.getElementById('checkout-order-review-additional-container').innerHTML = '<div id="checkout-order-review-additional">&nbsp;</div>' // reset
      }

      // Let anyone listening know that we've changed payment method, usually a payment extension.
      this.$bus.$emit('checkout-payment-method-changed', code)
    }
  }
}
</script>
