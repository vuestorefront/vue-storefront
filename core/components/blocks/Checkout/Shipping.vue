<template>
  <div class="shipping">
    Core shipping
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ShippingMethods from 'core/resource/shipping_methods.json'
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
  },
  data () {
    return {
      isFilled: false,
      shippingMethods: ShippingMethods,
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
      currentUser: state => state.user.current
    })
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
      for (let i = 0; i < ShippingMethods.length; i++) {
        if (ShippingMethods[i].code === this.shipping.shippingMethod) {
          return {
            name: ShippingMethods[i].name,
            cost: ShippingMethods[i].cost
          }
        }
      }
      return {
        name: '',
        cost: ''
      }
    },
    getCountryName () {
      for (let i = 0; i < this.countries.length; i++) {
        if (this.countries[i].code === this.shipping.country) {
          return this.countries[i].name
        }
      }
      return ''
    }
  }
}
</script>
