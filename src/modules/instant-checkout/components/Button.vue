<template>
  <button
    v-if="supported"
    @click="showPayment"
  >
    {{ $t('Instant Checkout') }}
  </button>
</template>

<script>
import i18n from '@vue-storefront/i18n'
import rootStore from '@vue-storefront/store'
import { currentStoreView } from '@vue-storefront/store/lib/multistore'
const storeView = currentStoreView()

export default {
  name: 'InstantCheckoutButton',
  data () {
    return {
      supported: false,
      country: rootStore.state.checkout.shippingDetails.country ? rootStore.state.checkout.shippingDetails.country : storeView.tax.defaultCountry,
      paymentMethods: [
        {
          supportedMethods: ['basic-card'],
          data: {
            supportedNetworks: ['visa']
          }
        }
      ],
      paymentOptions: {
        requestPayerName: true,
        requestPayerEmail: true,
        requestPayerPhone: true,
        requestShipping: true,
        shippingType: 'shipping'
      },
      shippingOptions: []
    }
  },
  computed: {
    platformTotal () {
      return this.$store.state.cart.platformTotalSegments
    },
    bucket () {
      const bucket = []

      // Add products
      this.$store.state.cart.cartItems.forEach(product => {
        bucket.push({
          label: product.name,
          amount: { currency: storeView.i18n.currencyCode, value: product.priceInclTax }
        })
      })

      // If synchronization is disabled add shipping and return
      if (this.platformTotal === null) {
        if (this.selectedShippingOption.length > 0) {
          bucket.push({
            label: i18n.t('Shipping'),
            amount: { currency: storeView.i18n.currencyCode, value: this.selectedShippingOption[0].amount.value }
          })
        }

        return bucket
      }

      // If synchronization is eanbled get shipping and discount values from Magento
      const shipping = this.platformTotal.filter(segment => {
        return segment.code === 'shipping'
      })
      if (shipping.length > 0) {
        bucket.push({
          label: shipping[0].title,
          amount: { currency: storeView.i18n.currencyCode, value: shipping[0].value }
        })
      }

      const discount = this.platformTotal.filter(segment => {
        return segment.code === 'discount'
      })
      if (discount.length > 0) {
        bucket.push({
          label: discount[0].title,
          amount: { currency: storeView.i18n.currencyCode, value: discount[0].value }
        })
      }

      return bucket
    },
    selectedShippingOption () {
      return this.shippingOptions.filter(option => {
        return option.selected
      })
    },
    total () {
      // If synchronization is disabled calculate totals
      if (this.platformTotal === null) {
        let subtotal = 0

        this.$store.state.cart.cartItems.forEach(product => {
          subtotal += parseFloat(product.priceInclTax)
        })

        subtotal += parseFloat(this.selectedShippingOption[0].amount.value)

        return {
          label: i18n.t('Grand total'),
          amount: { currency: storeView.i18n.currencyCode, value: subtotal }
        }
      }

      // If synchronization is enabled return total taken from Magento
      const total = this.platformTotal.filter(segment => {
        return segment.code === 'grand_total'
      })
      if (total.length > 0) {
        return {
          label: total[0].title,
          amount: { currency: storeView.i18n.currencyCode, value: total[0].value }
        }
      }

      return {}
    },
    paymentDetails () {
      return {
        displayItems: this.bucket,
        shippingOptions: this.shippingOptions,
        total: this.total
      }
    }
  },
  methods: {
    showPayment () {
      const payment = new PaymentRequest(this.paymentMethods, this.paymentDetails, this.paymentOptions)

      payment.addEventListener('shippingoptionchange', this.shippingOptionChange)
      payment.addEventListener('shippingaddresschange', this.shippingAddressChange)

      payment
        .show()
        .then(response => console.log(response))
        .catch(error => console.log(error))
    },
    shippingOptionChange (event) {
      const selectedId = event.target.shippingOption

      this.shippingOptions.forEach(option => {
        option.selected = option.id === selectedId
      })

      const dataToUpdate = new Promise((resolve, reject) => {
        this.$store.dispatch('cart/refreshTotals', {
          country: this.country,
          method_code: this.selectedShippingOption[0].id,
          carrier_code: this.selectedShippingOption[0].carrier_code,
          payment_method: null
        }).then(() => {
          resolve({
            displayItems: this.bucket,
            shippingOptions: this.shippingOptions,
            total: this.total
          })
        }).catch(e => {
          console.error(e)
          reject(e)
        })
      })

      event.updateWith(dataToUpdate)
    },
    shippingAddressChange (event) {
      const shippingAddress = event.target.shippingAddress
      this.country = shippingAddress.country

      const dataToUpdate = new Promise((resolve, reject) => {
        this.updateShippingOptions()
          .then(() => {
            return this.$store.dispatch('cart/refreshTotals', {
              country: this.country,
              method_code: this.selectedShippingOption[0].id,
              carrier_code: this.selectedShippingOption[0].carrier_code,
              payment_method: null
            })
          }).then(() => {
            resolve({
              displayItems: this.bucket,
              shippingOptions: this.shippingOptions,
              total: this.total
            })
          }).catch(e => {
            console.error(e)
            reject(e)
          })
      })

      event.updateWith(dataToUpdate)
    },
    updateShippingOptions () {
      return new Promise((resolve, reject) => {
        rootStore.dispatch('cart/getShippingMethods', {
          country_id: this.country
        }).then(() => {
          this.shippingOptions = []
          this.$store.state.shipping.methods.forEach(method => {
            this.shippingOptions.push({
              id: method.method_code,
              carrier_code: method.carrier_code,
              label: method.method_title,
              selected: this.$store.state.shipping.methods[0].method_code === method.method_code,
              amount: {
                currency: storeView.i18n.currencyCode,
                value: method.price_incl_tax
              }
            })
          })
          resolve()
        }).catch(e => {
          console.error(e)
          reject(e)
        })
      })
    }
  },
  mounted () {
    if (window.PaymentRequest) {
      this.supported = true
      this.updateShippingOptions()
    }
  }
}
</script>
