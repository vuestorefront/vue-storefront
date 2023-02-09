import { mapState, mapGetters } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'

import isAddressEmpty from '../helpers/is-address-empty.function'
import isAddressesEquals from '../helpers/is-addresses-equals.function'

const Countries = require('@vue-storefront/i18n/resource/countries.json')

export const Shipping = {
  name: 'Shipping',
  props: {
    isActive: {
      type: Boolean,
      required: true
    }
  },
  beforeDestroy () {
    this.$bus.$off('checkout-after-load', this.onCheckoutLoad)
    this.$bus.$off('checkout-after-personalDetails', this.onAfterPersonalDetails)
    this.$bus.$off('checkout-after-shippingset', this.onAfterShippingSet)
  },
  beforeMount () {
    this.$bus.$on('checkout-after-load', this.onCheckoutLoad)
    this.$bus.$on('checkout-after-personalDetails', this.onAfterPersonalDetails)
    this.$bus.$on('checkout-after-shippingset', this.onAfterShippingSet)
  },
  data () {
    return {
      isFilled: false,
      countries: Countries,
      shipping: this.$store.state.checkout.shippingDetails,
      shipToMyAddress: false
    }
  },
  computed: {
    ...mapState({
      currentUser: (state: RootState) => state.user.current
    }),
    ...mapGetters({
      shippingMethods: 'checkout/getShippingMethods'
    }),
    checkoutShippingDetails () {
      return this.$store.state.checkout.shippingDetails
    },
    defaultShippingAddress () {
      if (!this.currentUser || !this.currentUser.default_shipping) {
        return;
      }

      const address = this.currentUser.addresses.find((address) => {
        return address.id.toString() === this.currentUser.default_shipping.toString();
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
    },
    hasDefaultShippingAddress () {
      return !!this.defaultShippingAddress;
    },
    paymentMethod () {
      return this.$store.getters['checkout/getPaymentMethods']
    }
  },
  watch: {
    shippingMethods: {
      handler () {
        this.checkDefaultShippingMethod()
      }
    },
    shipToMyAddress: {
      handler () {
        this.useMyAddress()
      }
    },
    '$route.hash': 'useMyAddress'
  },
  mounted () {
    this.fillFormData();
    this.checkDefaultShippingMethod()
    this.changeShippingMethod()
  },
  methods: {
    checkDefaultShippingMethod () {
      if (!this.shipping.shippingMethod || this.notInMethods(this.shipping.shippingMethod)) {
        let shipping = this.shippingMethods.find(item => item.default)
        if (!shipping && this.shippingMethods && this.shippingMethods.length > 0) {
          shipping = this.shippingMethods[0]
        }
        this.shipping.shippingMethod = shipping.method_code
        this.shipping.shippingCarrier = shipping.carrier_code
      }
    },
    onAfterShippingSet (receivedData) {
      this.shipping = receivedData
      this.isFilled = true
    },
    onAfterPersonalDetails (receivedData) {
      if (!this.isFilled) {
        this.$store.dispatch('checkout/updatePropValue', ['firstName', receivedData.firstName])
        this.$store.dispatch('checkout/updatePropValue', ['lastName', receivedData.lastName])
      }
      this.useMyAddress()
    },
    sendDataToCheckout () {
      this.$bus.$emit('checkout-after-shippingDetails', this.shipping, this.$v)
      this.isFilled = true
    },
    edit () {
      if (this.isFilled) {
        this.$bus.$emit('checkout-before-edit', 'shipping')
      }
    },
    useMyAddress () {
      if (this.shipToMyAddress) {
        this.$set(this, 'shipping', {
          ...this.defaultShippingAddress,
          shippingMethod: this.checkoutShippingDetails.shippingMethod,
          shippingCarrier: this.checkoutShippingDetails.shippingCarrier
        })
      } else {
        this.$set(this, 'shipping', this.checkoutShippingDetails)
      }
      this.changeCountry()
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
      let shippingCode = this.shipping.shippingMethod
      let currentMethod = this.shippingMethods ? this.shippingMethods.find(item => item.method_code === shippingCode) : {}
      return currentMethod
    },
    changeShippingMethod () {
      let currentShippingMethod = this.getCurrentShippingMethod()
      if (currentShippingMethod) {
        this.shipping = Object.assign(this.shipping, { shippingCarrier: currentShippingMethod.carrier_code })
        this.$bus.$emit('checkout-after-shippingMethodChanged', {
          country: this.shipping.country,
          method_code: currentShippingMethod.method_code,
          carrier_code: currentShippingMethod.carrier_code,
          payment_method: this.paymentMethod[0].code
        })
      }
    },
    notInMethods (method) {
      let availableMethods = this.shippingMethods
      if (availableMethods.find(item => item.method_code === method)) {
        return false
      }
      return true
    },
    onCheckoutLoad () {
      this.fillFormData();
    },
    fillFormData () {
      this.shipping = this.$store.state.checkout.shippingDetails

      this.updateShipToMyAddress();
    },
    updateShipToMyAddress () {
      this.shipToMyAddress = false;

      if (!this.defaultShippingAddress) {
        return;
      }

      if (isAddressEmpty(this.shipping, ['country'])) {
        this.shipToMyAddress = true;
        return;
      }

      this.shipToMyAddress = isAddressesEquals(this.defaultShippingAddress, this.shipping);
    }
  }
}
