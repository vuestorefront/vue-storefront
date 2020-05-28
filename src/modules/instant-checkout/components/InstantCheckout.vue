<template>
  <button
    v-if="supported"
    @click="showPayment"
  >
    {{ $t('Instant Checkout') }}
  </button>
</template>

<script>
import config from 'config'
import i18n from '@vue-storefront/i18n'
import rootStore from '@vue-storefront/core/store'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { registerModule } from '@vue-storefront/core/lib/modules'
import { OrderModule } from '@vue-storefront/core/modules/order'
import { Logger } from '@vue-storefront/core/lib/logger'

export default {
  name: 'InstantCheckoutButton',
  beforeCreate () {
    registerModule(OrderModule)
  },
  data () {
    return {
      supported: false,
      country: rootStore.state.checkout.shippingDetails.country ? rootStore.state.checkout.shippingDetails.country : currentStoreView().tax.defaultCountry,
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
          amount: {
            currency: currentStoreView().i18n.currencyCode,
            value: this.getProductPrice(product)
          }
        })
      })

      // If synchronization is disabled add shipping and return
      if (this.platformTotal === null) {
        if (this.selectedShippingOption.length > 0) {
          bucket.push({
            label: i18n.t('Shipping'),
            amount: { currency: currentStoreView().i18n.currencyCode, value: this.selectedShippingOption[0].amount.value }
          })
        }

        return bucket
      }

      // If synchronization is eanbled get shipping and discount values from Magento
      const shipping = this.platformTotal.filter(segment => segment.code === 'shipping' && segment.value)
      if (shipping.length > 0) {
        bucket.push({
          label: shipping[0].title,
          amount: { currency: currentStoreView().i18n.currencyCode, value: shipping[0].value }
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
          subtotal += parseFloat(product.price_incl_tax)
        })

        if (this.selectedShippingOption.length > 0) {
          subtotal += parseFloat(this.selectedShippingOption[0].amount.value)
        }

        return {
          label: i18n.t('Grand total'),
          amount: { currency: currentStoreView().i18n.currencyCode, value: subtotal }
        }
      }

      // If synchronization is enabled return total taken from Magento
      const total = this.platformTotal.filter(segment => {
        return segment.code === 'grand_total'
      })
      if (total.length > 0) {
        return {
          label: total[0].title,
          amount: { currency: currentStoreView().i18n.currencyCode, value: total[0].value }
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
        .then(response => {
          // TODO handle payment
          this.$store.dispatch('order/placeOrder', this.createOrder(response), { root: true }).then(result => {
            if (!result.resultCode || result.resultCode === 200) {
              response.complete()
              this.$store.dispatch('checkout/setThankYouPage', true)
              this.$store.commit('ui/setMicrocart', false)
              this.$router.push(this.localizedRoute('/checkout'))
              // clear cart without sync, because after order cart will be already cleared on backend
              this.$store.dispatch('cart/clear', { sync: false }, { root: true })
            }
          })
        })
        .catch(e => {
          Logger.log(e)()
        })
    },
    shippingOptionChange (event) {
      const selectedId = event.target.shippingOption

      this.shippingOptions.forEach(option => {
        option.selected = option.id === selectedId
      })

      const dataToUpdate = new Promise((resolve, reject) => {
        this.$store.dispatch('cart/syncTotals', {
          methodsData: {
            country: this.country,
            method_code: this.selectedShippingOption.length > 0 ? this.selectedShippingOption[0].id : null,
            carrier_code: this.selectedShippingOption.length > 0 ? this.selectedShippingOption[0].carrier_code : null,
            payment_method: null
          },
          forceServerSync: true
        }).then(() => {
          resolve({
            displayItems: this.bucket,
            shippingOptions: this.shippingOptions,
            total: this.total
          })
        }).catch(e => {
          Logger.error(e)()
          reject(e)
        })
      })

      event.updateWith(dataToUpdate)
    },
    shippingAddressChange (event) {
      const shippingAddress = event.target.shippingAddress
      this.country = shippingAddress.country

      const dataToUpdate = new Promise((resolve, reject) => {
        this.updateShippingOptions(true)
          .then(() => {
            return this.$store.dispatch('cart/syncTotals', {
              methodsData: {
                country: this.country,
                method_code: this.selectedShippingOption.length > 0 ? this.selectedShippingOption[0].id : null,
                carrier_code: this.selectedShippingOption.length > 0 ? this.selectedShippingOption[0].carrier_code : null,
                payment_method: null
              },
              forceServerSync: true
            })
          }).then(() => {
            resolve({
              displayItems: this.bucket,
              shippingOptions: this.shippingOptions,
              total: this.total
            })
          }).catch(e => {
            Logger.error(e)()
            reject(e)
          })
      })

      event.updateWith(dataToUpdate)
    },
    updateShippingOptions (setDefault = false) {
      return new Promise((resolve, reject) => {
        rootStore.dispatch('cart/syncShippingMethods', {
          country_id: this.country
        }, { forceServerSync: true }).then(() => {
          this.shippingOptions = []
          this.$store.getters['checkout/getShippingMethods'].forEach(method => {
            this.shippingOptions.push({
              id: method.method_code,
              carrier_code: method.carrier_code,
              label: method.method_title,
              selected: setDefault ? this.$store.getters['checkout/getShippingMethods'][0].method_code === method.method_code : false,
              amount: {
                currency: currentStoreView().i18n.currencyCode,
                value: method.price_incl_tax
              }
            })
          })
          resolve()
        }).catch(e => {
          Logger.error(e)()
          reject(e)
        })
      })
    },
    createOrder (paymentResponse) {
      // Shipping first name and last name
      const shippingRecipient = paymentResponse.shippingAddress.recipient.split(' ')
      const shippingFirstName = shippingRecipient[0]
      shippingRecipient.shift()
      const shippingLastName = shippingRecipient.join(' ') || i18n.t('(lastname not provided)')

      // Billing first name and last name
      const billingRecipient = paymentResponse.payerName.split(' ')
      const billingFirstName = billingRecipient[0]
      billingRecipient.shift()
      const billingLastName = billingRecipient.join(' ') || i18n.t('(lastname not provided)')

      return {
        user_id: this.$store.state.user.current ? this.$store.state.user.current.id.toString() : '',
        cart_id: this.$store.state.cart.cartServerToken ? this.$store.state.cart.cartServerToken : '',
        products: this.$store.state.cart.cartItems,
        addressInformation: {
          shippingAddress: {
            region: '',
            region_id: 0,
            country_id: paymentResponse.shippingAddress.country,
            street: [paymentResponse.shippingAddress.addressLine[0], paymentResponse.shippingAddress.addressLine[1]],
            company: paymentResponse.shippingAddress.organization ? paymentResponse.shippingAddress.organization : '',
            telephone: paymentResponse.shippingAddress.phone,
            postcode: paymentResponse.shippingAddress.postalCode,
            city: paymentResponse.shippingAddress.city,
            firstname: shippingFirstName,
            lastname: shippingLastName,
            email: paymentResponse.payerEmail,
            region_code: paymentResponse.shippingAddress.region ? paymentResponse.shippingAddress.region : ''
          },
          billingAddress: {
            region: '',
            region_id: 0,
            country_id: paymentResponse.shippingAddress.country,
            street: [paymentResponse.shippingAddress.addressLine[0], paymentResponse.shippingAddress.addressLine[1]],
            company: paymentResponse.shippingAddress.organization ? paymentResponse.shippingAddress.organization : '',
            telephone: paymentResponse.payerPhone,
            postcode: paymentResponse.shippingAddress.postalCode,
            city: paymentResponse.shippingAddress.city,
            firstname: billingFirstName,
            lastname: billingLastName,
            email: paymentResponse.payerEmail,
            region_code: paymentResponse.shippingAddress.region ? paymentResponse.shippingAddress.region : '',
            vat_id: ''
          },
          shipping_method_code: this.selectedShippingOption[0].id,
          shipping_carrier_code: this.selectedShippingOption[0].carrier_code,
          payment_method_code: 'cashondelivery',
          payment_method_additional: {}
        }
      }
    },
    getProductPrice (product) {
      if (!config.cart.displayItemDiscounts) {
        return product.qty * product.price_incl_tax
      }

      if (product.totals) {
        if (product.totals.discount_amount) {
          return product.totals.row_total - product.totals.discount_amount + product.totals.tax_amount
        } else {
          return product.totals.row_total_incl_tax
        }
      }

      return product.regular_price * product.qty
    }
  },
  mounted () {
    if (window.PaymentRequest && !window.ApplePaySession) {
      this.supported = true
      this.updateShippingOptions()
    }
  }
}
</script>
