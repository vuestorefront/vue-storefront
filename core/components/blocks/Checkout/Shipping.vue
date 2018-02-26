<template>
  <div class="shipping">
    Core shipping
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Countries from 'core/resource/countries.json'

export default {
  name: 'Shipping',
  props: {
    isActive: {
      type: Boolean,
      required: true
    }
  },
  created () {
    this.$bus.$on('checkout-after-personalDetails', (receivedData) => {
      if (!this.isFilled) {
        this.$store.dispatch('checkout/updatePropValue', ['firstName', receivedData.firstName])
        this.$store.dispatch('checkout/updatePropValue', ['lastName', receivedData.lastName])
      }
    })
    this.$bus.$on('checkout-after-shippingset', (receivedData) => {
      this.shipping = receivedData
      this.isFilled = true
    })
  },
  data () {
    return {
      isFilled: false,
      countries: Countries,
      shipping: this.$store.state.checkout.shippingDetails,
      shipToMyAddress: false,
      myAddressDetails: {
        firstname: '',
        lastname: '',
        country: '',
        region: '',
        city: '',
        street: ['', ''],
        postcode: '',
        telephone: ''
      }
    }
  },
  computed: {
    ...mapState({
      currentUser: state => state.user.current,
      shippingMethods: state => state.cart.shipping instanceof Array ? state.cart.shipping : [state.cart.shipping]
    })
  },
  watch: {
    'shipping.shippingMethod': 'changeShippingMethod'
  },
  methods: {
    sendDataToCheckout () {
      this.$bus.$emit('checkout-after-shippingDetails', this.shipping, this.$v)
      this.isFilled = true
    },
    edit () {
      if (this.isFilled) {
        this.$bus.$emit('checkout-before-edit', 'shipping')
        this.isFilled = false
      }
    },
    hasShippingDetails () {
      if (this.currentUser) {
        if (this.currentUser.hasOwnProperty('default_shipping')) {
          let id = this.currentUser.default_shipping
          let addresses = this.currentUser.addresses
          for (let i = 0; i < addresses.length; i++) {
            if (addresses[i].id === Number(id)) {
              this.myAddressDetails = addresses[i]
              return true
            }
          }
        }
      }
      return false
    },
    useMyAddress () {
      this.shipToMyAddress = !this.shipToMyAddress
      if (this.shipToMyAddress) {
        this.shipping = {
          firstName: this.myAddressDetails.firstname,
          lastName: this.myAddressDetails.lastname,
          country: this.myAddressDetails.country_id,
          state: this.myAddressDetails.region.region ? this.myAddressDetails.region.region : '',
          city: this.myAddressDetails.city,
          streetAddress: this.myAddressDetails.street[0],
          apartmentNumber: this.myAddressDetails.street[1],
          zipCode: this.myAddressDetails.postcode,
          phoneNumber: this.myAddressDetails.telephone,
          shippingMethod: this.$store.state.checkout.shippingDetails.shippingMethod
        }
      } else {
        this.shipping = this.$store.state.checkout.shippingDetails
      }
    },
    getShippingMethod () {
      for (let i = 0; i < this.shippingMethods.length; i++) {
        if (this.shippingMethods[i].method_code === this.shipping.shippingMethod) {
          return {
            method_title: this.shippingMethods[i].method_title,
            amount: this.shippingMethods[i].amount
          }
        }
      }
      return {
        method_title: '',
        amount: ''
      }
    },
    getCountryName () {
      for (let i = 0; i < this.countries.length; i++) {
        if (this.countries[i].code === this.shipping.country) {
          return this.countries[i].name
        }
      }
      return ''
    },
    changeCountry () {
      this.$bus.$emit('checkout-before-shippingMethods', this.shipping.country)
    },
    getCurrentShippingMethod () {
      let info = {}
      let shippingCode = this.shipping.shippingMethod
      let shippingMethods = this.$store.state.cart.shipping
      for (let i = 0; i < shippingMethods.length; i++) {
        if (shippingMethods[i].method_code === shippingCode) {
          info.method_code = shippingMethods[i].method_code
          info.carrier_code = shippingMethods[i].carrier_code
        }
      }
      return info
    },
    changeShippingMethod () {
      let currentShippingMethod = this.getCurrentShippingMethod()
      this.$bus.$emit('checkout-after-shippingMethodChanged', {
        country: this.shipping.country,
        method_code: currentShippingMethod.method_code,
        carrier_code: currentShippingMethod.carrier_code,
        payment_method: this.$store.state.payment.methods[0].code
      })
    }
  }
}
</script>
