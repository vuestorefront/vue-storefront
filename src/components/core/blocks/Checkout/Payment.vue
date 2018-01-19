<template>
  <div class='payment'>
    Core payment
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PaymentMethods from 'src/resource/payment_methods.json'
import Countries from 'src/resource/countries.json'

export default {
  name: 'payment',
  props: ['isActive'],
  data () {
    return {
      isFilled: false,
      paymentMethods: PaymentMethods,
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
  mounted () {
    if (this.payment.firstName.length === 0) {
      this.initializeBillingAddress()
    }
  },
  methods: {
    sendDataToCheckout () {
      this.$bus.$emit('checkout.payment', this.payment, this.$v)
      this.isFilled = true
    },
    edit () {
      if (this.isFilled) {
        this.$bus.$emit('checkout.edit', 'payment')
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
      for (let i = 0; i < PaymentMethods.length; i++) {
        if (PaymentMethods[i].code === this.payment.paymentMethod) {
          return {
            name: PaymentMethods[i].name
          }
        }
      }
      return {
        name: ''
      }
    }
  }
}
</script>
