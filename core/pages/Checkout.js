import Vue from 'vue'
import i18n from 'core/lib/i18n'
import config from 'config'
import PersonalDetails from 'core/components/blocks/Checkout/PersonalDetails'
import Shipping from 'core/components/blocks/Checkout/Shipping'
import Payment from 'core/components/blocks/Checkout/Payment'
import OrderReview from 'core/components/blocks/Checkout/OrderReview'
import CartSummary from 'core/components/blocks/Checkout/CartSummary'
import Composite from 'core/mixins/composite'

export default Vue.component('Checkout', {
  mixins: [Composite],
  metaInfo () {
    return {
      title: this.$route.meta.title || i18n.t('Checkout'),
      meta: this.$route.meta.description ? [{ vmid: 'description', description: this.$route.meta.description }] : []
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
      payment: {},
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
        action1: { label: i18n.t('OK'), action: 'close' }
      })
      this.$router.push('/')
    } else {
      this.stockCheckCompleted = false
      const checkPromises = []
      for (let product of this.$store.state.cart.cartItems) { // check the results of online stock check
        if (product.onlineStockCheckid) {
          checkPromises.push(new Promise((resolve, reject) => {
            global.$VS.db.syncTaskCollection.getItem(product.onlineStockCheckid, function (err, item) {
              if (err) {
                console.error(err)
                resolve(null)
              } else {
                product.stock = item.result
                resolve(product)
              }
            })
          }))
        }
      }
      Promise.all(checkPromises).then(function (checkedProducts) {
        this.stockCheckCompleted = true
        this.stockCheckOK = true
        for (let chp of checkedProducts) {
          if (chp && chp.stock) {
            if (!chp.stock.is_in_stock) {
              this.stockCheckOK = false
              chp.errors.stock = i18n.t('Out of stock!')
              this.$bus.$emit('notification', {
                type: 'error',
                message: chp.name + i18n.t(' is out of the stock!'),
                action1: { label: i18n.t('OK'), action: 'close' }
              })
            }
          }
        }
      }.bind(this))
    }
    let country = this.$store.state.checkout.shippingDetails.country
    if (!country) country = config.i18n.defaultCountry
    this.$bus.$emit('checkout-before-shippingMethods', country)
    this.$store.dispatch('cart/getPaymentMethods')
  },
  created () {
    // TO-DO: Dont use event bus ad use v-on at components (?)
    this.$bus.$on('network-before-checkStatus', this.onNetworkStatusCheck)
    // TO-DO: Use one event with name as apram
    this.$bus.$on('checkout-after-personalDetails', this.onAfterPersonalDetails)
    this.$bus.$on('checkout-after-shippingDetails', this.onAfterShippingDetails)
    this.$bus.$on('checkout-after-paymentDetails', this.onAfterPaymentDetails)
    this.$bus.$on('checkout-after-cartSummary', this.onAfterCartSummary)
    this.$bus.$on('checkout-before-placeOrder', this.onBeforePlaceOrder)
    this.$bus.$on('checkout-do-placeOrder', this.onDoPlaceOrder)
    this.$bus.$on('checkout-before-edit', this.onBeforeEdit)
    this.$bus.$on('order-after-placed', this.onAfterPlaceOrder)
    this.$bus.$on('checkout-before-shippingMethods', this.onBeforeShippingMethods)
    this.$bus.$on('checkout-after-shippingMethodChanged', this.onAfterShippingMethodChanged)
  },
  destroyed () {
    this.$bus.$off('network-before-checkStatus', this.onNetworkStatusCheck)
    this.$bus.$off('checkout-after-personalDetails', this.onAfterPersonalDetails)
    this.$bus.$off('checkout-after-shippingDetails', this.onAfterShippingDetails)
    this.$bus.$off('checkout-after-paymentDetails', this.onAfterPaymentDetails)
    this.$bus.$off('checkout-after-cartSummary', this.onAfterCartSummary)
    this.$bus.$off('checkout-before-placeOrder') // this is intentional exception as the payment methods are dynamically binding to the before-placeOrder event
    this.$bus.$off('checkout-do-placeOrder', this.onDoPlaceOrder)
    this.$bus.$off('checkout-before-edit', this.onBeforeEdit)
    this.$bus.$off('order-after-placed', this.onAfterPlaceOrder)
    this.$bus.$off('checkout-before-shippingMethods', this.onBeforeShippingMethods)
    this.$bus.$off('checkout-after-shippingMethodChanged', this.onAfterShippingMethodChanged)
  },
  computed: {
  },
  watch: {
    '$route': 'activateHashSection'
  },
  methods: {
    onAfterShippingMethodChanged (payload) {
      this.$store.dispatch('cart/refreshTotals', payload)
    },
    onBeforeShippingMethods (country) {
      this.$store.dispatch('cart/getShippingMethods', {
        country_id: country
      }).then(() => {
        this.$store.dispatch('cart/refreshTotals')
        this.$forceUpdate()
      })
    },
    onAfterPlaceOrder (order) {
      this.orderPlaced = true
      console.log(this.order)
    },
    onBeforeEdit (section) {
      this.activateSection(section)
    },
    onBeforePlaceOrder (userId) {
      if (userId) {
        this.userId = userId.toString()
      }
    },
    onAfterCartSummary (receivedData) {
      this.cartSummary = receivedData
    },
    onDoPlaceOrder (additionalPayload) {
      this.payment.paymentMethodAdditional = additionalPayload
      this.placeOrder()
    },
    onAfterPaymentDetails (receivedData, validationResult) {
      this.payment = receivedData
      this.validationResults.payment = validationResult
      this.activateSection('orderReview')
      this.savePaymentDetails()
    },
    onAfterShippingDetails (receivedData, validationResult) {
      this.shipping = receivedData
      this.validationResults.shipping = validationResult
      global.$VS.__TAX_COUNTRY__ = this.shipping.country
      this.activateSection('payment')
      this.saveShippingDetails()
    },
    onAfterPersonalDetails (receivedData, validationResult) {
      this.personalDetails = receivedData
      this.validationResults.personalDetails = validationResult
      this.activateSection('shipping')
      this.savePersonalDetails()
    },
    onNetworkStatusCheck (status) {
      this.checkConnection(status)
    },
    checkStocks () {
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
              action1: { label: i18n.t('OK'), action: 'close' }
            })
          }
        } else {
          this.$bus.$emit('notification', {
            type: 'warning',
            message: i18n.t('Stock check in progress, please wait while available stock quantities are checked'),
            action1: { label: i18n.t('OK'), action: 'close' }
          })
          isValid = false
        }
      }
      return isValid
    },
    activateHashSection () {
      if (typeof window !== 'undefined') {
        var urlStep = window.location.hash.replace('#', '')
        if (this.activeSection.hasOwnProperty(urlStep) && this.activeSection[urlStep] === false) {
          this.activateSection(urlStep)
        } else if (urlStep === '') {
          this.activateSection('personalDetails')
        }
      }
    },
    checkConnection (status) {
      if (!status.online) {
        this.$bus.$emit('notification', {
          type: 'warning',
          message: i18n.t('There is no Internet connection. You can still place your order. We will notify you if any of ordered products is not available because we cannot check it right now.'),
          action1: { label: i18n.t('OK'), action: 'close' }
        })
      }
    },
    activateSection (sectionToActivate) {
      for (let section in this.activeSection) {
        this.activeSection[section] = false
      }
      this.activeSection[sectionToActivate] = true
      if (typeof window !== 'undefined') window.location.href = window.location.origin + window.location.pathname + '#' + sectionToActivate
    },
    // This method checks if there exists a mapping of chosen payment method to one of Magento's payment methods.
    getPaymentMethod () {
      let paymentMethod = this.payment.paymentMethod
      if (config.orders.payment_methods_mapping.hasOwnProperty(paymentMethod)) {
        paymentMethod = config.orders.payment_methods_mapping[paymentMethod]
      }
      return paymentMethod
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
          payment_method_code: this.getPaymentMethod(),
          payment_method_additional: this.payment.paymentMethodAdditional,
          shippingExtraFields: this.shipping.extraFields
        }
      }
      return this.order
    },
    placeOrder () {
      this.checkConnection({ online: typeof navigator !== 'undefined' ? navigator.onLine : true })
      if (this.checkStocks()) {
        this.$store.dispatch('checkout/placeOrder', { order: this.prepareOrder() })
      } else {
        this.$bus.$emit('notification', {
          type: 'error',
          message: i18n.t('Some of the ordered products are not available!'),
          action1: { label: i18n.t('OK'), action: 'close' }
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
    CartSummary
  }
})
