<template>
  <div id="checkout">
    Core Checkout
  </div>
</template>

<script>
import PersonalDetails from 'core/components/blocks/Checkout/PersonalDetails.vue'
import Shipping from 'core/components/blocks/Checkout/Shipping.vue'
import Payment from 'core/components/blocks/Checkout/Payment.vue'
import OrderReview from 'core/components/blocks/Checkout/OrderReview.vue'
import CartSummary from 'core/components/blocks/Checkout/CartSummary.vue'
import ThankYouPage from 'core/components/blocks/Checkout/ThankYouPage.vue'
import i18n from 'core/lib/i18n'

export default {
  name: 'Checkout',
  metaInfo () {
    return {
      title: this.$route.meta.title || i18n.t('Checkout'),
      meta: [
        {
          vmid: 'description',
          description: this.$route.meta.description
        }
      ]
    }
  },
  data () {
    return {
      stockCheckCompleted: false,
      stockCheckOK: false,
      orderPlaced: false,
      activeSection: {
        personalDetails: true,
        shipping: false,
        payment: false,
        orderReview: false
      },
      order: {},
      personalDetails: {},
      shipping: {},
      payment: { paymentMethod: 'cashondelivery' },
      orderReview: {},
      cartSummary: {},
      validationResults: {
        personalDetails: { $invalid: true },
        shipping: { $invalid: true },
        payment: { $invalid: true }
      },
      userId: null
    }
  },
  beforeMount () {
    if (this.$store.state.cart.cartItems.length === 0) {
      this.$bus.$emit('notification', {
        type: 'warning',
        message: i18n.t('Shopping cart is empty. Please add some products before entering Checkout'),
        action1: { label: 'OK', action: 'close' }
      })
      this.$router.push('/')
    } else {
      this.stockCheckCompleted = false
      for (let product of this.$store.state.cart.cartItems) { // check the results of online stock check
        const checkPromises = []
        if (product.onlineStockCheckid) {
          checkPromises.push(new Promise((resolve, reject) => {
            global.db.syncTaskCollection.getItem(product.onlineStockCheckid, function (err, item) {
              if (err) {
                console.error(err)
                resolve(null)
              } else {
                product.stock = item.result
                resolve(product)
              }
            })
          }))
          Promise.all(checkPromises).then(checkedProducts => {
            this.stockCheckCompleted = true
            this.stockCheckOK = true
            for (let chp of checkedProducts) {
              if (chp && chp.stock) {
                if (!chp.stock.is_in_stock) {
                  this.stockCheckOK = false
                  chp.warning_message = i18n.t('Out of stock!')
                  this.$bus.$emit('notification', {
                    type: 'error',
                    message: chp.name + i18n.t(' is out of the stock!'),
                    action1: { label: 'OK', action: 'close' }
                  })
                }
              }
            }
          })
        }
      }
    }
  },
  created () {
    // TO-DO: Dont use event bus ad use v-on at components (?)
    this.$bus.$on('network-before-checkStatus', (status) => { this.checkConnection(status) })
    // TO-DO: Use one event with name as apram
    this.$bus.$on('checkout-after-personalDetails', (receivedData, validationResult) => {
      this.personalDetails = receivedData
      this.validationResults.personalDetails = validationResult
      this.activateSection('shipping')
      this.savePersonalDetails()
    })
    this.$bus.$on('checkout-after-shippingDetails', (receivedData, validationResult) => {
      this.shipping = receivedData
      this.validationResults.shipping = validationResult
      global.__TAX_COUNTRY__ = this.shipping.country
      this.activateSection('payment')
      this.saveShippingDetails()
    })
    this.$bus.$on('checkout-after-paymentDetails', (receivedData, validationResult) => {
      this.payment = receivedData
      this.validationResults.payment = validationResult
      this.activateSection('orderReview')
      this.savePaymentDetails()
    })
    this.$bus.$on('checkout-after-cartSummary', (receivedData) => {
      this.cartSummary = receivedData
    })
    this.$bus.$on('checkout-before-placeOrder', (userId) => {
      if (userId) {
        this.userId = userId.toString()
      }
      this.placeOrder()
    })
    this.$bus.$on('checkout-before-edit', (section) => {
      this.activateSection(section)
    })
    this.$bus.$on('order-after-placed', (order) => {
      this.orderPlaced = true
      console.log(this.order)
    })
  },
  destroyed () {
    this.$bus.$off('network-before-checkStatus')
    this.$bus.$off('checkout-after-personalDetails')
    this.$bus.$off('checkout-after-shippingDetails')
    this.$bus.$off('checkout-after-paymentDetails')
    this.$bus.$off('checkout-after-cartSummary')
    this.$bus.$off('checkout-before-placeOrder')
    this.$bus.$off('checkout-before-edit')
    this.$bus.$off('order-after-placed')
  },
  computed: {
    isValid () {
      let isValid = true
      for (let child of this.$children) {
        if (child.hasOwnProperty('$v')) {
          if (child.$v.$invalid) {
            // Check if child component is Personal Details.
            // If so, then ignore validation of account creation fields.
            if (child.$v.hasOwnProperty('personalDetails')) {
              if (child.$v.personalDetails.$invalid) {
                isValid = false
                break
              }
            } else {
              isValid = false
              break
            }
          }
        }
      }

      if (typeof navigator !== 'undefined' && navigator.onLine) {
        if (this.stockCheckCompleted) {
          if (!this.stockCheckOK) {
            isValid = false
            this.$bus.$emit('notification', {
              type: 'error',
              message: i18n.t('Some of the ordered products are not available!'),
              action1: { label: 'OK', action: 'close' }
            })
          }
        } else {
          this.$bus.$emit('notification', {
            type: 'warning',
            message: i18n.t('Stock check in progress, please wait while available stock quantities are checked'),
            action1: { label: 'OK', action: 'close' }
          })
          isValid = false
        }
      }
      return isValid
    }
  },
  methods: {
    checkConnection (status) {
      if (!status.online) {
        this.$bus.$emit('notification', {
          type: 'warning',
          message: i18n.t('There is no Internet connection. You can still place your order. We will notify you if any of ordered products is not avaiable because we cannot check it right now.'),
          action1: { label: 'OK', action: 'close' }
        })
      }
    },
    activateSection (sectionToActivate) {
      for (let section in this.activeSection) {
        this.activeSection[section] = false
      }
      this.activeSection[sectionToActivate] = true
    },
    prepareOrder () {
      this.order = {
        user_id: this.$store.state.user.current ? this.$store.state.user.current.id.toString() : (this.userId ? this.userId : ''),
        cart_id: this.$store.state.cart.cartServerToken ? this.$store.state.cart.cartServerToken : '',
        products: this.$store.state.cart.cartItems,
        addressInformation: {
          shippingAddress: {
            region: this.shipping.state,
            region_id: 0,
            country_id: this.shipping.country,
            street: [this.shipping.streetAddress, this.shipping.apartmentNumber],
            company: 'NA', // TODO: Fix me! https://github.com/DivanteLtd/vue-storefront/issues/224
            telephone: this.shipping.phoneNumber,
            postcode: this.shipping.zipCode,
            city: this.shipping.city,
            firstname: this.shipping.firstName,
            lastname: this.shipping.lastName,
            email: this.personalDetails.emailAddress,
            region_code: ''
          },
          billingAddress: {
            region: this.payment.state,
            region_id: 0,
            country_id: this.payment.country,
            street: [this.payment.streetAddress, this.payment.apartmentNumber],
            company: this.payment.company,
            telephone: this.payment.phoneNumber,
            postcode: this.payment.zipCode,
            city: this.payment.city,
            firstname: this.payment.firstName,
            lastname: this.payment.lastName,
            email: this.personalDetails.emailAddress,
            region_code: '',
            vat_id: this.payment.taxId
          },
          shipping_method_code: this.shipping.shippingMethod,
          shipping_carrier_code: this.shipping.shippingMethod,
          payment_method_code: this.payment.paymentMethod,
          shippingExtraFields: this.shipping.extraFields
        }
      }
      return this.order
    },
    placeOrder () {
      this.checkConnection({ online: typeof navigator !== 'undefined' ? navigator.onLine : true })
      if (this.isValid) {
        this.$store.dispatch('checkout/placeOrder', { order: this.prepareOrder() })
      } else {
        this.$bus.$emit('notification', {
          type: 'error',
          message: i18n.t('Please do correct validation errors'),
          action1: { label: 'OK', action: 'close' }
        })
      }
    },
    savePersonalDetails () {
      this.$store.dispatch('checkout/savePersonalDetails', this.personalDetails)
    },
    saveShippingDetails () {
      this.$store.dispatch('checkout/saveShippingDetails', this.shipping)
    },
    savePaymentDetails () {
      this.$store.dispatch('checkout/savePaymentDetails', this.payment)
    }
  },
  components: {
    PersonalDetails,
    Shipping,
    Payment,
    OrderReview,
    CartSummary,
    ThankYouPage
  }
}
</script>
